const ParamSettingsArea = () => {
  return (
    <div className="text-left">
      <h1 className="text-2xl font-bold">設定</h1>

      <div className="grid gap-4 my-8">
        <h2 className="text-xl font-bold">字幕設定</h2>

        <label htmlFor="">
          <span className="mr-2">使用する字幕</span>
          <select name="" id="" className="text-black p-1 rounded-sm">
            <option value="Default">Default</option>
            <option value="Default">Default</option>
            <option value="Default">Default</option>
            <option value="Default">Default</option>
          </select>

          <br />
          <span className="text-sm text-gray-400">選択した字幕を自動配置します</span>
        </label>

        <label htmlFor="">
          <span className="mr-2">字幕の追加</span>

          <input type="file" className="text-black p-1 rounded-sm" />
          <br />
          <button className="bg-white text-black py-1 px-3">追加</button>

          <br />
          <span className="text-sm text-gray-400">使用する字幕を追加します</span>
        </label>
      </div>

      <div className="grid gap-4 my-8">
        <h2 className="text-xl font-bold">トラック設定</h2>

        <label htmlFor="">
          <span className="mr-2">字幕</span>
          <span className="pr-1">V</span>
          <input type="number" className="text-black p-1 rounded-sm" />
          <br />
          <span className="text-sm text-gray-400">
            字幕のクリップを配置するトラック番号を指定します
          </span>
        </label>

        <label htmlFor="">
          <span className="mr-2">音声</span>
          <span className="pr-1">A</span>
          <input type="number" className="text-black p-1 rounded-sm" />
          <br />
          <span className="text-sm text-gray-400">
            音声のクリップを配置するトラック番号を指定します
          </span>
        </label>
      </div>

      <div className="grid gap-4 my-8">
        <h2 className="text-xl font-bold">詳細設定</h2>

        <h3 className="text-lg font-bold">テキストファイルの設定</h3>

        <label htmlFor="">
          <span className="mr-2">文字コード</span>
          <select name="" id="" className="text-black p-1 rounded-sm">
            <option value="shift-jis">Shift-JIS</option>
            <option value="utf-8">UTF-8</option>
          </select>

          <br />
          <span className="text-sm text-gray-400">
            ※文字化けが発生した場合は文字コードを変更してください
          </span>
        </label>

        <label htmlFor="">
          <span className="mr-2">改行コード</span>
          <select name="" id="" className="text-black p-1 rounded-sm">
            <option value="crlf">CRLF</option>
            <option value="lf">LF</option>
          </select>

          <br />
          <span className="text-sm text-gray-400">WindowsではCRLF, MacではLFが推奨されます</span>
        </label>
      </div>
    </div>
  );
};

export default ParamSettingsArea;
