import {
    getCurrentDate
} from './dateutil';
export function downloadExcel(content, name = '.xls') {
    if (content && (content instanceof Blob)) {
        const blob = new Blob([content]);
        const fileName = getCurrentDate() + name;
        if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
        } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
    }
}

export function sortByKey(key = ''){
    return (value1,value2) =>{
        let val1=value1[key];
        let val2=value2[key];
        return val1-val2;
    }
}

export function objToArray(object = {}) {
    let array = [];
    if (object) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                array.push({
                    id: parseInt(key).toString(),
                    name: element
                });
            }
        }
    }
    return array;
}

// base64转码
export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result.split(",")[1]));
    reader.readAsDataURL(img);
}

// 打开外部链接
export function openOutLink(link) {
    if (link) {
        let win = window.open("", "_blank");
        if (win) {
            win.opener = null;
            let doc = win.document;
            doc.open();
            doc.write(
                '<meta http-equiv="refresh" content="0; url=' + link + '">'
            );
            doc.close();
        }
    }
}

export function filterInvalidObj(obj = {}) {
    let temp = {
        ...obj
    }
    Object.keys(temp).forEach(function (key) {
        if (typeof temp[key] === "string") temp[key] = temp[key].trim();
    });
    for (let item in temp) {
        if (
            temp[item] === '' ||
            temp[item] === undefined ||
            temp[item] === null
        ) {
            delete temp[item]
        }
    }
    return temp
}

export function numFormat(num) {
    num = num.toString().split(".");  // 分隔小数点
    var arr = num[0].split("").reverse();  // 转换成字符数组并且倒序排列
    var res = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (i % 3 === 0 && i !== 0) {
            res.push(",");   // 添加分隔符
        }
        res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if (num[1]) {  // 如果有小数的话添加小数部分
        res = res.join("").concat("." + num[1]);
    } else {
        res = res.join("");
    }
    return res;
}