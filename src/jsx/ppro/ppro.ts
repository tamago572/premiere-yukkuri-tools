interface placeAudioWithSubtitlesProps {
  voiceFilePath: string;
  text: string;
  mgtFilePath: string;
  audioTrackNumber: number;
  videoTrackNumber: number;
  subtitleDurationBuffer: number;
}

export const showAlert = (msg: string) => {
  alert(msg);
};

export const placeAudioWithSubtitles = (props: placeAudioWithSubtitlesProps) => {
  // プロジェクトに音声ファイルをインポート
  importFilesToRoot(props.voiceFilePath);

  const importedItem = findImportedItem(props.voiceFilePath); // ProjectItem形式
  if (typeof importedItem === "number") {
    alert("インポートしたアイテムが見つかりませんでした。");
    return { exitCode: 1, msg: "インポートしたアイテムが見つかりませんでした。" };
  }

  const audioDuration =
    importedItem.getOutPoint().seconds -
    importedItem.getInPoint().seconds +
    props.subtitleDurationBuffer / 1000;

  alert(audioDuration.toString());

  // インポートしたアイテムが存在するか
  if (importedItem) {
    const currentCTI = getCurrentCTI();
    const activeSequence = app.project.activeSequence;

    // オーディオトラックにクリップ (音声ファイル)を追加
    try {
      // クリップをシーケンスに配置 [1]はトラック番号 A1=0, A2=1...
      activeSequence.audioTracks[props.audioTrackNumber - 1].overwriteClip(
        importedItem,
        currentCTI.ticks,
      ); // 返り値はboolean
    } catch (e) {
      alert("音声ファイルの挿入に失敗しました: " + e.message);
    }
  }

  return { exitCode: 0, msg: "正常に終了しました" };
};

// ファイルをプロジェクトにインポートする関数
const importFilesToRoot = (filePath: string) => {
  // ファイルをプロジェクトにインポート
  const importedFilesResult = app.project.importFiles(
    [filePath],
    true,
    app.project.rootItem,
    false,
  );

  if (importedFilesResult) {
    return importedFilesResult;
  } else {
    alert("ファイルのインポートに失敗しました。");
    return 1;
  }
};

// インポートしたアイテムを取得(探す)関数 返り値はProjectItem形式
const findImportedItem = (filePath: string) => {
  // ルートアイテムを取得
  const projectItems = app.project.rootItem.children;

  // ルートアイテムの子アイテムを探索
  for (let i = 0; i < projectItems.numItems; i++) {
    // クリップまたはファイルの場合
    const item = projectItems[i];
    if (item.type === ProjectItemType.CLIP || item.type === ProjectItemType.FILE) {
      // ファイルパスが一致する場合
      if (item.getMediaPath() === filePath) {
        return item;
      }
    }
  }
  return 1;
};

// 現在位置を取得する関数
const getCurrentCTI = () => {
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
};
