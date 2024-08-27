const os = require('os');
const platform = os.platform();

const charactor_code = document.getElementById("charactor_code");
let charactor_code_selectIndex = charactor_code.value;
const nl_code = document.getElementById("nl_code");
let nl_code_selectIndex = nl_code.value;

if (platform === "win32") {
    charactor_code_selectIndex = 0; // Shift_JIS
    nl_code_selectIndex = 0; // CR+LF
} else {
    charactor_code_selectIndex = 1; // UTF-8
    nl_code_selectIndex = 1; // LF
}

nl_code.selectedIndex = nl_code_selectIndex;
charactor_code.selectedIndex = charactor_code_selectIndex;