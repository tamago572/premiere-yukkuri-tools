/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// これがメインの関数
function insertAudioAndTitle(AUDIO_FILEPATH, AUDIO_TRACK_NUMBER, VIDEO_TRACK_NUMBER, SUBTITLE_TEXT) {

    // プロジェクトにファイルをインポート
    importFilesToRoot(AUDIO_FILEPATH);

    // インポートしたアイテム(音声ファイル)を取得
    var IMPORTED_ITEM = findImportedItem(AUDIO_FILEPATH); // ProjectItem形式

    // インポートした音声ファイルの長さを計算
    var AUDIO_DURATION = IMPORTED_ITEM.getOutPoint().seconds - IMPORTED_ITEM.getInPoint().seconds;
    // var AUDIO_DURATION = IMPORTED_ITEM.getOutPoint().ticks;

    alert("音声ファイルの長さ: " + AUDIO_DURATION);

    // インポートしたアイテムが存在するか
    if (IMPORTED_ITEM) {
        var currentCTI = getCurrentCTI();
        var activeSequence = app.project.activeSequence;

        // オーディオトラックにクリップ (音声ファイル)を追加
        try {
            // クリップをシーケンスに配置 [1]はトラック番号 A1=0, A2=1...
            activeSequence.audioTracks[AUDIO_TRACK_NUMBER].overwriteClip(IMPORTED_ITEM, currentCTI.ticks); // 返り値はboolean
        } catch (e) {
            alert("音声ファイルの挿入に失敗しました: " + e.message);
        }


        // ビデオトラックにMogrtを追加
        // var mogrtFilePath = "C:\\Users\\7f7fn\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\エクステンション用テスト.mogrt";
        var mogrtFilePath = "C:\\Users\\7f7fn\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\琴葉葵字幕_凸版文久ゴシック.mogrt";
        // var mogrtFilePath = "C:\\Users\\7f7fn\\Videos\\教育教育教育死刑死刑死刑.mp4";
        // showMogrtPropList(mogrtFilePath, 0); // debug
        var MGTnodeId = "000f4241";

        var mogrt = null;

        // mogrtをProjectItemから検索
        try {
            mogrt = findImportedItemWithNodeID(MGTnodeId);

            // mogrtが見つからなかった場合
            if (!mogrt) {
                throw new Error("mogrtファイルが見つかりませんでした。NodeIDが存在するか確認してください。");
            }

            alert("mogrtファイルの検索に成功しました。");
        } catch (e) {
            alert("mogrtファイルの検索に失敗しました: " + e.message);
        }

        // 検索したmogrtのOutPointを設定
        try {
            mogrt.setOutPoint(AUDIO_DURATION, 4);
        } catch (e) {
            alert("mogrtのOutPointの設定に失敗しました: " + e.message);
        }

        // mogrtをシーケンスに配置
        try {
            activeSequence.videoTracks[VIDEO_TRACK_NUMBER].overwriteClip(mogrt, currentCTI.ticks);
        } catch (e) {
            alert("mogrtの挿入に失敗しました: " + e.message);
        }


        // // ソーステキストを設定
        // try {
        //     var component = insertedMogrt.getMGTComponent();
 
        //     component.properties[0].setValue(SUBTITLE_TEXT);

        //     insertedMogrt.name = SUBTITLE_TEXT;

        // } catch (e) {
        //     alert("ソーステキストの設定に失敗しました: " + e.message);
        // }

    } else {
        alert("インポートしたアイテムが見つかりませんでした。");
    }
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
        return importedFilesResult;
    } else {
        alert("ファイルのインポートに失敗しました。importedFilesの内容: " + importedFiles);
        return null;
    }
}

// インポートしたアイテムを取得(探す)関数 返り値はProjectItem形式
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


// インポートしたアイテムをNodeIDを使用して探す関数 返り値はProjectItem形式 (BIN内のアイテムも探索)
function findImportedItemWithNodeID(nodeId) {
    // alert("渡されたNodeID: " + nodeId);

    // ルートアイテムを取得
    var projectItems = app.project.rootItem.children;

    // ルートアイテムの子アイテムを探索
    for (var i = 0; i < projectItems.numItems; i++) {
        // クリップまたはファイルの場合
        var item = projectItems[i];
        // alert("NodeID: " + item.nodeId + " FilePath: " + item.getMediaPath());
        
        // ファイルパスが一致する場合
        if (item.nodeId === nodeId) {
            return item[i];
        }
        // BINの場合、子アイテムを検索
        if (item.type === ProjectItemType.BIN) {
            // alert("BIN: " + item.nodeId);
            
            for (var j = 0; j < item.children.numItems; j++) {
                var binItem = item.children[j];

                alert("NodeID: " + binItem.nodeId + " FilePath: " + binItem.getMediaPath());

                if (binItem.nodeId === nodeId) {
                    // alert("これだわ");
                    return binItem;
                }
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

function importMGTtoProj(mogrtFilePath) {
    try {
        insertedMogrt = app.project.activeSequence.importMGT(mogrtFilePath, getCurrentCTI().ticks, 1, 0); // 返り値はtrackItem形式
        return insertedMogrt;
    } catch (e) {
        alert("テロップの挿入に失敗しました: " + e.message);
    }
}