import { useState, useEffect, useCallback } from "react";
import { evalTS } from "../lib/utils/bolt";
import { os } from "../lib/cep/node";
import path from "path";
import { SettingsStateHook } from "../types/Settings";
import { fs } from "../lib/cep/node";
import iconv from "iconv-lite";

const DropArea: React.FC<SettingsStateHook> = ({ settings, setSettings }) => {
  const [isDropped, setIsDropped] = useState(false); // ドロップされたかどうか
  const [isDragOver, setIsDragOver] = useState(false); // ドラッグオーバー中かどうか

  const onDrop = (droppedFilePath: string) => {
    setIsDropped(true);

    // ドロップされたファイルのディレクトリパス
    const droppedFileDir = path.dirname(droppedFilePath);

    // テキストファイル名
    const txtFileName =
      settings.textFileName.replace("{audioFileName}", path.parse(droppedFilePath).name) + ".txt";

    // テキストファイルのフルパス
    const txtFilePath = path.join(droppedFileDir, txtFileName);

    // 例外処理----------------------------
    // ファイルが存在しない場合
    if (fs.existsSync(txtFilePath) === false) {
      evalTS(
        "showAlert",
        `テキストファイルが見つかりませんでした\nテキストファイルが存在しないか、テキストファイルに関する設定が間違っている可能性があります。\n参照したファイル:\n${txtFilePath}`,
      );
      setIsDropped(false);
      setIsDragOver(false); // ドラッグオーバー中を解除 (背景色を戻す)
      return;
    }

    // ドロップされた音声ファイルの拡張子が.wavか.mp3でない場合
    if (path.extname(droppedFilePath) !== ".wav" && path.extname(droppedFilePath) !== ".mp3") {
      evalTS(
        "showAlert",
        "この拡張子には対応していません\n音声ファイルの拡張子は.wavか.mp3である必要があります。",
      );
      setIsDropped(false);
      setIsDragOver(false); // ドラッグオーバー中を解除 (背景色を戻す)
      return;
    }

    // -----------------------------------

    // テキストファイルを読み込む

    // ExtendScriptを実行
    evalTS("placeAudioWithSubtitles", {
      voiceFilePath: droppedFilePath,
      mgtFilePath: settings.subtitle,
      text: "テキスト",
      audioTrackNumber: settings.audioTrack,
      videoTrackNumber: settings.subtitleTrack,
      subtitleDurationBuffer: settings.buffer,
    }).then((res) => {
      // スクリプト終了時、終了コードが0なら  isDroppedをfalseに
      if (res.exitCode === 0) {
        setIsDropped(false);
        setIsDragOver(false); // ドラッグオーバー中を解除 (背景色を戻す)
      }
    });
  };

  return (
    <div
      className={`h-96 w-full flex items-center justify-center ${isDragOver ? "bg-zinc-400" : "bg-zinc-700"}`}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e.dataTransfer.files[0].path); // .pathで警告が出てるが動くのでおｋ
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
    >
      {/* ドロップされるエリア */}
      <span className="text-white">{isDropped ? "処理中..." : "ここに音声ファイルをドロップ"}</span>
    </div>
  );
};

export default DropArea;
