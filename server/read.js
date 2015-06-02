var fs = require("fs");
function readFile(path) {
    var htmlStr = fs.readFileSync(path, 'utf-8');
    //htmlStr = renderInclude(htmlStr);
    return htmlStr;
}
function readDir(path, icallback, callback) {
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('read dir error');
            throw err;
        } else {
            //遍历
            files.forEach(function(item) {
                icallback(item, path + item);
            });
        }
        callback();
    });
}
//<%mod_load\('(.*)'\s*,\s*'(\w+)'\s*,\s*'(\w+)'\)%>
//<%mod_load('body之前内容','unitaryConfig','body_before.html')%>
function renderInclude(str) {
    var reg = /<%mod_load\(.*\)%>/;
    if(!reg.test(str)) {//无引入标记，则原样返回字符串
        return str;
    }

    var reg2 = /<%mod_load\('(.*?)','(.+?)','(.+?)'\)%>/g;
    str = str.replace(reg2, function(include, title, dir, file) {
        if(title != '') {
            title = '<!--'+ title +'-->';
        }
        var path = './wd/mods/'+ dir+ '/' +file;
        console.log(path);
        //var content = readFile(path);
        //var rst = title + content;
        return 'xxx';
    });
}

exports.readFile = readFile;
exports.readDir = readDir;