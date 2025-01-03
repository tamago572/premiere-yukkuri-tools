import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { evalTS } from "../lib/utils/bolt";

const DropArea = () => {
  const [isDropped, setIsDropped] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    console.log("files:" + files);
    setIsDropped(true);

    // ExtendScriptを実行
    evalTS("helloWorld").then((res) => {
      // スクリプト終了時、返り値が0ならisDroppedをfalseに
      if (res === 0) {
        setIsDropped(false);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="h-96 w-full bg-zinc-700 flex items-center justify-center">
      {/* ドロップされるエリア */}
      <span className="text-white">{isDropped ? "処理中..." : "ここに音声ファイルをドロップ"}</span>
    </div>
  );
};

export default DropArea;
