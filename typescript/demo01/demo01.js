"use strict";
var age = 18;
var stature = 178.5;
console.log(age);
console.log(stature);
var jspang = "技术胖 jspang.com";
console.log(jspang);
var REN;
(function (REN) {
    REN[REN["nan"] = 0] = "nan";
    REN[REN["nv"] = 1] = "nv";
    REN[REN["yao"] = 2] = "yao";
})(REN || (REN = {}));
console.log(REN.yao);
var REN1;
(function (REN1) {
    REN1["nan"] = "\u7537";
    REN1["nv"] = "\u5973";
    REN1["yao"] = "\u5996";
})(REN1 || (REN1 = {}));
console.log(REN1.yao);
