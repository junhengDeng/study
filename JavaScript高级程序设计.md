## JavaScript高级程序设计

1. 基本类型 undefined number string boolean null 复杂类型 object
2. typeof可以得到 undefined string number boolean object function
3. typeof 未初始化的变量 得到undefined
4. undefined派生于null，所以undefined == null为true
5. ![1561364072396](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\1561364072396.png)
6. number类型 8进制 前面要有个0例如080为56 16进制 前面要有个0x, 例如0xA为10 0-9A-F,最后所有的都会转化成10进制
7. ieee754数值浮点数计算会有错误
8. 任何数值除于0为NaN
9. NaN不等于任何数，包括自己本身
10. isNaN()会尝试将这个值转换为数值
11. isNaN，对象会先valueOf出来的值能不能转换为数值，不能再将这值toString看能不能转换为数值
12. Number()对任何类型做转换
    parseInt，parseFloat为string转number