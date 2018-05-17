class Greeter {
    greeting: string;
    constructor(message: string){
        this.greeting = message;
    }
    greet () {
        return "hello," + this.greeting;
    }
}




let app = {
    el: '#app',

    data () {
        return {

        }
    },

    created () {

    },

    mounted () {

    },

    methods () {
        return {

        }
    }
};

// 1.多行字符串
let a = `ewtw
ertyeryrtey`

// 2.多行字符串模板
let v2 = 'luogeger';
let fn2 = () => {
    return 'asdf';
}

console.log(`hello ${v2}`)
console.log(`hell0 ${fn2()}`)

let v2_1 =
    `<div>
    <span>${v2}</span>
    <span>${fn2()}</span>
    <span>temp</span>
</div>`

// 3.自动拆分字符串
let nameStr = 'luogeger';
let ageFn = () => {
    return 18;
}
let fn2_1 = (temp, name, age) => {
    console.log(temp)
    console.log(name)
    console.log(age)
};

fn2_1`hello my name is ${nameStr}, I am ${ageFn()}`;


// 4.参数类型：在参数后面使用冒号来制定参数的类型
// string, any, number, boolean
let str4: string = 'luogeger';
let str4_1 = 'luo';
// str4_1 = 13;// 这里就会报错

let str4_2: any = 'luo';
str4_2 = 18;// 不会报错

// 函数返回值类型设置，也可以设置不要返回值
class Obj4 {
    name: string;
    age: number;
}

let c4: Obj4 = new Obj4();
c4.age = 18;// 这里必须用 number 类型


// 5.默认参数：在参数声明后面用等号来指定参数的默认值

// 方法的参数指定默认值
let fn5 = (a: string, b: string, c: string = 'xiaoi') => {
    // c不赋值的话，必须传3个参数
    // 如果传2个参数，有默认值的参数必须放在最后面，不然就是相当于传了2个参数
};

// 6.可选参数：在方法的参数后面用问号 ？ 来表明此参数为可选参数
// 可选参数，必须在必选参数的后面
let fn6 = (a: string, b?: string, c: string = 'xiaoi') => {
    console.log(a)
    console.log(b)
    console.log(c)
};
fn6('lucy');// 这样传一个参数也不会报错

// 7.函数新特性， Rest and Spread 操作符：用来声明任意数量的方法参数
let fn7 = (...args) => {
    args.forEach((item) => {
        console.log(item)
    })
};
let v7 = [1,3,4,6,7,9];
fn7(2,3,4,5);
fn7(...v7);


// 8.generator函数：控制函数执行过程，手工暂停和回复代码执行

// 9.destructuring 析构表达式：通过表达式将对象或数组析解成任意数量的变量
let getStock = () => {
    return {
        code: 'IBM',
        price: 100,
    }
};

let {code: v9_1, price: v9_2} = getStock();//

// 10.箭头函数: 用来声明匿名函数， 消除传统匿名函数的this指针问题

// 11. forEach(), for in, for of

