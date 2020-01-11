// 定义接口
// interface Husband{
//     sex:string
//     interest:string
// }

// let myhusband:Husband = {sex:'男',interest:'看书、做家务'}
// console.log(myhusband)

interface Husband{
    sex:string
    interest:string
    maiBaoBao?:Boolean
}

let myhusband:Husband = {sex:'男',interest:'看书、做家务',maiBaoBao:true}
console.log(myhusband)


interface SearchMan{
    (source:string,subString:string):boolean
}

let mySearch:SearchMan

mySearch = function(source:string,subString:string):boolean{
    let flag = source.search(subString)
    return (flag != -1)
}

console.log(mySearch('高、富、帅、德','胖'))