# Premiere-Yukkuri-Tools

ドラッグアンドドロップだけで音声の配置・タイトルの挿入が出来るようになるエクステンションです。

ゆっくり・VOICEROID・VOICEVOXを使用した動画の作成に役立つと思います。

テロップは、音声ファイルと同名のテキストファイルの中身が参照されます。なので、上記のソフト以外にも、音声書き出し時にテキストファイルが生成されれば、本エクステンションを使うことができます。

Windows、macOSで動作します。Windows10 64bit 22H2、macOS Sonoma 14.5、Premiere Pro 24.6.0で動作確認済みです。

<!-- また、AquesTalk Playerを使用することで、音声の作成・配置・挿入をPremiere Pro内で完結させることが出来ます。

但し、AquesTalkのライセンスに従ってご利用ください。 -->

## 注意

- .mogrtファイルには、After Effectsで作成されたmogrtを使用する必要があります。

- モーショングラフィックステンプレートでの書き出し時、ソーステキストを一番上に配置してください。

After Effectsを使用できない場合、Releasesからサンプルmogrtをダウンロードできるので、そちらをご利用ください。

## オヌヌメソフト

音声ファイルの書き出し時、テキストファイルも一緒に書き出すことができるソフトです。私が使ったことあるソフトしか書いてません。

### Windows

- A.I. Voice Editor (VOICEROID)
- VOICEVOX

### macOS

- VOICEVOX
- MYukkuriVoice (Aquestalk ゆっくり)

## メモ
```
.
├── CSXS
│   └── manifest.xml
├── css
│   ├── boilerplate.css
│   ├── styles.css
│   ├── styles.css.map
│   ├── styles.scss
│   └── topcoat-desktop-dark.min.css
├── icons
│   ├── iconDarkNormal.png
│   ├── iconDarkRollover.png
│   ├── iconDisabled.png
│   ├── iconNormal.png
│   └── iconRollover.png
├── index.html
├── js
│   ├── libs
│   │   ├── CSInterface.js
│   │   └── jquery-2.0.2.min.js
│   ├── main.js
│   └── themeManager.js
└── jsx
    └── hostscript.jsx

7 directories, 17 files

```

jsxフォルダにはExtendScript

main.jsにはhtmlから呼び出されるJS

styles.scssにはCSSを書く。→styles.cssにコンパイル

ExtendScriptの呼び出しは`index.html`→`main.js`→`hostscript.jsx`→んでPremiere Proに行くという流れ
