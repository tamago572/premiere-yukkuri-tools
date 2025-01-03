import { useState } from "react";

const ParamSettingsArea = () => {
  const [settings, setSettings] = useState({
    subtitle: "Default2",
    subtitleFile: "",
    subtitleTrack: 114,
    audioTrack: 514,
    buffer: 100,
    textEncoding: "shift-jis",
    lineFeedCode: "crlf",
    debugMode: true,
  });

  return (
    <div className="text-left">
      <div className="border p-4">
        <p className="pb-2 font-bold">- Debug -</p>

        <p>じまく： {settings.subtitle}</p>
        <p>V： {settings.subtitleTrack}</p>
        <p>A： {settings.audioTrack}</p>
        <p>buffer： {settings.buffer} ms</p>
        <p>Text ecd： {settings.textEncoding}</p>
        <p>line ecd： {settings.lineFeedCode}</p>
        <p>debug： {settings.debugMode ? "yes" : "no"}</p>
      </div>

      <h1 className="text-2xl font-bold">設定</h1>

      <div className="grid gap-4 my-8">
        <h2 className="text-xl font-bold">字幕設定</h2>

        <label htmlFor="">
          <span className="mr-2">使用する字幕</span>
          <select
            name=""
            id=""
            className="text-black p-1 rounded-sm"
            value={settings.subtitle}
            onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
          >
            <option value="Default">Default</option>
            <option value="Default1">Default1</option>
            <option value="Default2">Default2</option>
            <option value="Default3">Default3</option>
          </select>
        </label>

        <label htmlFor="">
          <span className="mr-2">字幕の追加</span>

          <input type="file" className="text-black p-1 rounded-sm" />
          <br />
          <button className="bg-white text-black py-1 px-3">追加</button>
        </label>
      </div>

      <div className="grid gap-4 my-8">
        <h2 className="text-xl font-bold">配置設定</h2>

        <h3 className="text-lg font-bold">
          トラック
          <br />
          <span className="text-sm text-gray-400 font-normal">
            クリップを配置するトラック番号を指定します
          </span>
        </h3>

        <label htmlFor="">
          <span className="mr-2">字幕</span>
          <span className="pr-1">V</span>
          <input
            type="number"
            className="text-black p-1 rounded-sm"
            value={settings.subtitleTrack}
            onChange={(e) => {
              setSettings({ ...settings, subtitleTrack: e.target.valueAsNumber });
            }}
          />
        </label>

        <label htmlFor="">
          <span className="mr-2">音声</span>
          <span className="pr-1">A</span>
          <input
            type="number"
            className="text-black p-1 rounded-sm"
            value={settings.audioTrack}
            onChange={(e) => {
              setSettings({ ...settings, audioTrack: e.target.valueAsNumber });
            }}
          />
        </label>

        <h3 className="text-lg font-bold">
          クリップ
          <br />
          <span className="text-sm text-gray-400 font-normal">
            クリップ自体に関する調整を行えます
          </span>
        </h3>

        <label htmlFor="">
          <span className="mr-2">バッファ</span>
          <input
            type="number"
            className="text-black p-1 rounded-sm"
            value={settings.buffer}
            onChange={(e) => {
              setSettings({ ...settings, buffer: e.target.valueAsNumber });
            }}
          />
          ms
          <br />
          <span className="text-sm text-gray-400">クリップの長さ += nミリ秒 を設定します</span>
        </label>
      </div>

      <div className="grid gap-4 my-8">
        <h2 className="text-xl font-bold">詳細設定</h2>

        <h3 className="text-lg font-bold">テキストファイルの設定</h3>

        <label htmlFor="">
          <span className="mr-2">文字コード</span>
          <select
            name=""
            id=""
            className="text-black p-1 rounded-sm"
            value={settings.textEncoding}
            onChange={(e) => {
              setSettings({ ...settings, textEncoding: e.target.value });
            }}
          >
            <option value="shift-jis">Shift-JIS</option>
            <option value="utf-8">UTF-8</option>
          </select>

          <br />
          <span className="text-sm text-gray-400">
            音声合成ソフトの設定と一致させる必要があります
          </span>
        </label>

        <label htmlFor="">
          <span className="mr-2">改行コード</span>
          <select
            name=""
            id=""
            className="text-black p-1 rounded-sm"
            value={settings.lineFeedCode}
            onChange={(e) => {
              setSettings({ ...settings, lineFeedCode: e.target.value });
            }}
          >
            <option value="crlf">CRLF</option>
            <option value="lf">LF</option>
          </select>

          <br />
          <span className="text-sm text-gray-400">WindowsではCRLF, MacではLFが推奨されます</span>
        </label>

        <label htmlFor="">
          <span className="mr-2">Debug Mode</span>
          <input
            type="checkbox"
            name=""
            id=""
            checked={settings.debugMode}
            onChange={(e) => {
              setSettings({ ...settings, debugMode: e.target.checked });
            }}
          />

          <br />
          <span className="text-sm text-gray-400">
            デバッグモード。開発用のパラメーターが表示されます。バグ報告にどうぞ。
          </span>
        </label>
      </div>

      <button className="bg-red-500 text-white py-1 px-3">設定の初期化</button>
    </div>
  );
};

export default ParamSettingsArea;
