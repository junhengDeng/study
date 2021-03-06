Array

new Array()

length
constructor
prototype

join

reverse
concat
push
pop
unshift
shift
slice
splice

indexOf
lastIndexOf

isArray

map
forEach
some
every
filter
reduce
reduceRight
sort

charAt
charCodeAt

Object

new Object()
constructor
prototype

getOwnPropertyDescriptor
getOwnPropertyNames
keys
defineProperty
defineProperties
preventExtensions
isExtensible
seal
isSealed
freeze
isFrozen

configurable
enumerable
writen
value

get
set


Number

new Number()
Number()
Number.toFixed() 0 - 20

Math
ceil
floor
round
random
PI

Date

new Date()
getFullYear
getMonth
getDay
getDate
getHours
getMinutes
getSeconds
getMillscconds
getTime
getTimezoneOffset
parse
getUTCFullYear
    ...
    set...

    String

new String()
constructor
prototype

concat
split
charAt
charCodeAt

toUpperCase
toLowerCase

indexOf
lastIndexOf
search

match
replace

slice(start, end)
substr(start, length)
substring(start, end)

trim

JSON
parse
stringify

Function
parseInt
parseFloat

decodeURI
encodeURI
decodeURIComponent
encodeURIComponent

escape
unescape



function thunk(fn) {
    return function () {
        var ctx = this;
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i]
        }

        return function (done) {
            var caller;
            args.push(function () {
                if (caller) return;
                caller = true;
                done.apply(null, arguments)
            })
            try {
                fn.apply(ctx, arguments)
            } catch (err) {
                done(err)
            }
        }
    }
}

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

function* gen() {
    try {
        var f1 = yield readFile(FileA)
        var f2 = yield readFile(FileB)
        console.log(f1.toString())
        console.log(f2.toString())
    } catch (err) {
        console.log(err)
    }

}

var g = gen()

g.next().value.then(res => {
    console.log(res)
    g.next(res).value.then(res => {
        console.log(res)
        g.next(res)
    })
})

function run(gen) {
    var g = gen()

    var next = function (data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data)
        })
    }

    next()
}
run(gen)


function co(gen) {
    // 1. ?????????gen????????????,??????Promise??????
    var ctx = this;

    return new Promise(function (resolve, reject) {
        // ???????????????gen?????????Generator??????.?????????,??????????????????,??????????????????????????????;
        // ?????????????????????,??????Promise?????????????????????resolved
        if (typeof gen === 'function') gen = gen.call(ctx);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        // ??????,co???Generator????????????????????????????????????next??????,?????????onFulfilled??????.?????????????????????????????????????????????
        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e)
            }
            next(ret)
        }

        // ?????????next??????,????????????????????????
        function next(ret) {
            // ????????????????????????????????? Generator ?????????????????????????????????????????????
            // ????????????????????????????????????????????? Promise ?????????
            // ?????????????????? then ?????????????????????????????????????????????????????? onFulfilled ?????????????????? next ?????????
            // ???????????????????????????????????????????????????????????? Thunk ????????? Promise ??????????????? Promise ????????????????????? rejected????????????????????????
            if (ret.done) return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' +
                'but the following object was passed: "' + String(ret.value) + '"'));

        }
    })
}


co(gen).then(res => console.log(res))

co(function* () {
    var res = yield [
        Promise.resolve(1),
        Promise.resolve(2)
    ]
    console.log(res)
}).catch(onerror)

co(function* () {
    var res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2)
    }
    console.log(res)
}).catch(onerror)

co(function* () {
    var values = [n1, n2, n3]
    yield values.map(somethingAsync)
})

function* somethingAsync(x) {
    // do somethind async
    return y
}

var fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readName(fileName, function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

var gen = function* () {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};

var asyncReadFile = async function() {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}

Generator?????????*?????????async,???yield ?????????await??????

function *gen(){yield dsd}

async function gen(){await dsd}

function spawn(genF) {
    return new Promise(function(resolve,reject){
        var gen = genF();
        function step(nextF){
            try{
                var next = nextF()
            } catch(e) {
                return reject(e)
            }

            if (next.done) {
                return resolve(next.value)
            }
            Promise.resolve(next.value).then(function(v) {
                step(function() {return gen.next(v)})
            }, function(e) {
                step(function() {return gen.throw(e)})
            })
        }
        step(function() {return gen.next(undefined)})
    })
}

async function * readFiles(path) {
    let file = await fileOpen(path);

    try{
        while(!file.EOF) {
            yield await file.readFile();
        }
    } finally {
        await file.close()
    }
}

