// 初期処理
function init() {
  localStorageGetItem();
  setShopList();
};
// メモ一覧をセットする処理。
function setList(shops) {
  $("#shop-list").empty();
  RAMEN.shops = [];
  var li = '';
  for(var i = 0; i < shops.length; i++){
    var shop = shops[i]["name"];
    var access = shops[i]["access"]["line"]
    access += " " + shops[i]["access"]["station"];
    access += shops[i]["access"]["station_exit"];
    access += shops[i]["access"]["walk"] + "分";
    var data = {
      shop: shop,
      url: shops[i]["url"],
      address: shops[i]["address"],
      access: access,
      discription: "",
      img_src: "images/ramen.png"
    };
    RAMEN.shops.push(data);
    li += '<li><h2><a href="ramen-edit.html?shop_id='+ i +'">' + shop + "</a></h2></li>";
  }
  $("#shop-list").append(li);
};
// 現在地からお店情報を取得する処理。
function setShopList() {
    var success = function(p) {
        var data = {
          latitude: p.coords.latitude.toFixed(2),
          longitude: p.coords.longitude.toFixed(2),
          range: 2
        };
        var gnaviURL = getGnaviURL(data);
        gnaviAPI(gnaviURL);
    };
    var error = function() {
      alert("位置情報が取得できませんでした。お手数ですが手入力してください。");
      location.href = 'ramen-edit.html';
      return ;
    };
    navigator.geolocation.getCurrentPosition(success, error);
};
// ぐるなびAPIのURLを作成して返す処理。
function getGnaviURL(data) {
    var keyid = "";
    var url = "https://api.gnavi.co.jp/RestSearchAPI/v3?keyid="+ keyid;
    // ぐるなびの業態コード（ラーメン屋）指定
    var code = "RSFST08008";
    url += "&category_s=" + code;
    url += "&hit_per_page=100";
    // 引数の値を指定
    Object.keys(data).forEach(function (key) {
      url += "&" + key + "=" + data[key];
    });

    return encodeURI(url);
};
// ぐるなびAPIの実行結果を返す処理。
function gnaviAPI(url){
    $.ajax({
      type: 'GET',
      url: url,
      timeout: 5000,
      error: function(data){
        alert("検索失敗しました。通信状況をご確認の上、再度お試しください。");
        console.log(data);
        location.href = 'ramen-edit.html';
        return;
      },
      success: function(data){
        var rests = data['rest'];
        if( rests.length < 1 ){
          alert("お近くのラーメン屋情報が取得出来ませんでした。お手数ですが手入力してください。");
          location.href = 'ramen-edit.html';
          return;
        }
        setList(rests);
        localStorageSetItem();
      }
    });
};