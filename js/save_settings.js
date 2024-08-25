function addMGTPath(MGTPath) {
    const newData = { path: MGTPath };
    // ファイルパスをLocalStorageに保存
    try {
        const existingData = localStorage.getItem("dataList");
        if (existingData) {
            const parsedData = JSON.parse(existingData);
            parsedData.push(newData);
            localStorage.setItem("dataList", JSON.stringify(parsedData));
        } else {
            throw new Error("LocalStorageにデータが存在しません");
        }
    } catch (e) {
        alert("エラーが発生しました: " + e.message);
    }
}

function getMGTPathList() {
    const existingData = localStorage.getItem("dataList");
    if (existingData) {
        return JSON.parse(existingData);
    } else {
        return [];
    }

}

function initializeLocalStorageData() {
    if (!localStorage.getItem("dataList")) {
        const initialData = [];
        localStorage.setItem("dataList", JSON.stringify(initialData));
    }
}

function clearLocalStorageData() {
    localStorage.removeItem("dataList");
    initializeLocalStorageData();
}

function deleteLocalStorageData(filePath) {
    const existingData = localStorage.getItem("dataList");
    try {
        if (existingData) {
            const parsedData = JSON.parse(existingData);
            const newData = parsedData.filter((data) => data.path !== filePath);
            localStorage.setItem("dataList", JSON.stringify(newData));
        } else {
            throw new Error("LocalStorageにデータが存在しません");
        }
    } catch (e) {
        alert("エラーが発生しました: " + e.message);
    }
}

initializeLocalStorageData();


refreshMGTList();

function refreshMGTList() {
    const mogrtList = document.getElementsByName("mogrt_file");
    const dataList = getMGTPathList();

    mogrtList.forEach(element => {
        // 既存の選択肢をすべて削除
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        // 選択肢を追加
        dataList.forEach(data => {
            let newOption = document.createElement("option");
            newOption.text = data.path;
            newOption.value = data.path;
            element.appendChild(newOption);
        });
    });
}

const addMGTButton = document.getElementById("add_mogrt_file_submit");
addMGTButton.addEventListener("click", () => {
    const addMGTTextField = document.getElementById("add_mogrt_file");
    addMGTPath(addMGTTextField.value);
    refreshMGTList();
});

const deleteMGTButton = document.getElementById("delete_mogrt_file_submit");
deleteMGTButton.addEventListener("click", () => {
    const deleteMGTSelect = document.getElementById("delete_mogrt_file");
    deleteLocalStorageData(deleteMGTSelect.value);
    refreshMGTList();
});
