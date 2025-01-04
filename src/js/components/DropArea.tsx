import { useState, useEffect, useCallback } from "react";
import { DropEvent, useDropzone } from "react-dropzone";
import { evalTS } from "../lib/utils/bolt";
import { os } from "../lib/cep/node";
import path from "path";

// TODO: フルファイルパスの取得には、CSInterface.js (Adobeが提供している。HTMLとNode.jsを通信する的なやつ？）を用いる必要があるため、
// addEventListenerでのDrop処理に変える必要があるかもしれない。useEffect(() => {});を使う

const DropArea = () => {
  const [isDropped, setIsDropped] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    setIsDropped(true);

    alert(files[0].type);

    // ExtendScriptを実行
    evalTS("placeAudioWithSubtitles", { subtitleFilePath: "a", voiceFilePath: "ab" }).then(
      (res) => {
        // スクリプト終了時、返り値が0なら  isDroppedをfalseに
        if (res.exitCode === 0) {
          setIsDropped(false);
        }
      },
    );
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`h-96 w-full flex items-center justify-center ${isDragActive ? "bg-zinc-400" : "bg-zinc-700 "} `}
    >
      {/* ドロップされるエリア */}
      <span className="text-white">{isDropped ? "処理中..." : "ここに音声ファイルをドロップ"}</span>
    </div>
  );
};

export default DropArea;
