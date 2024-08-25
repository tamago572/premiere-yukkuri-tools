/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/
const fs = require('fs');
const iconv = require('iconv-lite');

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {
        
        themeManager.init();
        
        const dragArea = document.getElementById('dragArea');
        
        const dragAreaText = document.getElementById('dragAreaText');
        
        // ドラッグエリアにファイルが乗っているときの処理
        dragArea.addEventListener("dragover", dragOver);
        // ドラッグエリアにファイルが乗っかってきたときの処理
        dragArea.addEventListener("dragenter", dragEnter);
        // ドラッグエリアのファイルが離れたときの処理
        dragArea.addEventListener("dragleave", dragleave);
        // ドラッグエリアにファイルがドロップされたときの処理
        dragArea.addEventListener('drop', drop);


        // ドラッグエリアにファイルが乗っているときの処理
        function dragOver(e) {
            e.preventDefault();
        }
        
        // ドラッグエリアからファイルが離れたときの処理
        function dragleave(e) {
            // マウスポインタの位置を取得
            const x = e.clientX;
            const y = e.clientY;

            // ドラッグエリアの範囲を取得
            const rect = dragArea.getBoundingClientRect();

            // マウスポインタがドラッグエリアの外にあるかどうかをチェック
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                // マウスポインタがドラッグエリアの外にある場合のみ処理を実行
                dragArea.classList.remove('dragging');
                dragAreaText.textContent = 'ここに音声ファイルをD&D';
            }
        }
        
        // ドラッグエリアにファイルが乗っかってきたときの処理
        function dragEnter(e) {
            dragArea.classList.add('dragging');
            dragAreaText.textContent = 'ドロップで字幕を挿入';
            
        }

        // ドラッグエリアにファイルがドロップされたときの処理
        function drop(e) {
            // ブラウザの新しいタブで開くという挙動をキャンセルさせる
            e.preventDefault();

            dragArea.classList.remove('dragging');
            dragAreaText.textContent = 'ドロップで字幕を挿入';

            const audio_layer_id = document.getElementById("audio_layer_id").value - 1;

            // const video_layer_id = document.getElementById("video_layer_id").value - 1; // TODO: ビデオレイヤーの選択機能を追加
            const video_layer_id = 1;

            // Eventからファイルパスを取得
            let filePath = e.dataTransfer.files[0].path;
            // ファイルパスのバックスラッシュをエスケープ
            filePath = filePath.replace(/\\/g, '\\\\'); // バックスラッシュをダブルバックスラッシュに変換


            // テキストファイルを検索
            let subtitle_text = searchTextFile(filePath); // 字幕のテキスト テキストファイルから読み込む

            // プラスする字幕の表示時間(秒)
            let subtitle_duration_buffer = 0.1; // TODO: HTMLから取得。変えられるようにする

            // mogrtファイルのパス
            let MGT_file_path = document.getElementById("select_mogrt_file").value;
            
            if (fs.existsSync(MGT_file_path)) {
                MGT_file_path = MGT_file_path.replace(/\\/g, '\\\\'); // バックスラッシュをダブルバックスラッシュに変換
    
                // 音声、テロップの挿入
                // (AUDIO_FILEPATH, AUDIO_TRACK_NUMBER, VIDEO_TRACK_NUMBER, SUBTITLE_TEXT, SUBTITLE_DURATION_BUFFER, MGT_NODE_ID)
                // 音声ファイルのパス, オーディオトラック番号, ビデオトラック番号, 字幕のテキスト, プラスする字幕の表示時間(秒), mogrtのNodeID
                csInterface.evalScript(`insertAudioAndTitle("${filePath}", ${audio_layer_id}, ${video_layer_id}, "${subtitle_text}", ${subtitle_duration_buffer}, "${MGT_file_path}")`);
                
            } else {
                showAlert("MGTが見つかりませんでした。正しいパスを選択しているか確認してください");
                return;
            }
            

        }

        function showAlert(msg) {
            csInterface.evalScript(`showAlert("${msg}")`);
        }

        if (typeof require !== 'undefined') {
            // showAlert("Node.js is available");
        } else {
            showAlert("Node.js is not available");
        }


        $("#btn_test").click(function () {
            csInterface.evalScript('testbtn()');
        });
    
        
        
        function searchTextFile(audioFilePath) {
            
            try {
                // テキストファイルのパスを取得
                const textFilePath = audioFilePath.replace(".wav", ".txt");

                // テキストファイルが存在するかチェック 
                if (fs.existsSync(textFilePath)) {
                    // テキストファイルを読み込む
                    const data = fs.readFileSync(textFilePath);
                    if (data) {
                        const buffer = new Buffer(data, "binary");
                        let text = iconv.decode(buffer, "Shift_JIS"); // Shift_JISに変換
                        text = text.replace("\r\n", ""); // 改行コード(CR+LF)を削除
                        
                        return text;
                    }
                    return "テキストファイルが見つかりませんでした";
                                        
                } else {
                    return "テキストファイルが見つかりませんでした";
                }
            } catch (e) {
                showAlert("テキストファイルの取得時にエラーが発生しました: " + e.message);
            }
        }
        
    }
    
    init();
    
}());
