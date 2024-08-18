/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// これがメインの関数
function insertAudioAndTitle(filePath, audioTrackNumber) {

    // プロジェクトにファイルをインポート
    importFilesToRoot(filePath);

    // インポートしたアイテムを取得
    var importedItem = findImportedItem(filePath);

    // インポートしたアイテムが存在するか
    if (importedItem) {
        var currentCTI = getCurrentCTI();
        var activeSequence = app.project.activeSequence;

        // オーディオトラックがあるか確認、無かったら作成
        if (activeSequence.audioTracks.numTracks < 2) {
            activeSequence.audioTracks.add();
        }

        // オーディオトラックにクリップ (音声ファイル)を追加
        try {
            // クリップをシーケンスに配置 [1]はトラック番号 A1=0, A2=1...
            activeSequence.audioTracks[audioTrackNumber].overwriteClip(importedItem, currentCTI);
        } catch (e) {
            alert("音声ファイルの挿入に失敗しました: " + e.message);
        }
    } else {
        alert("インポートしたアイテムが見つかりませんでした。");
    }
}

function testbtn() {
    alert("ゆっくりしていってね！！！");
}

// 現在位置を取得する関数
function getCurrentCTI() {
    if (app.project && app.project.activeSequence) {
        // 現在の再生位置(CTIともいう)を取得
        var cti = app.project.activeSequence.getPlayerPosition(); // CTIの値はticks単位

        if (cti) {
            return cti;
        } else {
            alert("CTIの取得に失敗しました。");
            return null;
        }

    } else {
        alert("アクティブなシーケンスがありません。");
        return null;
    }
}

// ファイルをプロジェクトにインポートする関数
function importFilesToRoot(filePath) {
    // ファイルをプロジェクトにインポート
    var importedFilesResult = app.project.importFiles([filePath], true, app.project.rootItem, false);

    if (importedFilesResult) {
        // TODO: デバッグ用。後で消す
        alert("ファイルのインポートに成功しました。importedFilesの内容: " + importedFilesResult);
    } else {
        alert("ファイルのインポートに失敗しました。importedFilesの内容: " + importedFiles);
    }
}

// インポートしたアイテムを取得(探す)関数
function findImportedItem(filePath) {
    // ルートアイテムを取得
    var projectItems = app.project.rootItem.children;

    // ルートアイテムの子アイテムを探索
    for (var i = 0; i < projectItems.numItems; i++) {
        var item = projectItems[i];
        if (item.type === ProjectItemType.CLIP || item.type === ProjectItemType.FILE) {
            if (item.getMediaPath() === filePath) {
                return item;
            }
        }
    }
    return null;
    
}

// アラートを表示する関数 main.jsから呼び出す用
function showAlert(msg) {
    alert(msg);
}