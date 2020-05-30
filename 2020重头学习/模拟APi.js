Function.prototype.myBind = function myBind(_this) {
    var fn = this;
    var firstArgs = Array.prototype.slice.call(arguments, 1)
    var exportFn = function () {
        var twoArgs = Array.prototype.slice.call(arguments);
        // 因为bind出来之后，返回一个函数，函数就可以new；
        // new的话，会无视传入的this,而是用自己创建的this对象
        // this instanceof exportFn 用来判断this是否是new出来的
        // 是
        // new出来之后，就用自身的this
        // 否
        // 用传入的this
        return fn.apply(this instanceof exportFn ? this : _this, firstArgs.concat(twoArgs))
    }

    if (fn.prototype) {
        var Empty = function(){};
        Empty.prototype = fn.prototype;
        exportFn.prototype = new Empty();
        Empty.prototype = null;
    }

    return exportFn
}

function myNew(fn, ...args) {
    let target = {};
    target.prototype = fn.prototype;
    let res = fn.apply(target, args);
    return res instanceof Object ? res : target;
}