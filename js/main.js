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
        dragArea.addEventListener('dragover', dragOver);
        // ドラッグエリアにファイルが乗っているときの処理
        dragArea.addEventListener('dragleave', dragleave);
        // ドラッグエリアにファイルがドラッグされたときの処理
        dragArea.addEventListener('drag', drag);


        // ドラッグエリアにファイルが乗っているときの処理
        function dragOver(e) {
            e.preventDefault();
            dragArea.classList.add('dragging');
            dragAreaText.textContent = 'ドロップで字幕を挿入';
        }

        // ドラッグエリアからファイルが離れたときの処理
        function dragleave(e) {
            e.preventDefault();
            dragArea.classList.remove('dragging');
            dragAreaText.textContent = 'ここに音声ファイルをD&D';
        }

        // ドラッグエリアにファイルがドラッグされたときの処理
        function drag(e) {
            e.preventDefault();
            dragArea.classList.add('dragging');
            dragAreaText.textContent = 'ドロップで字幕を挿入';
            csInterface.evalScript('sayHello()');

        }


        $("#btn_test").click(function () {
            csInterface.evalScript('sayHello()');
        });
    }

    init();

}());

