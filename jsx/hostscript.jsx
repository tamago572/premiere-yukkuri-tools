/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function sayHello(filePath){
    alert(getCurrentTime());
    alert(`filePath: ${filePath}`);
}

function testbtn() {
    alert("ゆっくりしていってね！！！");
}

function getCurrentTime() {
    if (app.project && app.project.activeItem) {
        return app.project.activeItem.time;
    } else {
        alert("アクティブなコンポジションがありません。");
    }
}