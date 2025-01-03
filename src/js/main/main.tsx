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
import DropArea from "../components/DropArea";

const Main = () => {
  return (
    <div className="app">
      <header className="app-header">
        <DropArea />
        <ParamSettingsArea />
      </header>
    </div>
  );
};

export default Main;
