"use strict";
// 定义接口
// interface Husband{
//     sex:string
//     interest:string
// }
var myhusband = { sex: '男', interest: '看书、做家务', maiBaoBao: true };
console.log(myhusband);
var mySearch;
mySearch = function (source, subString) {
    var flag = source.search(subString);
    return (flag != -1);
};
console.log(mySearch('高、富、帅、德', '胖'));
