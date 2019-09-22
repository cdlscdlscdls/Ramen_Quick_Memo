// 初期処理
function init() {
  localStorageGetItem();
  var query = location.search;
  // トップ画面から表示した場合はタグの中身を空にする。
  if(query == ''){
    clearValue();
    return;
  }
  // 一覧画面から表示した場合はタグに中身をセットする。
  var param = query.split('=');
  var idx = Number(param[1]);
  var ramenData;
  if(param[0].match(/data_id/)){
    RAMEN.selected = idx;
    ramenData = RAMEN.datas;
  } else {
    RAMEN.selected = -1;
    ramenData = RAMEN.shops;
  }
  $("#ramen-shop input").val(ramenData[idx].shop);
  $("#ramen-address input").val(ramenData[idx].address);
  $("#ramen-url input").val(ramenData[idx].url);
  $("#ramen-access input").val(ramenData[idx].access);
  setStarRate(ramenData[idx].rate);
  $("#ramen-discription textarea").val(ramenData[idx].discription);
  $("#ramen-image img").attr("src", ramenData[idx].img_src);
};
// タグの中身を空にする処理。
function clearValue() {
  $("#ramen-shop input").val('');
  $("#ramen-address input").val('');
  $("#ramen-url input").val('');
  $("#ramen-access input").val('');
  setStarRate(3);
  $("#ramen-discription textarea").val('');
  $("#ramen-image img").attr("src", "images/ramen.png");
  RAMEN.selected = -1;
};
// 保存ボタン押下時の処理。
function addRamen() {
  var shop = $("#ramen-shop input").val();
  if(shop == ''){
    var date = new Date();
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    shop = year + '/' + month + '/' + day;
  }
  var address = $("#ramen-address input").val();
  var url = $("#ramen-url input").val();
  var access = $("#ramen-access input").val();
  var rate = $("#ramen-rate input").val();
  var discription = $("#ramen-discription textarea").val();
  var img_src = $("#ramen-image img").attr("src");
  if(RAMEN.selected < 0){
    RAMEN.datas.push({
      shop: shop,
      address: address,
      url: url,
      access: access,
      rate: rate,
      discription: discription,
      img_src: img_src
    });
  } else {
    RAMEN.datas[RAMEN.selected] = {
      shop: shop,
      address: address,
      url: url,
      access: access,
      rate: rate,
      discription: discription,
      img_src: img_src
    };
  }
  localStorageSetItem();
  location.href = 'ramen-list.html';
};
// 撮影ボタン押下時の処理
function addPicture() {
  navigator.camera.getPicture(setPicture, function() {
      alert("Failed to get camera.");
  }, {
      quality : 50,
      destinationType : Camera.DestinationType.FILE_URI
  });
};
// 撮影した写真をセットする処理
function setPicture(camera_url) {
  var img_tag = "";
  if (camera_url) {
    $("#ramen-image img").attr("src", camera_url);
  } else {
    $("#ramen-image img").attr("src", "images/ramen.png");
  }
};
// 評価の星をセット
function setStarRate(num) {
  $(".star-rate").removeClass('star-show').addClass('star-hide');
  $(".star-" + num).removeClass('star-hide').addClass('star-show');
  $("#ramen-rate input").val(num);
};
// イベント
$(function () {
  $(".star-rate").on({
    "mousedown touchstart": function (e) {
      e.preventDefault();
      var id = $(e.currentTarget).attr("id");
      var str = id.split("-");
      var num = Number(str[1]);
      setStarRate(num);
    }
  });
});