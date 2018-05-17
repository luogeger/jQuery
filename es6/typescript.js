var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "hello," + this.greeting;
    };
    return Greeter;
}());
var app = {
    el: '#app',
    data: function () {
        return {};
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: function () {
        return {};
    }
};
// 1.多行字符串
var a = "ewtw\nertyeryrtey";
// 2.多行字符串模板
var v2 = 'luogeger';
var fn2 = function () {
    return 'asdf';
};
console.log("hello " + v2);
console.log("hell0 " + fn2());
var v2_1 = "<div>\n    <span>" + v2 + "</span>\n    <span>" + fn2() + "</span>\n    <span>temp</span>\n</div>";
// 3.自动拆分字符串
var nameStr = 'luogeger';
var ageFn = function () {
    return 18;
};
var fn2_1 = function (temp, name, age) {
    console.log(temp);
    console.log(name);
    console.log(age);
};
(_a = ["hello my name is ", ", I am ", ""], _a.raw = ["hello my name is ", ", I am ", ""], fn2_1(_a, nameStr, ageFn()));
// 4.参数类型：在参数后面使用冒号来制定参数的类型
// string, any, number, boolean
var str4 = 'luogeger';
var str4_1 = 'luo';
// str4_1 = 13;// 这里就会报错
var str4_2 = 'luo';
str4_2 = 18; // 不会报错
// 函数返回值类型设置，也可以设置不要返回值
var Obj4 = (function () {
    function Obj4() {
    }
    return Obj4;
}());
var c4 = new Obj4();
c4.age = 18; // 这里必须用 number 类型
// 5.默认参数：在参数声明后面用等号来指定参数的默认值
// 方法的参数指定默认值
var fn5 = function (a, b, c) {
    if (c === void 0) { c = 'xiaoi'; }
    // c不赋值的话，必须传3个参数
    // 如果传2个参数，有默认值的参数必须放在最后面，不然就是相当于传了2个参数
};
// 6.可选参数：在方法的参数后面用问号 ？ 来表明此参数为可选参数
// 可选参数，必须在必选参数的后面
var fn6 = function (a, b, c) {
    if (c === void 0) { c = 'xiaoi'; }
    console.log(a);
    console.log(b);
    console.log(c);
};
fn6('lucy'); // 这样传一个参数也不会报错
// 7.函数新特性， Rest and Spread 操作符：用来声明任意数量的方法参数
var fn7 = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (item) {
        console.log(item);
    });
};
var v7 = [1, 3, 4, 6, 7, 9];
fn7(2, 3, 4, 5);
fn7.apply(void 0, v7);
// 8.generator函数：控制函数执行过程，手工暂停和回复代码执行
// 9.destructuring 析构表达式：通过表达式将对象或数组析解成任意数量的变量
var getStock = function () {
    return {
        code: 'IBM',
        price: 100,
    };
};
var _b = getStock(), v9_1 = _b.code, v9_2 = _b.price; //
var _a;
// 10.箭头函数: 用来声明匿名函数， 消除传统匿名函数的this指针问题
// 11. forEach(), for in, for of
