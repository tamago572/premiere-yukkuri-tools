import { useEffect, useState } from "react";
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

import ParamSettingsArea from "./components/SettingsArea";

const Main = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="h-96 w-full bg-zinc-700 flex items-center justify-center">
          {/* ドロップされるエリア */}
          <span className="text-white">音声ファイルをここにドロップ</span>
        </div>

        <ParamSettingsArea />
      </header>
    </div>
  );
};

export default Main;
