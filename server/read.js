var config = require('./config.js').info;
var fs = require("fs");
function readFile(path) {
    var htmlStr = _readFile(path);//读取内容
    while( /<%mod_load\(.*\)%>/.test(htmlStr)) {
        htmlStr = renderInclude(htmlStr);//执行引入
    }
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

//对有引入代码的文本，进行解析，返回解析后文本
function renderInclude(str) {
    var reg2 = /<%mod_load\('(.*?)','(.+?)','(.+?)'\)%>/g;
    str = str.replace(reg2, function(include, title, dir, file) {
        var title_start = '';
        var title_end = '';
        if(title != '' && config.note === true) {
            title_start = '\r\n<!--=========='+ title + '(' + dir +') start==========-->\r\n';
            title_end = '\r\n<!--=========='+ title + '(' + dir +') end==========-->\r\n';
        }
        var content = _readFile( './wd/mods/'+ dir +'/'+ file);//读取文件内容出来
        return title_start + content + title_end;
    });
    return str;
}

//读取path路径的文件内容
function _readFile(path) {
    try{
        var htmlStr = fs.readFileSync(path, 'utf-8');
    } catch(e) {
        var htmlStr = '<div style="border:1px solid yellow;border-radius:5px;padding:1px 5px;;display:inline-block;color:red;background:yellow;">该文件不存在，路径为：'+ path +'</div>';
    }
    return htmlStr;
}

exports.readFile = readFile;
exports.readDir = readDir;