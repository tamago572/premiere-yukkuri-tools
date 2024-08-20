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

        // オーディオトラックにクリップ (音声ファイル)を追加
        try {
            // クリップをシーケンスに配置 [1]はトラック番号 A1=0, A2=1...
            activeSequence.audioTracks[audioTrackNumber].overwriteClip(importedItem, currentCTI);
        } catch (e) {
            alert("音声ファイルの挿入に失敗しました: " + e.message);
        }


        // ビデオトラックにMogrtを追加
        var mogrtFilePath = "C:\\Users\\7f7fn\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\エクステンション用テスト.mogrt";
        // var mogrtFilePath = "C:\\Users\\7f7fn\\Documents\\Premiere\\琴葉茜字幕.mogrt";
        insertMogrtTitle(mogrtFilePath, 1);
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
        // alert("ファイルのインポートに成功しました。importedFilesの内容: " + importedFilesResult);
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
        // クリップまたはファイルの場合
        var item = projectItems[i];
        if (item.type === ProjectItemType.CLIP || item.type === ProjectItemType.FILE) {
            // ファイルパスが一致する場合
            if (item.getMediaPath() === filePath) {
                return item;
            }
        }
    }
    return null;
    
}

// シーケンスにMogrtを使用したテロップを挿入する関数
function insertMogrtTitle(filePath, videoTrackNumber) {
    // mogrtをシーケンスに配置
    try {
        var insertedMogrt = app.project.activeSequence.importMGT(filePath, getCurrentCTI().ticks, videoTrackNumber, 0);
        
        try {
            // mogrtのプロパティを設定
            var mogrtComponent = insertedMogrt.components[0];
            mogrtComponent.properties[0].setValue("テロップの内容");

        } catch (e) {
            alert("Mogrtのプロパティ変更に失敗しました: " + e.message);

        }
    } catch (e) {
        alert("Mogrtの挿入に失敗しました: " + e.message);
    }
    
}


// // クリップを特定する関数
// function findInsertedClip(trackNumber, startTime) {
//     var track = app.project.activeSequence.videoTracks[trackNumber];
//     var clips = track.clips;

//     for (var i = 0; i < clips.numItems; i++) {
//         var clip = clips[i];
//         if (clip.start.ticks === startTime) {
//             return clip;
//         }
//     }

//     alert("挿入したクリップが見つかりませんでした。");
//     return null;
// }


// アラートを表示する関数 main.jsから呼び出す用
function showAlert(msg) {
    alert(msg);
}