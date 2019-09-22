# Monacaで作るAndroid/iOS両方対応したラーメンクイックメモアプリ

## 1. はじめに
非IT業界の方にシステムエンジニアと名乗ると<br>
「えー、じゃあスマホアプリとか作れるのー？」<br>
なんて言われたことがある人は少なくないのではないか。<br>
そんな時、あなたは自信を持って「作れるよ！当たり前だろ！」と言えますか？<br>
私は、無い。<br>
ということで簡単なものでいいから自分のアプリを自分のスマホに作って入れてみようと思い書きました。<br>
スマホアプリの開発にカケラも関わったことない人による、<br>
スマホアプリの開発にカケラも関わったことない人に向けた、<br>
Android/iOS両方に対応したスマホアプリ開発の手引きをご紹介致します。<br>
<br>
ちなみに今回開発するラーメンクイックメモアプリについてですが、<br>
「ラーメン食べたら美味しかったかどうかをお店の情報とともにすぐにメモしたい！」<br>
というラーメン愛好家の方に向けたメモアプリです。<br>
（完成イメージは下記の通り）<br>

<br>

## 2. 必要なもの
### 2.1 技術要素
・HTML/CSS<br>
・JavaScript (jQuery)<br>
<br>
作成したデータなどはLocalStorageを使って保存するため、完全サーバレスのアプリです。<br>
簡単な画面作成とわずかなJavaScript,jQueryのコードだけで出来ます。<br>
<br>

### 2.2 ソフト
・Google chrome<br>
・Monacaデバッガー (Android用デバッグアプリ)<br>
・Monaca (iOS用デバッグアプリ)<br>
<br>
MonacaのクラウドIDEを使用すれば環境構築から開発・デプロイまで全て完結するため、<br>
推奨ブラウザであるGoogle chromeだけあればOKです。<br>
開発途中に実機でも確認したい場合はそれぞれの端末でデバッグアプリをインストールして確認することも出来ます。<br>
<br>

### 2.3 アカウント
・Monaca (無料)<br>
・ぐるなびWebサービス (無料)<br>
・Apple Developer Program (有料：12,000円程度)<br>
<br>
Monacaは有料プランもありますが、個人開発レベルならFreeプランで問題ありません。<br>
ちなみにMonacaはどのプランを選んでも１４日間の無料トライアル期間があります。<br>
Freeプランを選択した場合も１４日間のトライアル期間が表示されますが、<br>
１４日間過ぎても無料でご利用出来ますのでご心配ありません。<br>

<br>

## 3. 実装
MonacaはFreeプランでもサンプルテンプレートがたくさんあります。<br>
このアプリはその中でも一番簡単な「Hello World」テンプレートをベースに作成しています。<br>
下記画面遷移図に沿って順番に実装して行きましょう。<br>

### 3.1 プロジェクトテンプレートの作成
まずはMonacaダッシュボードを開き、「新しいプロジェクトを作る」を押下します。<br>
プロジェクト作成画面に遷移したら「サンプルアプリケーション」を選択、<br>
「Hello World」テンプレートを選択、プロジェクト名・説明を記入し、<br>
「作成」を押下したらプロジェクト作成は完了です。<br>
<br>

### 3.2 各種初期設定
プロジェクトを作成したら開発環境の確認と整備をしましょう。<br>
まず初期のディレクトリ構造は下記の通りです。<br>
```
Ramen_Quick_Memo/
├── LICENSE
├── config.xml
├── node_modules/      # 触ることはないので中身割愛
├── package-lock.json
├── package.json
├── res/               # 触ることはないので中身割愛
└── www
    ├── components
    │   ├── loader.css
    │   ├── loader.js
    │   ├── monaca-cordova-loader
    │   │   ├── bower.json
    │   │   └── cordova-loader.js
    │   └── monaca-core-utils
    │       ├── bower.json
    │       └── monaca-core-utils.js
    ├── css
    │   └── style.css
    ├── phonegap-demo
    │   ├── main.js
    │   └── master.css
    ├── index.html
    └── phonegap-demo.html
```
基本的に作業するのは /www ディレクトリ配下のファイルだけです。<br>
/www/components ディレクトリもこの後述するjQuery追加作業で変更は加わりますが触ることはありません。<br>
最終的には下記のような構造にして行きます。<br>
```
Ramen_Quick_Memo/
├── LICENSE
├── config.xml
├── node_modules/      # 触ることはないので中身割愛
├── package-lock.json  
├── package.json
├── res/               # 触ることはないので中身割愛
└── www
    ├── components
    │   ├── loader.css
    │   ├── loader.js
    │   ├── monaca-cordova-loader
    │   │   ├── bower.json
    │   │   └── cordova-loader.js
    │   ├── monaca-core-utils
    │   │   ├── bower.json
    │   │   └── monaca-core-utils.js
    │   └── monaca-jquery
    │       ├── bower.json
    │       └── jquery.js
    ├── css
    │   └── style.css
    ├── images
    │   └── ramen.png
    ├── js
    │   ├── main.js
    │   ├── ramen-edit.js
    │   ├── ramen-list.js
    │   └── shop-list.js
    ├── index.html
    ├── ramen-edit.html
    ├── ramen-list.html
    └── shop-list.html
```
ちなみにテンプレートの初期実装では「Start Demo」ボタンを押下すると<br>
「phonegap-demo.html」の画面に遷移し、下記機能の動作確認ができます。<br>
・位置情報取得<br>
・電話発信<br>
・バイブレーション<br>
・カメラ撮影<br>
・ネットワーク接続確認<br>
<br>
この画面に関わるファイルは最終的には不要になるので、他実装が完了できたら削除します。<br>
デバッグアプリを落としている方は消す前に遊んでみてください。<br>
<br>
それでは実装に入る前にjQueryだけ追加する作業を行いましょう。<br>
プロジェクトをクラウドIDEで開いたら「設定」→「JS/CSSコンポーネントの追加と削除」を押下し、<br>
「JS/CSSコンポーネント」ファイルを開いてください。<br>
ファイルを開いたら「jQuery (Monaca Version)」を追加してください。<br>
ボタンを押下したら /www/components ディレクトリ配下に monaca-jquery ディレクトリが<br>
作成されていたら追加は完了です。<br>
htmlファイルへの読み込みは loader.js が読み込まれていれば問題ありません。<br>
以上で開発環境の整備は完了です、早速実装に入りましょう。<br>
<br>

### 3.3 各画面(HTML/CSS)の作成

#### 3.3.1 トップ画面(index.html)の作成
まずは起動時に最初に表示されるトップ画面から作成しましょう。<br>
トップ画面はテンプレートが用意している index.html を修正して作成します。<br>
機能としては、ラーメンメモを追加するメモ作成・編集画面へ遷移するためのボタンと、<br>
追加したラーメンメモの一覧を表示するメモ一覧表示画面へ遷移するためのボタンの配置のみです。<br>
こちらの画面では特にjsも必要としないため、下記コードをそのままコピペすれば完成です。<br>
<br>
(before)
```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="Content-Security-Policy" content="default-src * data: gap: content: https://ssl.gstatic.com; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'">
    <script src="components/loader.js"></script>
    <link rel="stylesheet" href="components/loader.css">
    <link rel="stylesheet" href="css/style.css">
    <script>
        // PhoneGap event handler
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            console.log("PhoneGap is ready");
        }
    </script>
</head>
<body>

    <h1>HelloWorld!</h1>
    <a class="button--large" href="phonegap-demo.html">Start Demo</a>

</body>
</html>
```
(after)
```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="Content-Security-Policy" content="default-src * data: gap: content: https://ssl.gstatic.com; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'">
    <script src="components/loader.js"></script>
    <link rel="stylesheet" href="components/loader.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- #トップページ -->
    <div class="header">
        <h2>Top page</h2>
    </div>
    <div class="content">
        <a class="button--style size--large" href="list-page.html">List Ramen Memo</a><br>
        <a class="button--style size--large" href="add-page.html">Add Ramen Memo</a><br>
    </div>
</body>
</html>
```
<br>

### 3.3.2 メモ作成画面の作成

トップ画面が作成できたらメモ作成・編集画面を作成しましょう。<br>
index.htmlをコピーし、「ramen-edit.html」ファイルを作成しましょう。<br>
作成したらまずはベースのコードを書きましょう（面倒な方は下記コードをコピペしてください）。<br>

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta http-equiv="Content-Security-Policy" content="default-src * data: gap: content: https://ssl.gstatic.com; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'">
    <script src="components/loader.js"></script>
    <link rel="stylesheet" href="components/loader.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body onload="init()">
    <!-- ラーメンメモ作成・編集画面 -->
    <div class="header">
        <h2>Ramen Memo</h2>
        <a class="button--style size--small" href="index.html">Top</a>
    </div>
    <div class="content">
        <div id="ramen-shop">
          <h4>店名</h4>
          <input class="text--large" type="text">
        </div>
        <div id="ramen-address">
          <h4>住所</h4>
          <input class="text--large" type="text">
        </div>
        <div id="ramen-url">
          <h4>URL</h4>
          <input class="text--large" type="text">
        </div>
        <div id="ramen-access">
          <h4>アクセス</h4>
          <input class="text--large" type="text">
        </div>
        <div id="ramen-discription">
          <h4>特徴・備考</h4>
          <textarea class="text--large" style="height: 8em"></textarea>
        </div>
    </div>
</body>
</html>
```
こちらを書き上げましたら、画面はこんな感じに仕上がるはずです。<br>

### 3.3.3 メモ一覧画面の作成

次にramen-edit.htmlをコピーし、「ramen-list.html」ファイルを作成し、メモ一覧画面を作成しましょう。<br>

基本的なフォーマットが出来たところで、これらの情報を保存する仕組みを実装しましょう。
今回、サーバーレスのため情報はwebブラウザ(ローカル環境)に保存することができるlocalStorageを使用します。

これだけでは余りに機能が寂しいので下記３機能を追加して行きましょう。
・カメラ撮影機能
・スターレート（評価）機能
・

### 3.4 メモ一覧表示画面の作成

### 3.5 API取得結果表示画面の作成

### 3.6 アイコン・スプラッシュ画像の設定

## 4. アプリ インストール（ビルド・デプロイ）

### 4.1 Android端末へのインストール

### 4.2 iOS端末へのインストール

## 5. 終わりに

## 6.参考サイト