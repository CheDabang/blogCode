let fs = require('fs');
let path = require('path');
// let join = require('path').join;
// let _num = 0;

function findSync (startPath) {
    // let resultStart= 'let Imglist = ';
    let resultStart = 'let Imglist = [';
    let result = [];

    function finder (path) {
        let files = fs.readdirSync(path);
        // console.log(typeof files);
        files.forEach((val) => {
            let _obg = {};
            let newVal = val + '';
            if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(newVal)) {
                let _file = newVal;
                let _fileName = getFileName(newVal);
                _obg = `{name: '${_fileName}', url: '${_file}'}`;
                result.push(_obg);
            } else {
                console.log(newVal);
            }
        });
    }
    finder(startPath);
    // result = resultStart + JSON.stringify(result)  + ';\nmodule.exports = Imglist;\n';
    result = resultStart + result + '];\nmodule.exports = Imglist;\n';
    return result;
}

// 获取文件名
function getFileName (filePath) {
    let arr = filePath.split('.');
    return arr[0];
}

let createFolder = function (to) {
    // 文件写入
    let sep = path.sep;
    let folders = path.dirname(to).split(sep);
    let p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
};
createFolder('./imgs/imglist.js');
fs.createWriteStream('./imgs/imglist.js');
let fileNames = findSync('./imgs');
fs.writeFile('./imgs/imglist.js', fileNames, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});
