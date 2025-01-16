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

import SettingsArea from "../components/SettingsArea";
import DropArea from "../components/DropArea";

const Main = () => {
  const [settings, setSettings] = useState({
    subtitle: "Default2",
    subtitleFile: "",
    subtitleTrack: 2,
    audioTrack: 2,
    buffer: 100,
    textFileName: "{audioFileName}",
    textEncoding: "shift-jis",
    lineFeedCode: "crlf",
    debugMode: true,
  });

  return (
    <div className="app">
      <header className="app-header">
        <DropArea settings={settings} setSettings={setSettings} />
        <SettingsArea settings={settings} setSettings={setSettings} />
      </header>
    </div>
  );
};

export default Main;
