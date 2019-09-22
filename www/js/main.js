// グローバル変数設定
var KEY = "RAMEN";
var RAMEN = RAMEN || {};
RAMEN.shops = RAMEN.shops || [];
RAMEN.datas = RAMEN.datas || [];
RAMEN.selected = -1;
// ローカルストレージをセットします。
function localStorageSetItem() {
    localStorage.setItem(KEY, JSON.stringify(RAMEN));
}
// ローカルストレージの値を取得します。
function localStorageGetItem() {
    var item = localStorage.getItem(KEY);
    var data = JSON.parse(item);
    if(data != undefined) RAMEN = data;
}