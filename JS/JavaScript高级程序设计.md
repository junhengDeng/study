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

17. +加性操作符
    如果其中有一个是字符串
    字符串是拼接，
    对象，数值，布尔值调用toString
    undefined和null调用String

18. -减性操作符
    如果其中一个是字符串，
    数值，字符串，布尔值，undefined,null调用Number
    对象调用valueof,不行再调用toString最后转化为数值

19. 关系操作符
    如果两个为数值，
    如果两个字符串，比较字符编码值
    如果其中一个是数值，也将另一个转化成数值
    如果其一是对象，valueof/toString,再转成数值
    如果其一是布尔，转成数值

20. 相等操作符
    相等和全等的基本规则
    如果其一是布尔值，先转化数值
    如果其一字符串，其一数值，先将字符串转化
    如果一个是对象，另一个不是，对象调用valueOf，再重新比较
    相等规则
    null和undefined相等
    要比较相等性之前，不能将null和undefined转化
    NaN跟谁比较都是false
    两个对象，比较是否指向同一个对象

21. function
    arguments可以拿到全部传进来的参数，重载功能，根据arguments的长度来做不同的事，但不是真正意义上的重载
    arguments的值改变，参数也会跟着变，严格模式不会

22. 基本类型和引用类型
    undefined,null,boolean,number,string（给基本类型定义属性没用）
    对象

23. 监测类型

    1. typeof
       1. 监测基本类型比较准
          1. string，number，boolean，undefined, function
          2. object(null, object, array)

