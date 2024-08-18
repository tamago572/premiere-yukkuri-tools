/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

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

            // Eventからファイルパスを取得
            let filePath = e.dataTransfer.files[0].path;

            // ファイルパスのバックスラッシュをエスケープ
            filePath = filePath.replace(/\\/g, '\\\\'); // バックスラッシュをダブルバックスラッシュに変換

            showAlert(filePath);

            csInterface.evalScript(`insertAudioAndTitle("${filePath}", "${audio_layer_id}")`);

        }

        function showAlert(msg) {
            csInterface.evalScript(`showAlert("${msg}")`);
        }


        $("#btn_test").click(function () {
            csInterface.evalScript('testbtn()');
        });
    }

    init();

}());

