from flask import Flask,render_template,jsonify,request,flash,make_response,url_for,redirect
import peewee
import os
import datetime
import requests
import json
import time 
import collections as cl
import math

#初期設定
app = Flask(__name__)
app.secret_key = 'hogehoge'
app.config['TEMPLATES_AUTO_RELOAD'] = True
DIFF_JST_FROM_UTC = 9

proxies = {
    "http": None,
    "https": None,
}


power = 0


# SQLiteDB（デバイスから受信したデータ）の生成
db=None
db_rimokon=None
if os.path.exists('/tmp'):
    db = peewee.SqliteDatabase("/tmp/data.db")
    db_rimokon = peewee.SqliteDatabase("/tmp/rimokon_data.db")

elif os.path.exists('c:\\temp'):
    db = peewee.SqliteDatabase("c:\\temp\\data.db")
    db_rimokon = peewee.SqliteDatabase("c:\\temp\\rimokon_data.db")


# 室内情報データクラス
class RoomInfo(peewee.Model):
    recdate = peewee.TextField()
    temperature = peewee.FloatField(null=True,default=0.0)
    humidity = peewee.FloatField(null=True,default=0.0)
    accX = peewee.IntegerField(null=True,default=0.0)
    accY = peewee.IntegerField(null=True,default=0.0)
    accZ = peewee.IntegerField(null=True,default=0.0)
    gyroX = peewee.IntegerField(null=True,default=0.0)
    gyroY = peewee.IntegerField(null=True,default=0.0)
    gyroZ = peewee.IntegerField(null=True,default=0.0)
    pitch = peewee.IntegerField(null=True,default=0.0)
    roll = peewee.IntegerField(null=True,default=0.0)
    yaw = peewee.IntegerField(null=True,default=0.0)
    gal = peewee.FloatField(null=True,default=0.0)

    class Meta:
        database = db

# エアコン設定データクラス
class RimokonInfo(peewee.Model):
    recdate = peewee.TextField()
    model = peewee.TextField(null=True,default="")
    power = peewee.IntegerField(null=True,default=0)
    mode = peewee.TextField(null=True,default="")
    temperature = peewee.FloatField(null=True,default=0.0)
    sendflag = peewee.IntegerField(null=True,default=0)

    class Meta:
        database = db_rimokon

# テーブルの作成
db.create_tables([RoomInfo])
db_rimokon.create_tables([RimokonInfo])

# JSONを受信,データベースに登録
# 同時に返り値としてエアコンの制御データを送信
@app.route('/post_data', methods=['POST'])
def check():

    try:
        start = time.time()
        # 登録日時を日本のTimeZoneで取得して、文字列化して設定
        dt = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
        d = dt.strftime('%Y-%m-%d %H:%M:%S.%f')

        # POSTされたJSONデータからキーを元にデータ取得
        temp = request.json['temperature']
        print(temp)
        humid = request.json['humidity']
        accX = request.json['accX']
        accY = request.json['accY']
        accZ = request.json['accZ']
        gyroX = request.json['gyroX']
        gyroY = request.json['gyroY']
        gyroZ = request.json['gyroZ']
        pitch = request.json['pitch']
        roll = request.json['roll']
        yaw = request.json['yaw']

        #galを計算
        gal = abs(math.sqrt(pow(accX,2)+pow(accY,2)+pow(accZ,2)) - 1) * 980.665
        print("gal",gal)
        print("温度:",temp,"湿度:",humid)

        # 同日時のデータがあれば更新、無ければ新規登録
        v = RoomInfo(recdate=d)
        v.temperature=temp
        v.humidity=humid
        v.accX=accX
        v.accY=accY
        v.accZ=accZ
        v.gyroX=gyroX
        v.gyroY=gyroY
        v.gyroZ=gyroZ
        v.pitch=pitch
        v.roll=roll
        v.yaw=yaw
        v.gal =gal

        # データを保存
        v.save()
        process_time = time.time() - start
        print("time:",process_time)
        # データを表示
        for room in RoomInfo.select():
            print(room.recdate, room.gal)
        
        flash('データを受信しました')
        result = "OK"

    except Exception as e:
        # エラー時はログ出力して終わり
        print(e)
        result="NG"

    # 現在エアコンの設定データを読み込み
    try:
        # 最新データ1件目を取得する.
        rimokonlist = RimokonInfo.select().order_by(RimokonInfo.recdate.desc()).limit(1)
        v = rimokonlist[0]
        print(v.recdate, v.model,v.power,v.mode,v.temperature)

    except RimokonInfo.DoesNotExist:
        abort(404)

    # エアコンの設定を変更してまだ送信していない場合はsend_flagを1に。
    send_flag = v.sendflag
    # これから送信するため、データベースのsendflagを0に
    v.sendflag = 0
    v.save()

    rimokon_data = {
        "model" : v.model,
        "mode" : v.mode,
        "temperature" : v.temperature,
        "power" : v.power,
        "sendIR": send_flag
    }

    # デバイスにエアコンの設定を送信
    return rimokon_data


# エアコンを設定
@app.route('/set_ac', methods=['POST'])
def set_ac():

    try:
        start = time.time()
        # 登録日時を日本のTimeZoneで取得して、文字列化して設定
        dt = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
        d = dt.strftime('%Y-%m-%d %H:%M:%S.%f')

        # POSTされたJSONデータからキーを元にデータ取得
        mode = request.json['mode']
        model = request.json['model']
        power = request.json['power']
        temp = request.json['temperature']
        print(temp)
        print("モード:",mode,"モデル:",model,"電源:",power,"温度:",temp)

        # リモコンデータを新規登録
        v = RimokonInfo(recdate=d)
        v.model = model
        v.power = power
        v.mode = mode
        v.temperature = temp
        v.sendflag = 1

        # データを保存
        v.save()
        process_time =  time.time() - start
        print("time:",process_time);
        
        flash('データを受信しました')
        result = "OK"

    except Exception as e:
        # エラー時はログ出力して終わり
        print(e)
        result="NG"

    return "nothing"


# API実装
# 部屋情報データ取得API→Chart.jsで参照するのに使う
@app.route('/getRoomInfo/<int:numOfRecord>', methods=['GET'])
def get_RoomInfo(numOfRecord):
    # データを日時順に取得する.
    try:
        roomlist = RoomInfo.select().order_by(RoomInfo.recdate)
    except RoomInfo.DoesNotExist:
        abort(404)
    # グラフ描画用データセットを準備する。
    # 色や説明はここで変更する。
    dataset1 = {
            'label':'気温(c)',
            'backgroundColor':'rgba(75,192,192,0.4)',
            'borderColor':'rgba(75,192,192,1)',
            'yAxisID':'y-axis-1',
            'fill':'false',
            'data':[]
            }
    dataset2 = {
            'label':'湿度(%)',
            'backgroundColor':'rgba(192,75,192,0.4)',
            'borderColor':'rgba(192,75,192,1)',        
            'yAxisID':'y-axis-1',
            'fill':'false',
            'data':[]
            }
    dataset3 = {
            'label':'不快指数',
            'backgroundColor':'rgba(75,75,192,0.4)',
            'borderColor':'rgba(75,75,192,1)',        
            'yAxisID':'y-axis-1',
            'fill':'false',
            'data':[]
            }
    labels = []
    # データを読み込んで、グラフ用に編集しながら追加していく。
    for v in roomlist:
        key=v.recdate
        labels.append(key)
        # 不快指数の計算
        f = int(0.81*v.temperature + 0.01 * v.humidity * (0.99 * v.temperature - 14.3) + 46.3)

        dataset1['data'].append(v.temperature)
        dataset2['data'].append(v.humidity)
        dataset3['data'].append(f)

    # JSON形式で戻り値を返すために整形
    result = {
            "labels":labels,
            "datasets":[dataset1,dataset2,dataset3]}
    return make_response(jsonify(result))

# 部屋情報データ取得API→Chart.jsで参照するのに使う
@app.route('/getLatestRoomInfo/', methods=['GET'])
def get_LatestRoomInfo():
    # データを日時順に取得する.
    try:
        roomlist = RoomInfo.select().order_by(RoomInfo.recdate.desc())
    except RoomInfo.DoesNotExist:
        abort(404)
    # データを読み込んで、グラフ用に編集しながら追加していく。
    v = roomlist[0]
    recdate=v.recdate
    # 不快指数の計算
    f = int(0.81*v.temperature + 0.01 * v.humidity * (0.99 * v.temperature - 14.3) + 46.3)
    temp = v.temperature
    humidity = v.humidity

    # JSON形式で戻り値を返すために整形
    result = {"recdate":recdate,"temperature":temp,"humidity":humidity,"f":f}
    return make_response(jsonify(result))


# ６軸IMUータ取得API→Chart.jsで参照するのに使う
@app.route('/getGal/<int:numOfRecord>', methods=['GET'])
def get_gal(numOfRecord):
    # データを日時順に取得する.
    try:
        roomlist = RoomInfo.select().order_by(RoomInfo.recdate)
    except RoomInfo.DoesNotExist:
        abort(404)
    # グラフ描画用データセットを準備する。
    # 色や説明はここで変更する。
    dataset1 = {
            'label':'Gal',
            'backgroundColor':'rgba(75,192,192,0.4)',
            'borderColor':'rgba(75,192,192,1)',
            'yAxisID':'y-axis-1',
            'fill':'false',
            'data':[]
            }
    labels = []
    # データを読み込んで、グラフ用に編集しながら追加していく。
    for v in roomlist:
        key=v.recdate
        labels.append(key)

        dataset1['data'].append(v.gal)

    # JSON形式で戻り値を返すために整形
    result = {
            "labels":labels,
            "datasets":[dataset1]}
    return make_response(jsonify(result))

# リモコン情報データ取得API→Chart.jsで参照するのに使う
@app.route('/getRimokonHistory/<int:numOfRecord>', methods=['GET'])
def getRimokonHistory(numOfRecord):
    # データを日時順に取得する.
    try:
        rimokon = RimokonInfo.select().order_by(RimokonInfo.recdate.desc())
    except RimokonInfo.DoesNotExist:
        abort(404)

    # データを読み込んで、グラフ用に編集しながら追加していく。
    ys = []
    for v in rimokon:
        data = cl.OrderedDict()
        data['recdata'] = v.recdate,
        data['model'] = v.model
        data['mode'] = v.mode
        data['power'] = v.power
        data['set_temperature'] = v.temperature
        # print(data)
        ys.append(data)
    # # JSON形式で戻り値を返す
    return make_response(jsonify(ys))



#index.htmlを表示
@app.route('/')
def index():
    idx=0
    h=0
    t=0
    p=0
    c=0
    f=0

    try:
        # 室内情報で、温度と湿度が0以外の最新データ1件目を取得する.
        roomlist = RoomInfo.select().where(
                (RoomInfo.humidity > 0) &
                (RoomInfo.temperature > 0) 
                ).order_by(RoomInfo.recdate.desc()).limit(1)
    except RoomInfo.DoesNotExist:
        abort(404)

    # データがあれば、計算する.
    if len(roomlist) > 0:
        v = roomlist[0]
        h=v.humidity
        t=v.temperature
        # 不快指数の計算
        f = int(0.81*t + 0.01 * h * (0.99*t - 14.3) + 46.3)
    else:
        print("データなし")


    try:
        # リモコン情報でを取得する.
        rimokonlist = RimokonInfo.select().order_by(RimokonInfo.recdate.desc())
    except RimokonInfo.DoesNotExist:
        abort(404)

    # データがあれば、計算する.
    if len(rimokonlist) > 0:
        v = rimokonlist[0]
        ac_mode = v.mode
        ac_model = v.model
        ac_power = v.power
        ac_set_temperature = v.temperature
    else:
        # データがなかったらデフォルト設定
        ac_mode = "Cool"
        ac_model = "Toshiba"
        ac_power = 0
        ac_set_temperature = 26.0

    return render_template('index.html',
            idx=int(idx),
            f=f,
            temperature=t,
            humidity=h,
            mode=ac_mode,
            model=ac_model,
            power=ac_power,
            set_temp=ac_set_temperature)

#試し。goodを表示
@app.route('/good')
def good():
    name = "Good"
    return name

@app.route('/graph')
def graph():
    return render_template('graph.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/setting')
def setting():
    return render_template('setting.html')



# JSONを受信,データベースに登録
@app.route('/getjson', methods=['POST'])
def getjson():
    data = request.json
    print(data)
    return "nothing"


@app.route('/ac_on')
def ac_on():
    print("AC_ON")
    start = time.time()
    # 登録日時を日本のTimeZoneで取得して、文字列化して設定
    dt = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
    d = dt.strftime('%Y-%m-%d %H:%M:%S.%f')

    # リモコンデータを新規登録
    v = RimokonInfo(recdate=d)
    v.model="Toshiba"
    v.power=1
    v.mode="Cool"
    v.temperature=26.5
    v.sendflag = 1

    # データを保存
    v.save()
    process_time =  time.time() - start
    print("time:",process_time);
    # データを表示
    for rimokon in RimokonInfo.select():
        print(rimokon.recdate, rimokon.model,rimokon.power,rimokon.mode,rimokon.temperature)

    flash('エアコン設定を登録しました')    # ←ここを追記
    return redirect(url_for('index'))

@app.route('/ac_off')
def ac_off():
    print("AC_OFF")
    start = time.time()
    # 登録日時を日本のTimeZoneで取得して、文字列化して設定
    dt = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
    d = dt.strftime('%Y-%m-%d %H:%M:%S.%f')

    # リモコンデータを新規登録
    v = RimokonInfo(recdate=d)
    v.model="Toshiba"
    v.power=0
    v.mode="Cool"
    v.temperature=26.5
    v.sendflag = 1


    # データを保存
    v.save()
    process_time =  time.time() - start
    print("time:",process_time);
    # データを表示
    for rimokon in RimokonInfo.select():
        print(rimokon.recdate, rimokon.model,rimokon.power,rimokon.mode,rimokon.temperature)


    return "nothing" 

# サービス起動
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
