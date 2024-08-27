const os = require('os');
const platform = os.platform();

const nl_code = document.getElementById("nl_code");
let nl_code_selectIndex = nl_code.value;

if (platform === "win32") {
    nl_code_selectIndex = 0;
} else {
    nl_code_selectIndex = 1;
}

nl_code.selectedIndex = nl_code_selectIndex;