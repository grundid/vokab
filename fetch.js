const fs = require('fs');
var list = [];
const reListDirSubdir = function (subDir) {

    fs.readdirSync(subDir).forEach(function (file) {
        const stat = fs.statSync(subDir + "/" + file);
        if (stat.isDirectory()) {
            reListDirSubdir(subDir + "/" + file);
        }
        list.push(file);
       });
}
reListDirSubdir("data");
console.log(list);
