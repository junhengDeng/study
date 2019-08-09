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

13. && 逻辑与 短路操作，如果第一个操作符能决定结果，那么就不会再对第二个操作符求值

14. || 逻辑或   如果第一个操作符为true,就不在对第二个操作符求值了

    1. var myObject = preferredObject || backupObject
    2. myObject将赋予等号后面两值中的一个，如果preferredObject中优先赋给myObject,否则就是backupObject

15. 自我总结

    1. 任何数除以0,都为NaN
    2. 任何数运算NaN，都为NaN
    3. 字符串 + 数字 为 字符串

16. ```js
    1. "brick" < "alphabet"   //true b和a的字符编码比较
    2. "Brick" < "alphabet"  // false  B和a的字符编码比较
    3.  "23" < "3";   //true “2”和“3”的字符编码比较
    4. "23" < 3;   //false   “23”转换成23
    5. "a" < 3;   //false “a”无法转换成有效数值，所以为NaN, NaN与任何操作符都为false
    6. NaN < 3;  //false  NaN与任何操作符都为false
    ```

    

