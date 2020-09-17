/**
 * pixijs基礎サンプル
 */


 /** =======================================================================================
 * 1.3 Pixiアプリケーションを生成する
 */ 

// Pixiアプリケーション生成
let app = new PIXI.Application({
    width: 300,                 // スクリーン(ビュー)横幅 
    height: 480,                // スクリーン(ビュー)縦幅  
    backgroundColor: 0x1099bb,  // 背景色 16進 0xRRGGBB
    autoDensity: true,
});
// HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
let el = document.getElementById('app');
el.appendChild(app.view);

app.stage.sortableChildren = true;


let rimokonContainer = new PIXI.Container();
rimokonContainer.x = 30;  
rimokonContainer.y = 30;
rimokonContainer.zIndex = 10;
app.stage.addChild(rimokonContainer);

/** =======================================================================================
 * 1.4 スプライトや図形を表示する
 */

/**
 * スプライト(PIXI.Sprite)
 */
// // 画像を読み込み、テクスチャにする
// let butaTexture = new PIXI.Texture.from('./static/images/t0003_120.png');
// // 読み込んだテクスチャから、スプライトを生成する
// let butaSprite = new PIXI.Sprite(butaTexture);
// // ぶたの基準点を設定(%) 0.5はそれぞれの中心 位置・回転の基準になる
// butaSprite.anchor.x = 0.5;
// butaSprite.anchor.y = 0.5;
// // 大きさを変えてみる
// butaSprite.scale.x = 1.0;
// butaSprite.scale.y = 1.0;
// // ぶたの位置決め
// butaSprite.x = app.screen.width / 2;        // ビューの幅 / 2 = x中央
// butaSprite.y = app.screen.height / 2;       // ビューの高さ / 2 = y中央
// // 表示領域に追加する
// app.stage.addChild(butaSprite);


// // 別のぶたを作る
// let butaSprite2 = new PIXI.Sprite(butaTexture); // テクスチャは同じものを使いまわせる
// // 基準点を設定 set()を使うとx,y同時に設定できる
// butaSprite2.anchor.set(0.5);
// // 大きさを変えてみる
// butaSprite2.scale.x = 1.0;
// butaSprite2.scale.y = 1.0;
// // 半透明にしてみる
// butaSprite2.alpha = 0.9;
// // 回転してみる
// butaSprite2.rotation = Math.PI / 3;          // (ラジアンで指定)
// // butaSprite2.angle = 60;                        // (度数で指定)
// // 色味を変えてみる
// butaSprite2.tint = 0xffff00;                // (基準は0xffffff)

// butaSprite2.x = app.screen.width / 2 + 150;
// butaSprite2.y = app.screen.height / 2;
// app.stage.addChild(butaSprite2);



// /** 
//  * 図形(PIXI.Graphics) draw~~()はここに書いたもの以外にもあります
//  */

// 楕円を作る
let ellipse = new PIXI.Graphics()       // メソッドチェーンで描画するので、;(セミコロン)を付けない   
.beginFill(0xff0000)                    // endFill()までの描画に対する塗りつぶし色指定
.drawEllipse(0,0,10,20)                 // (中心のx座標, 中心のy座標, 幅, 高さ)
.endFill();                              // ここまでに描いた図形を塗りつぶす

// 基準点を設定(px) 図形(PIXI.Graphicsにはpivotはないので注意)
ellipse.pivot.x = 15
ellipse.pivot.y = 10
ellipse.x = 150;
ellipse.y = 120;     
ellipse.rotation = Math.PI / 6;
ellipse.zIndex = -1;
app.stage.addChild(ellipse);



// 多角形を作る
let polygon = new PIXI.Graphics()
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawPolygon([  // 頂点を配列で渡す [x1,y1,x2,y2,....]
                0, 0,
                25, -20,
                50, 0,
                50, 20,
                25, 40,
                0, 20
            ])
.endFill();
polygon.x = 100;
polygon.y = 100;
polygon.zIndex = -1;
app.stage.addChild(polygon)



// 本体
let riomkon_frame = new PIXI.Graphics()
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(0, 0,240,400)
.endFill();
rimokonContainer.addChild(riomkon_frame)

//画面
let riomkon_window = new PIXI.Graphics()
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(20, 20,200,115)
.endFill();
rimokonContainer.addChild(riomkon_window)

//自動ボタン
let riomkon_btn_auto = new PIXI.Graphics()
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(20, 140,80,50)
.endFill();
rimokonContainer.addChild(riomkon_btn_auto)

//停止ボタン
var riomkon_btn_off = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawCircle(0,0,25)   
.endFill();
riomkon_btn_off.x = 135;
riomkon_btn_off.y = 165;
rimokonContainer.addChild(riomkon_btn_off);



//オン
var riomkon_btn_on = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawCircle(0,0,25)   
.endFill();
riomkon_btn_on.x = 190;
riomkon_btn_on.y = 165;
rimokonContainer.addChild(riomkon_btn_on);


//温度上げる
let riomkon_btn_up_temp = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(80, 200,80,40)
.endFill();
rimokonContainer.addChild(riomkon_btn_up_temp);


//温度下げる
let riomkon_btn_down_temp = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(80, 300,80,40)
.endFill();
rimokonContainer.addChild(riomkon_btn_down_temp);

//温度下げる
let riomkon_btn_cool = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(10, 350,60,40)
.endFill();
rimokonContainer.addChild(riomkon_btn_cool);

//温度下げる
let riomkon_btn_dry = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(90, 350,60,40)
.endFill();
rimokonContainer.addChild(riomkon_btn_dry);

//温度下げる
let riomkon_btn_heat = new PIXI.Graphics()
// 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
.beginFill(0xffffff, 0.8)    // 第二引数で透明度を指定できる
.drawRect(170, 350,60,40)
.endFill();
rimokonContainer.addChild(riomkon_btn_heat);

// // 円を作る(テクスチャを貼る)
// let circle = new PIXI.Graphics()
// // 塗りつぶしのかわりにテクスチャを貼る (テクスチャ,色味(リファレンスには背景色って書いてあるからバグかも),透明度,テクスチャのスケール・位置情報)
// .beginTextureFill(butaTexture, 0x00ffff, 1, new PIXI.Matrix(1,0,0,1,-35,-35))  
// .lineStyle(2, 0x000000)     // 線のスタイル指定(幅, 色) これ以外に透明度, alignment(線の位置)などが指定可能
// .drawCircle(0,0,30)   
// .endFill();
// circle.x = 200;
// circle.y = 100;
// app.stage.addChild(circle);


// // 線を描く
// let line = new PIXI.Graphics()
// .lineStyle(1, 0x000000)   // 線のスタイル指定(幅, 色) これ以外に透明度, alignment(線の位置)などが指定可能
// .moveTo(0,0)              // 開始点に移動
// .lineTo(50,0)             // (x,y)に向かって直線を引く
// .lineTo(25,-25)
// .moveTo(50,0)             // 現在地を移動        
// .lineTo(25,25);         
// line.x = 300;
// line.y = 100;
// app.stage.addChild(line)




/** =======================================================================================
 * 1.5 コンテナを作ってオブジェクトをまとめる
 */

// // 新しいコンテナを生成
// let sampleContainer = new PIXI.Container();

// // ステージのあたりに作ったコンテナを配置する
// sampleContainer.x = 100;
// sampleContainer.y = app.screen.height - 200;
// app.stage.addChild(sampleContainer);

// // 新しいコンテナにオブジェクトを入れていく
// // 背景色用の長方形
// let background = new PIXI.Graphics()
// .beginFill(0xffff00)
// .drawRect(0,0,400,200)
// .endFill();

// // コンテナに入れる
// sampleContainer.addChild(background);

// // 大量のロッカーをぶち込む
// let lockerTexture = new PIXI.Texture.from('./img/locker.png')
// let lockers = new Array()
// for (let i=0; i < 2; i++) {
//     for(let j=0; j < 13; j++ ) {
//         let locker = new PIXI.Sprite(lockerTexture);
//         locker.scale.x = locker.scale.y = 0.25;
//         locker.x = j * 30 + 10;
//         locker.y = i * 100 + 20;
//         sampleContainer.addChild(locker);
//         lockers.push(locker)
//     }
// }

// // コンテナを適当に動かしたり回転させたりしてみる
// // sampleContainer.x += 50;
// // sampleContainer.y -= 50;
// // sampleContainer.rotation = -Math.PI / 3;
// // sampleContainer.scale.x = sampleContainer.scale.y = 1.5;



 /** =======================================================================================
 * 1.13 テキストを表示する(+外部フォントの適用)
 */

// PIXI.TextMetrics.BASELINE_SYMBOL += "あ｜";     // 日本語を見切れずに表示するためのおまじない

// デフォルトのフォントでテキストを表示する
// new PIXI.Text(文字列, テキストスタイル(オブジェクト))
var Timetext =  new PIXI.Text('あいうアイウABC漢字℃', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 50,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
Timetext.x = 20;
Timetext.y = 15;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(Timetext);




// デフォルトのフォントでテキストを表示する
// new PIXI.Text(文字列, テキストスタイル(オブジェクト))
var Humid =  new PIXI.Text('湿度%', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 50,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
Humid.x = 20;
Humid.y = 65;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(Humid);


// デフォルトのフォントでテキストを表示する
// new PIXI.Text(文字列, テキストスタイル(オブジェクト))
var AC_Temp =  new PIXI.Text('設定温度%', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 40,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                AC_Temp.x = 80;
                AC_Temp.y = 240;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(AC_Temp);


var AUTO_TEXT =  new PIXI.Text('自動', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 30,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                AUTO_TEXT.x = 25;
                AUTO_TEXT.y = 140;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(AUTO_TEXT);

var STOP_TEXT =  new PIXI.Text('切', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 30,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                STOP_TEXT.x = 120;
                STOP_TEXT.y = 140;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(STOP_TEXT);


var START_TEXT =  new PIXI.Text('入', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 30,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                START_TEXT.x = 175;
                START_TEXT.y = 140;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(START_TEXT);

var COOL_TEXT =  new PIXI.Text('冷房', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 25,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                COOL_TEXT.x = 15;
                COOL_TEXT.y = 350;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(COOL_TEXT);

var DRY_TEXT =  new PIXI.Text('除湿', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 25,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                DRY_TEXT.x = 95;
                DRY_TEXT.y = 350;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(DRY_TEXT);


var HEAT_TEXT =  new PIXI.Text('暖房', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 25,
                  fill : 0x000000,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                HEAT_TEXT.x = 175;
                HEAT_TEXT.y = 350;
// text.text = '0123\n456789';   // テキストの書き換え
rimokonContainer.addChild(HEAT_TEXT);


// デフォルトのフォントでテキストを表示する
// new PIXI.Text(文字列, テキストスタイル(オブジェクト))
var LOGO =  new PIXI.Text('MITSHUBISHI', 
                { 
                //   fontFamily: 'Arial',   // フォント
                  fontSize: 30,
                  fill : 0x008BBB,       // 文字色
                //   stroke: 0xffffff,      // アウトラインの色
                //   strokeThickness: 3,    // アウトラインの太さ   
                //   align: 'center',       // 文字揃え(複数行の場合に有効)     
                });
                LOGO.x = 50;
                LOGO.y = 435;
// text.text = '0123\n456789';   // テキストの書き換え
app.stage.addChild(LOGO);

// // 外部フォントをロードする
// WebFont.load (
// {
//     // Google Fontsの場合
//     google:
//     {
//         families: ['Noto+Serif+JP']   
//     },
//     // カスタム(自分のサーバーにファイルがあるとか)の場合
//     custom:
//     {
//         families: ['幻ノにじみ明朝'],
//         urls: ['./css/font.css']    // @font-faceを定義したcssのURL
//     },
//     active: () =>
//     {
//         // フォント読み込み成功時
//         // Google Fontsから読み込んだフォントでテキストを表示する(なぜか漢字が読み込まれない)
//         let text2 =  new PIXI.Text('あいうアイウABC漢字', 
//                 { 
//                     fontFamily: 'Noto Serif JP',
//                     fontSize: 50,
//                     fill : 0x000000,      // 文字色     
//                 });
//         text2.x = 10;
//         text2.y = 100;
//         app.stage.addChild(text2);

//         // カスタムフォントでテキストを表示する
//         let text3 =  new PIXI.Text('あいうアイウABC漢字', 
//                 { 
//                     fontFamily: '幻ノにじみ明朝',
//                     fontSize: 50,
//                     fill : 0x000000,      // 文字色     
//                 });
//         text3.x = 10;
//         text3.y = 200;
//         app.stage.addChild(text3);
//     },
//     inactive: () =>
//     {
//         // フォント読み込み失敗時
//         console.log('font loading failed');
//     }
// });




/** =======================================================================================
 * 1.6 オブジェクトがクリックされたときになんかする
 */

// // 中央のぶたのインタラクション(イベント)を有効化
// butaSprite.interactive = true;

// // ぶたにマウスが重なった時、表示をポインターにする
// butaSprite.buttonMode = true;

// // 中央のぶたスプライトにクリックイベントのリスナーを設定する
// // オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
// butaSprite.on('pointertap',showAlert);

// // イベントハンドラの定義
// function showAlert(e) {
//     console.log(e);
//     alert('ぶたがクリック(タップ)されました');
// }

// // // リスナーを解除する(on()の逆)
// // // butaSprite.off('pointertap',showAlert);



// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_on.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_on.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_on.on('pointertap',showAlert_on);

// イベントハンドラの定義
function showAlert_on(e) {
    console.log(e);
    localStorage.setItem('ac_power', 1);
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  }


// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_off.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_off.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_off.on('pointertap',showAlert_off);

// イベントハンドラの定義
function showAlert_off(e) {
    console.log(e);
    localStorage.setItem('ac_power', 0);
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  }



// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_auto.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_auto.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_auto.on('pointertap',showAlert_auto);

// イベントハンドラの定義
function showAlert_auto(e) {
    console.log(e);
    alert('AUTOボタンがクリック(タップ)されました');
}


// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_up_temp.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_up_temp.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_up_temp.on('pointertap',showAlert_Up_temp);

// イベントハンドラの定義
function showAlert_Up_temp(e) {
    console.log(e);
    ac_set_temp = Number(localStorage.getItem("ac_temperature"))+0.5;
    console.log(ac_set_temp);
    localStorage.setItem('ac_temperature', ac_set_temp);
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });    
}



// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_down_temp.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_down_temp.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_down_temp.on('pointertap',showAlert_Down_temp);

// イベントハンドラの定義
function showAlert_Down_temp(e) {
    console.log(e);
    ac_set_temp = Number(localStorage.getItem("ac_temperature"))-0.5;
    console.log(ac_set_temp);
    localStorage.setItem('ac_temperature', ac_set_temp);
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  
}


// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_auto.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_auto.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_auto.on('pointertap',showAlert_auto);

// イベントハンドラの定義
function showAlert_auto(e) {
    console.log(e);

    localStorage.setItem('ac_mode', "Auto");
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  
}


// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_cool.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_cool.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_cool.on('pointertap',showAlert_cool);

// イベントハンドラの定義
function showAlert_cool(e) {
    console.log(e);

    localStorage.setItem('ac_mode', "Cool");
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  
}




// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_dry.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_dry.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_dry.on('pointertap',showAlert_dry);

// イベントハンドラの定義
function showAlert_dry(e) {
    console.log(e);

    localStorage.setItem('ac_mode', "Dry");
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  
}



// 中央のぶたのインタラクション(イベント)を有効化
riomkon_btn_heat.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
riomkon_btn_heat.buttonMode = true;

// 中央のぶたスプライトにクリックイベントのリスナーを設定する
// オブジェクト.on('イベントの種類', イベントハンドラ) で設定する
riomkon_btn_heat.on('pointertap',showAlert_heat);

// イベントハンドラの定義
function showAlert_heat(e) {
    console.log(e);

    localStorage.setItem('ac_mode', "Heat");
    // alert('温度上昇ボタンがクリック(タップ)されました');

    var send_ac_setting = {"mode":localStorage.getItem("ac_mode"),
                           "model":localStorage.getItem("ac_model"),
                           "power":localStorage.getItem("ac_power"),
                           "temperature":localStorage.getItem("ac_temperature"),
                           "gal_autostop":localStorage.getItem("ac_gal_autostop"),
                        }

    /* 設定送信 */
    $.ajax({
        url: "/set_ac",
        type:          'post',
        dataType:      'json',
        contentType:   'application/json',
        scriptCharset: 'utf-8',
        data:          JSON.stringify(send_ac_setting)
      })

    /* 設定の受信 */
    console.log("TEST!");
    $.ajax({
        url: "/getLatestRimokonInfo",
        method: "GET",
    })
    .done(function(rimokon_data){
        console.log("model:",rimokon_data.model);
        $('#len').html(rimokon_data);
        localStorage.setItem('ac_mode', rimokon_data.mode);
        localStorage.setItem('ac_model', rimokon_data.model);
        localStorage.setItem('ac_temperature', rimokon_data.temperature);
        localStorage.setItem('ac_power', rimokon_data.power);
        localStorage.setItem('ac_gal_autostop', rimokon_data.gal_autostop);
    });  
}


/** =======================================================================================
 * 1.7 オブジェクトをドラッグして動かす
 */

// // でかいぶたのインタラクション(イベント)を有効化
// butaSprite2.interactive = true;

// // ぶたにマウスが重なった時、表示をポインターにする
// butaSprite2.buttonMode = true;

// // でかいぶたスプライトにイベントリスナーを設定する
// // .on()をつなげて連続で設定することができる
// butaSprite2.on('pointerdown',  onButaPointerDown)    // ぶたの上でマウスがクリック(orタップ)されたとき
//            .on('pointerup',   onButaPointerUp);      // ぶたの上でマウスクリックが外れたとき



// // ぶたの上でマウスがクリック(orタップ)されたときの処理定義
// function onButaPointerDown() {
//     butaSprite2.on('pointermove', moveButa);    // ドラッグイベントリスナーを設定
 
//     // 分かる人向けTIPS: 
//     // ドラッグ処理が重かったり、でかいぶたが他のオブジェクトの下に入ったりするとpointerupを拾えず、
//     // ドラッグイベントのリスナーが解除されない場合がある。
//     // こうなるとマウスをクリックした状態でなくても、でかいぶたにマウスが重なるとぶたが追従してくる。
//     // これはwindowにマウスクリック解除時のリスナーを設定することで解除できる...かも
//     // window.addEventListener('pointerup', onButaPointerUp);
// }


// // ぶたをドラッグ中の処理定義
// function moveButa(e) {
//     // PIXI.interaction.InteractionData.getLoalPosition(オブジェクト)
//     // イベント発火地点(=ドラッグ中のマウス位置)がapp.stageのどこの位置にあるかを取得
//     let position = e.data.getLocalPosition(app.stage);

//     // 位置変更
//     butaSprite2.x = position.x;
//     butaSprite2.y = position.y;
// }


// // ぶたの上でマウスクリックが外れたときの処理定義
// function onButaPointerUp() {
//     butaSprite2.off('pointermove', moveButa);    // ドラッグイベントリスナーを解除
// }


///////////////////////////////////////

// でかいぶたのインタラクション(イベント)を有効化
rimokonContainer.interactive = true;

// ぶたにマウスが重なった時、表示をポインターにする
rimokonContainer.buttonMode = true;

// でかいぶたスプライトにイベントリスナーを設定する
// .on()をつなげて連続で設定することができる
rimokonContainer.on('pointerdown',  onRimokonPointerDown)    // ぶたの上でマウスがクリック(orタップ)されたとき
           .on('pointerup',   onRimokonPointerUp);      // ぶたの上でマウスクリックが外れたとき



// ぶたの上でマウスがクリック(orタップ)されたときの処理定義
function onRimokonPointerDown() {
    rimokonContainer.on('pointermove', moveRimokon);    // ドラッグイベントリスナーを設定
 
    // 分かる人向けTIPS: 
    // ドラッグ処理が重かったり、でかいぶたが他のオブジェクトの下に入ったりするとpointerupを拾えず、
    // ドラッグイベントのリスナーが解除されない場合がある。
    // こうなるとマウスをクリックした状態でなくても、でかいぶたにマウスが重なるとぶたが追従してくる。
    // これはwindowにマウスクリック解除時のリスナーを設定することで解除できる...かも
    // window.addEventListener('pointerup', onButaPointerUp);
}


// ぶたをドラッグ中の処理定義
function moveRimokon(e) {
    // PIXI.interaction.InteractionData.getLoalPosition(オブジェクト)
    // イベント発火地点(=ドラッグ中のマウス位置)がapp.stageのどこの位置にあるかを取得
    let position = e.data.getLocalPosition(app.stage);

    // 位置変更
    rimokonContainer.x = position.x-100;
    rimokonContainer.y = position.y-100;
}


// ぶたの上でマウスクリックが外れたときの処理定義
function onRimokonPointerUp() {
    rimokonContainer.off('pointermove', moveRimokon);    // ドラッグイベントリスナーを解除
}



/** =======================================================================================
 * 1.8 オブジェクトの前後関係(描画順序)を変更する
 */

// // zIndexによる自動ソートを有効化(どんなコンテナでも設定可能)
// app.stage.sortableChildren = true;

// // でかいぶたを最前面に描画(どのオブジェクトもzIndexの初期値は0)
// butaSprite2.zIndex = 10;

// // でかいぶたを最背面に描画
// // butaSprite2.zIndex = -1;







/** =======================================================================================
 * 1.10 キーボードが押されたときにオブジェクトを動かす
 */

// // 押されたキーの情報を格納する配列を用意
// const LEFT = 0;
// const UP = 1;
// const RIGHT = 2;
// const DOWN = 3;

// let pushed = [];
// pushed[LEFT] = false;
// pushed[UP] = false;
// pushed[RIGHT] = false;
// pushed[DOWN] = false;


// // あるキーが押されたときのイベントリスナーを設定
// window.addEventListener('keydown', function(e) {
//    pushed[e.keyCode-37] = true;
// });

// // あるキーが離されたときのイベントリスナーを設定
// window.addEventListener('keyup', function(e) {
//     pushed[e.keyCode-37] = false;
// });

// // let frameCount = 0;
// let locker = lockers[0];

// app.ticker.add((delta) => { // なんじゃこれという人向け: function(delta)の省略形です(厳密には違う)
//     if (pushed[LEFT]) {
//         // ←キーが押されていた場合
//         locker.x -= 5;
//     }
//     if (pushed[UP]) {
//         // ↑キーが押されていた場合
//         locker.y -= 5;
//     }
//     if (pushed[RIGHT]) {
//         // →キーが押されていた場合
//         locker.x += 5;
//     }
//     if (pushed[DOWN]) {
//         // ↓キーが押されていた場合
//         locker.y += 5;
//     }

//     // 前の移動からxxフレーム以上経ってたら処理したい、という場合は上でコメントアウトしているframeCountを使って、
//     // frameCount += deltaなどで経過フレームを数えてif( frameCount >= xx) {やりたい処理 & カウントリセット}
//     // などとするとよいでしょう
// });





/** =======================================================================================
 * 1.11 パラパラ(フレーム)アニメーションするスプライトを作る (素材がないため断念)
 * [Animated Sprite - Jet - PixiJS Examples](https://pixijs.io/examples/#/sprite/animatedsprite-jet.js)
 */





 /** =======================================================================================
 * 1.12 Tickerを使わずにアニメーションする(別ライブラリを併用)
 */

// // ロッカーを4つほど取り出す
// let l1 = lockers[1];
// let l2 = lockers[2];
// let l3 = lockers[3];
// let l4 = lockers[4];

// // TweenMax.to( 対象オブジェクト, 
// //              完了までの時間(秒),
// //              {  
// //                  pixi: { 
// //                       パラメータ名1: 目標値1, パラメータ名2: 目標値2, ... ,
// //                  }
// //                   ease: イージングの形式,
// //                   repeat: 繰り返し回数 (デフォルトは0、 反復の場合は折り返しもカウントに含む), 
// //                   yoyo: アニメーションを反復するか否か(true/false デフォルトはfalse),
// //                   delay: アニメーション開始までの遅延時間(秒),
// //                   onComplete: アニメーション完了時に実行するコールバック
// //             }
// // )

// // 1回だけリピートする
// TweenMax.to(l1, 0.5, 
//         {   
//             pixi: { 
//                 y: l1.y - 200, 
//             },
//             ease: Power0.easeNone, 
//             repeat: 1
//         }
//     );

// // 反復で1回リピートし、完了時に色を変える
// TweenMax.to(l2, 0.5, 
//     {   
//         pixi: { 
//             y: l2.y - 200, 
//         },
//         ease: Power1.easeInOut, 
//         repeat: 2,
//         yoyo: true,
//         onComplete: () => { l2.tint = 0xff0000 } // 完了時に色を変える
//     }
// );

// // 無限リピート
// TweenMax.to(l3, 0.5, 
//     {   
//         pixi: { 
//             y: l3.y - 200, 
//         },
//         ease: Power1.easeInOut, 
//         repeat: -1,
//         yoyo: true
//     }
// ); 

// // 色々詰め込み
// // 回転
// TweenMax.to(l4, 1.0, { pixi: { angle: 359}, ease: Power0.easeNone, repeat: -1,});
// // 色々
// let l4Tween = TweenMax.to(l4, 1.0, 
//     {   
//         pixi: { 
//             y: l4.y - 200, 
//             scaleX: l4.scale.x * 1.5,
//             scaleY: l4.scale.y * 1.5,
//             tint: 0xff0000,
//         },
//         ease: Power1.easeInOut, 
//         repeat: -1,
//         yoyo: true
//     }
// ); 


// // 戻り値のtweenを使ってアニメーションの一時停止や再開ができる
// // setTimeout(() => { l4Tween.pause() }, 1000);    // 1秒後に最後のロッカーの回転以外のアニメーションを停止





 /** =======================================================================================
 * 1.14 点とオブジェクトの衝突判定
 */

// // 1.9で使ったロッカーを使用する(分かりやすいように基準点を中心に変更)
// locker.anchor.set(0.5);

// // PIXI.Point(平面上の点オブジェクト)を生成
// let p = new PIXI.Point();   

// // いくつかのオブジェクトをinteractiveにする(ぶたとでかいぶたは既にinteractive)
// circle.interactive = true;
// ellipse.interactive = true;
// polygon.interactive = true;
// l1.interactive = true;
// l2.interactive = true;
// l3.interactive = true;

// // 適当に名前をつける
// butaSprite.namae = "ぶた";       
// butaSprite2.namae = "でかいぶた";
// circle.namae = "円"
// ellipse.namae = "楕円"
// polygon.namae = "六角形"
// l1.namae = "ロッカー1"
// l2.namae = "ロッカー2"
// l3.namae = "ロッカー3"

// // オブジェクトの配置完了をちょっと待ってから衝突判定のループを回す (※これはクソコードなので実践で使用しないでください)
// setTimeout( () => {
//     app.ticker.add(() => {
//         // pにlockerのワールド座標点を代入
//         // (普通のx,yは親コンテナ基準のローカル座標。これはルートコンテナ(ここではapp.stage))基準の座標)
//         p.x = locker.transform.worldTransform.tx;
//         p.y = locker.transform.worldTransform.ty;   

//         // 衝突判定(hitTest()はinteractiveがtrueのオブジェクトにのみ有効)
//         let hitObject = app.renderer.plugins.interaction.hitTest(p, app.stage);  // (判定対象の点, 対象とするオブジェクトの入ったコンテナ)
//         if (hitObject != null) {
//             // 何かに衝突したら1.13のテキストオブジェクトに書き出す
//             text.text = hitObject.namae + 'にぶつかった';
//         }
//         else {
//             text.text = 'なんもぶつかってない';
//         }
//     });
// }, 100);





 /** =======================================================================================
 * 1.15 オブジェクトの衝突判定領域をカスタマイズする
 */

// // hitArea用の形を作る(これはPIXI.Graphicsと異なり、描画オブジェクトではない)
// let customHitArea = new PIXI.Polygon(
//     [   // 頂点の渡し方はdrawPolygon()と同じ
//         -25,30,
//         5,35,
//         35,15,
//         15,-35,
//         -20,-35,
//         -35,-10,
//     ]
// )

// // hitArea確認用の同じ形のPIXI.Graphics
// let debug = new PIXI.Graphics()
// .beginFill(0x000000, 0.75)
// .drawPolygon([
//               -25,30,
//               5,35,
//               35,15,
//               15,-35,
//               -20,-35,
//               -35,-10,
//             ])
// .endFill();
// butaSprite.hitArea = customHitArea; // カスタム衝突判定領域を設定
// butaSprite.addChild(debug);         // 実はスプライトにもaddChild()できる

// // 分かりやすいようぶたを大きくする
// butaSprite.scale.x = butaSprite.scale.y = 1.5;

// // hitAreaは移動・回転・拡大縮小およびpivotの変更には追従するが、anchor(基準点)の変更には追従してくれない
// // butaSprite.anchor.x += 0.1;





/** =======================================================================================
 * 1.9 毎フレーム何らかの処理を実行する
 */

// フレーム更新時の処理(≒ループ処理)を追加する
app.ticker.add(animate);
let amountTime = 0;
var count = 0;

// 処理の定義
function animate(delta) {

    count = localStorage.getItem("room_temperature");
    if (count != "undefined"){
        Timetext.text = (count)+"℃";
    }

    humid = localStorage.getItem("room_humidity");
    if (humid != "undefined"){
        Humid.text = (humid)+"%";
    }

    ac_set_temp = localStorage.getItem("ac_temperature");
    AC_Temp.text = (ac_set_temp)+"℃";

    ac_power = localStorage.getItem("ac_power");
    if (ac_power == "1"){
        riomkon_btn_on.tint = 0x00ff00;
        riomkon_btn_off.tint = 0xffffff;
    }else {
        riomkon_btn_on.tint = 0xffffff;
        riomkon_btn_off.tint = 0xff0000;
    }
    ac_mode = localStorage.getItem("ac_mode");
    switch (ac_mode) {
        case 'Auto':
            riomkon_btn_auto.tint = 0xffff00;
            riomkon_btn_cool.tint = 0xffffff;
            riomkon_btn_dry.tint = 0xffffff;
            riomkon_btn_heat.tint = 0xffffff;
        break;
        case 'Cool':
            riomkon_btn_auto.tint = 0xffffff;
            riomkon_btn_cool.tint = 0x0000ff;
            riomkon_btn_dry.tint = 0xffffff;
            riomkon_btn_heat.tint = 0xffffff;
            break;
        case 'Dry':
            riomkon_btn_auto.tint = 0xffffff;
            riomkon_btn_cool.tint = 0xffffff;
            riomkon_btn_dry.tint = 0x00ffff;
            riomkon_btn_heat.tint = 0xffffff;
          break;
        case 'Heat':
            riomkon_btn_auto.tint = 0xffffff;
            riomkon_btn_cool.tint = 0xffffff;
            riomkon_btn_dry.tint = 0xffffff;
            riomkon_btn_heat.tint = 0xff0000;
          break;
  
        default:
          break;
      }    

      model = localStorage.getItem("ac_model");
      LOGO.text = model;

    // ぶたがはまってる円を回転する
    ellipse.rotation += 0.2;

    // ぶたがはまってる円を左右に動かす(適当なのでほっとくとどんどんずれていきます)
    amountTime += delta;                    // delta(app.ticker.deltaTime) : 前のフレームから今のフレームまでの経過時間を正規化した値？
    // amountTime += app.ticker.deltaMS;    // app.ticker.deltaMS  : 前のフレームから今のフレームまでの経過時間(ms)
    
    if (Math.cos(amountTime / 10) > 0) {
        // 右に動かす
        ellipse.x += 2;
    }
    else {
        // 左に動かす
        ellipse.x -= 2;
    }
}

// // 毎フレーム処理を解除する
// // app.ticker.remove(animate);
