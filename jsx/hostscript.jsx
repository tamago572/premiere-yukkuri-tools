/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// これがメインの関数
function insertAudioAndTitle(filePath, audioTrackNumber, videoTrackNumber) {

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
            activeSequence.audioTracks[audioTrackNumber].overwriteClip(importedItem, currentCTI.ticks);
        } catch (e) {
            alert("音声ファイルの挿入に失敗しました: " + e.message);
        }


        // ビデオトラックにMogrtを追加
        // var mogrtFilePath = "C:\\Users\\7f7fn\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\エクステンション用テスト.mogrt";
        var mogrtFilePath = "C:\\Users\\7f7fn\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\琴葉葵字幕_凸版文久ゴシック.mogrt";

        // showMogrtPropList(mogrtFilePath, 0);

        var insertedMogrt = null;
        // テロップを挿入
        try {
            insertedMogrt = activeSequence.importMGT(mogrtFilePath, currentCTI.ticks, videoTrackNumber, 0);
        } catch (e) {
            alert("テロップの挿入に失敗しました: " + e.message);
        }

        // ソーステキストを設定
        try {
            var component = insertedMogrt.getMGTComponent();

            component.properties[0].setValue("新しいテキスト");

        } catch (e) {
            alert("ソーステキストの設定に失敗しました: " + e.message);
        }

    } else {
        alert("インポートしたアイテムが見つかりませんでした。");
    }
}

function testbtn() {
    alert("ゆっくりしていってね！！！");
}


// getMGTComponentを使用した、プロパティ一覧を表示する関数
function compPropList(insertedMogrt) {
    var component = insertedMogrt.getMGTComponent();

    alert("コンポーネント数: " + component.properties.numItems);
    for (var i = 0; i < component.properties.numItems; i++) {
        alert("Comp No. " + i + "コンポーネント名: " + component.properties[i].displayName);
    }
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

// シーケンスにMogrtを使用したテロップを挿入し、プロパティ一覧を表示する関数
function showMogrtPropList(filePath, videoTrackNumber) {
    // mogrtをシーケンスに配置
    var insertedMogrt = app.project.activeSequence.importMGT(filePath, getCurrentCTI().ticks, videoTrackNumber, 0);
    
    showComponentsList(insertedMogrt);

    var components = insertedMogrt.components;
    for (var i = 0; i < components.numItems; i++) {
        var comp = components[i];
        // if (comp.displayName == "テキスト") {
        alert("Comp No. " + i + "コンポーネント名: " + comp.displayName);    
        // すべてのプロパティをalertで表示 (デバッグ用)
            for (var j = 0; j < comp.properties.numItems; j++) {
                alert("Comp No. " + i + " Prop No. " + j + "プロパティ名: " + comp.properties[j].displayName + " プロパティの値: " + comp.properties[j].getValue());
            }
    }
}


// // クリップを特定する関数
function findInsertedClip(trackNumber, startTime) {
    var track = app.project.activeSequence.videoTracks[trackNumber];
    var clips = track.clips;

    for (var i = 0; i < clips.numItems; i++) {
        var clip = clips[i];
        if (clip.start.ticks === startTime) {
            return clip;
        }
    }

    alert("挿入したクリップが見つかりませんでした。");
    return null;
}


// アラートを表示する関数 main.jsから呼び出す用
function showAlert(msg) {
    alert(msg);
}



function showComponentsList(targetClip) {
    var components = targetClip.components;
    var componentsList = "";
    for (var i = 0; i < components.numItems; i++) {
        try {
            // componentsList += components[i].displayName + " プロパティの値: " + components[i].getValue() + i + " \n";
            componentsList += components[i].displayName + " " + i + " \n";

        } catch (e) {
            alert("コンポーネントの取得に失敗しました: " + e.message);
        }
    }
    alert(componentsList);
}