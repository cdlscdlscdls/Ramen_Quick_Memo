// 初期処理
function init() {
  localStorageGetItem();
  setList();
};
// メモ一覧をセットする処理。
function setList() {
  $("#ramen-list").empty();
  var li = '';
  for(var i = 0; i < RAMEN.datas.length; i++){
    var shop = RAMEN.datas[i].shop;
    var url = RAMEN.datas[i].url;
    var access = RAMEN.datas[i].access;
    var fn = "openURL('" + url + "')";
    li += '<li><h2><a href="ramen-edit.html?data_id='+ i +'">' + shop + '</a><span onclick="deleteRamen('+ i +')">削除</span></h2><p>アクセス：' + access + '<span onclick="'+ fn +'">ブラウザで開く</span></p></li>';
  }
  $("#ramen-list").append(li);
};
// メモを削除する処理。
function deleteRamen(idx){
  RAMEN.datas.splice(idx,1);
  localStorageSetItem();
  setList();
};
// ブラウザとしてURLを開く処理。
function openURL(url){
  window.open = cordova.InAppBrowser.open;
  cordova.InAppBrowser.open(url, '_blank', 'location=yes');
};