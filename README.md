# Premiere-Yukkuri-Tools

ドラッグ&ドロップだけで、「合成音声の配置」・「テロップの挿入」を同時に行うことができるエクステンションです。

ゆっくり・VOICEROID・VOICEVOX等を使用した動画の作成に役立つと思います。

上記のソフト以外にも、音声書き出し時に`.txt`ファイルが生成されれば、本エクステンションに対応できます。

本リポジトリのReleasesから[ダウンロード](https://github.com/tamago572/premiere-yukkuri-tools/releases/latest)できます。

[ZXP/UXP Installer](https://aescripts.com/learn/zxp-installer/)を利用し、インストールが可能です。

最近のPremiere Pro、Windows、macOSで動作します。

<!-- また、AquesTalk Playerを使用することで、音声の作成・配置・挿入をPremiere Pro内で完結させることが出来ます。

但し、AquesTalkのライセンスに従ってご利用ください。 -->

## 動作確認済環境

- Premiere Pro 2024, 2025
- Windows10 22H2
- macOS Sonoma 14.5

最近のPremiere Proが動作すれば、エクステンションも動作すると思います。

## 注意

- .mogrtファイルには、After Effectsで作成されたmogrtを使用する必要があります。

- AEでモーショングラフィックステンプレートでの書き出し時、ソーステキストを一番上に配置してください。

<!-- After Effectsを使用できない場合、Releasesからサンプルmogrtをダウンロードできるので、そちらをご利用ください。-->

## オヌヌメソフト

音声ファイルと.txtファイルを一緒に書き出すことができるソフトです。

### Windows

- A.I. Voice Editor (VOICEROID)
- VOICEVOX
- 棒読みちゃん (Aquestalk) txt出力拡張機能必須

### macOS

- VOICEVOX
- MYukkuriVoice (Aquestalk)

## 字幕（MGTファイル）の追加方法

1. 使用したい.mogrtファイルをプロジェクトにインポートします
2. プロジェクトタブ内の「モーショングラフィックステンプレートメディア」を開きます
3. 追加したMGTファイルを選択します
4. 右クリックし、「エクスプローラーで表示」または「Finderで表示」をクリックします
5. 選択されている.aegraphicsファイルのパスをコピーします
6. エクステンションで使用できます

