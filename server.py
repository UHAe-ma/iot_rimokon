from flask import Flask,render_template,jsonify,request,flash
import peewee
import os
import datetime
import requests
import json

#初期設定
app = Flask(__name__)
app.secret_key = 'hogehoge'
DIFF_JST_FROM_UTC = 9

proxies = {
    "http": None,
    "https": None,
}

# SQLiteDBの生成
db=None
if os.path.exists('/tmp'):
    db = peewee.SqliteDatabase("/tmp/data.db")
elif os.path.exists('c:\\temp'):
    db = peewee.SqliteDatabase("c:\\temp\\data.db")


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

    class Meta:
        database = db

# テーブルの作成
db.create_tables([RoomInfo])

# JSONを受信,データベースに登録
# 同時に返り値としてエアコンの制御データを送信
@app.route('/post_data', methods=['POST'])
def check():

    try:
        # 登録日時を日本のTimeZoneで取得して、文字列化して設定
        dt = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
        d = dt.strftime('%Y-%m-%d %H:%M')

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
        print("温度:",temp,"湿度:",humid)

        # 同日時のデータがあれば更新、無ければ新規登録
        v = RoomInfo(recdate=d,temperature=temp,humidity=humid)
        roomlist = RoomInfo.select().where(RoomInfo.recdate == d)
        if len(roomlist) != 0:
            v = roomlist[0]
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

        # データを保存
        v.save()

        # データを表示
        for room in RoomInfo.select():
            print(room.recdate, room.temperature)
        
        flash('データを受信しました')
        result = "OK"

    except Exception as e:
        # エラー時はログ出力して終わり
        print(e)
        result="NG"

    return jsonify(
        model = "Mitsubishi",
        mode = "Cool",
        temperature = 26.5,
        power = 0
    )

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

    return render_template('index.html',
            idx=int(idx),
            f=f,
            temperature=t,
            humidity=h,
            person=p,
            co2=c)

#試し。goodを表示
@app.route('/good')
def good():
    name = "Good"
    return name


# JSONを受信,データベースに登録
@app.route('/getjson', methods=['POST'])
def getjson():
    data = request.json
    print(data)
    return "nothing"


# データを送信
@app.route('/ac_on')
def ac_on():
    print("AC_ON")
    jsonData = {
        "power":"ON",
        'time':24
    }
    print(jsonData)
    response = requests.post('http://127.0.0.1:3000/getjson/' , json=json.dumps(jsonData),proxies=proxies)
    print(response)
    return "nothing" 

# データを送信
@app.route('/ac_off')
def ac_off():
    print("AC_OFF")
    jsonData = {
        "power":"OFF",
        'time':24
    }
    print(jsonData)
    response = requests.post('http://127.0.0.1:3000/getjson/' , json=json.dumps(jsonData),proxies=proxies)
    print(response)
    return "nothing" 

# サービス起動
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
