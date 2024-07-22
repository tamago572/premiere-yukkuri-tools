/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function setAudioSubtitle(filePath) {
    // ファイルをプロジェクトにインポート
    var importResult = app.project.importFiles([filePath], true, app.project.rootItem, false);

    var currentCTI = getCurrentCTI();
    // alert(currentCTI);

    if (importResult) {

    }
}

function testbtn() {
    alert("ゆっくりしていってね！2！！");
}

function getCurrentCTI() {
    if (app.project && app.project.activeSequence) {
        // CTI（Current Time Indicator）の位置を取得
        var cti = app.project.activeSequence.CTI; // CTIの値はticks単位
        // var seconds = cti.seconds; // ticksから秒単位へ変換（必要に応じて）
        return cti; // 現在の位置を返す
    } else {
        alert("アクティブなシーケンスがありません。");
        return null;
    }
}