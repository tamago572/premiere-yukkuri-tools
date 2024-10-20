# Premiere-Yukkuri-Tools

ドラッグ&ドロップだけで、「合成音声の配置」・「テロップの挿入」を同時に行うことができるエクステンションです。

ゆっくり・VOICEROID・VOICEVOX等を使用した動画の作成に役立つと思います。

上記のソフト以外にも、音声書き出し時に`.txt`ファイルが生成されれば、本エクステンションに対応できます。

WindowsとmacOSで動作します。

## セットアップ・使い方

### 1. DL・インストール

1. 本リポジトリのReleasesから[ダウンロード](https://github.com/tamago572/premiere-yukkuri-tools/releases/latest)します。

2. [ZXP/UXP Installer](https://aescripts.com/learn/zxp-installer/)を利用し、インストールします。

7. Premiere Proを開き、ウィンドウ → エクステンション → Premiere Yukkuri Tools を選択し、エクステンションを開きます。

### 2. 字幕を追加する

1. 字幕（`.mogrt`ファイル）を用意します。

    AEでモーショングラフィックステンプレートを作成するか、サンプルのテンプレートを[ダウンロード](./mgts)します。

2. Premiere Proのプロジェクトパネルに`.morgrt`ファイルをドラッグ&ドロップします。

3. シーケンスにモーショングラフィックステンプレートを配置します。

4. プロジェクトタブ内の「モーショングラフィックステンプレートメディア」フォルダを開きます。

5. 追加したMGTファイルを右クリックします。

6. 「エクスプローラーで表示」または「Finderで表示」をクリックします。

7. 選択されている.aegraphicsファイルのパスをコピーします

8. 「.mogrtファイルの追加」セクションから、テキストボックスにファイルパスをペーストし、追加をクリックします。

### 3. 音声・テロップを配置する

1. 「.mogrtファイルの指定」セクションから、配置する字幕の種類を選択します。

2. お好みのソフトで.wavと.txtファイルを生成します。

3. .wavファイルをエクステンションにドラッグ&ドロップします

4. 音声と字幕が配置されます

## 動作確認済環境

- Premiere Pro 2024, 2025
- Windows10 22H2
- macOS Sonoma 14.5

最近のPremiere Proが動作すれば、エクステンションも動作すると思います。

## サンプル字幕

[こちら](./mgts)からダウンロードできます

## 注意

- .mogrtファイルには、After Effectsで作成されたmogrtを使用する必要があります。

- AEでモーショングラフィックステンプレートでの書き出し時、ソーステキストを一番上に配置してください。

## オヌヌメソフト

音声ファイルと.txtファイルを一緒に書き出すことができるソフトです。

### Windows

- A.I. Voice Editor (VOICEROID)
- VOICEVOX
- 棒読みちゃん (Aquestalk) txt出力拡張機能必須

### macOS

- VOICEVOX
- MYukkuriVoice (Aquestalk)
