const fs = require('fs');

// テキストファイルのパスを取得
function searchTextFile(audioFilePath) {
    const textFilePath = audioFilePath.replace(".wav", ".txt");

    // テキストファイルが存在するかチェック
    if (fs.existsSync(textFilePath)) {
        // テキストファイルを読み込む
        const text = fs.readFileSync(textFilePath, 'utf8');
        return text;
    } else {
        return "";
    }
}

module.exports = {
    searchTextFile
};