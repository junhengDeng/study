# flex

display: flex; inline-flex

1. flex 容器 （flex container）
2. 容器默认有两个轴：水平的主轴（main axis），垂直的交叉轴(cross axis)
   1. main start main end      cross start cross end
   2. main size cross size
3. 6个属性
   1. flex-direction (决定主轴的方向)
      1. row | row-reverse | column | column-reverse
      2. row代表水平方向 从左到右 row-reserve 从右到左
      3. column 代表垂直方向 从上到下 column-reserve 从上到下
   2. flex-wrap（是否换行）
      1. nowrap | wrap | wrap-reverse
      2. wrap 第二行在下面
      3. wrap-reverse 第二行在上面
   3. flex-flow（是flex-direction和flex-wrap的简写）
      1. flex-direction || flex-wrap
   4. jusity-content（定义了项目在主轴的对齐方式）
      1. flex-start | flex-end | center | space-between(两端对齐) | space-around(每个项目两侧的间隔相等)
   5. align-items（定义项目在交叉轴上如何对齐）
      1. flex-start | flex-end | center | baseline(项目第一行文字基线对齐) | stretch(默认值，占满整个容器的高度)
   6. align-content （定义多根主轴的对齐方式，如果项目只有一个轴线，该属性不起作用）
      1. flex-start(与交叉轴的start处对齐) | flex-end(与交叉轴的end处对齐) | center(与交叉轴center处对齐) | space-between(与交叉轴两端对齐) | space-around(两端留有空格) | stretch
4. items的6个属性
   1. order(定义项目排序，数值越小，排列越靠前，默认为0)
   2. flex-grow（定义项目的放大比列，默认为0，即有剩余空间也不会放大，所有项目为1，会等分剩余空间，其中一个为2，那么这个项目的剩余空间会比其他响多一倍）
   3. flex-shrink（定义项目缩小比例，默认为1，剩余空间不够时，设置该flex-shrink的项目会缩小）
   4. flex-basis（定义项目占据主轴空间）
   5. flex(简写flex-grow,flex-shrink,flex-basis)
   6. align-self(单个项目的在交叉轴的对齐方式)
      1.  auto | flex-start | flex-end | center | baseline | stretch