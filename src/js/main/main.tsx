import { useCallback, useEffect, useState } from "react";
import { os, path } from "../lib/cep/node";
import {
  csi,
  evalES,
  evalFile,
  openLinkInBrowser,
  subscribeBackgroundColor,
  evalTS,
} from "../lib/utils/bolt";

import "./main.scss";

import ParamSettingsArea from "../components/SettingsArea";
import { useDropzone } from "react-dropzone";

const Main = () => {
  const [message, setMessage] = useState("not dragged");

  const onDrop = useCallback((files: File[]) => {
    dragged();
  }, []);

  const dragged = () => {
    console.log("Files dropped. from Node.js(React)");
    // evalES(`$.writeln("Files dropped. from ExtendScript writeln");`);
    // evalES(`console.log("Files dropped. from ExtendScript consolelog");`);

    evalTS("helloWorld");
    setMessage(message === "dragged" ? "not dragged" : "dragged");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="app">
      <header className="app-header">
        <p>{message}</p>
        <div {...getRootProps} className="h-96 w-full bg-zinc-700 flex items-center justify-center">
          {/* ドロップされるエリア */}
          <input {...getInputProps} />
          <span className="text-white">音声ファイルをここにドロップ</span>
        </div>

        <button className="bg-blue-500 text-white p-4" onClick={dragged}>
          ドロップ後の処理を開始
        </button>

        <ParamSettingsArea />
      </header>
    </div>
  );
};

export default Main;
