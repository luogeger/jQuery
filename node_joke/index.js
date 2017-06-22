/**
 * Created by luogege on 2017.06.22.
 */

"use strict";

const superAgent = require('superagent');
const cheerio = require('cheerio');
const readline = require('readline');
const colors = require('colors');

// 创建readline.Interface 实现命令行交互
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '正在使用joke-cli, 按回车查看笑话'
})
let url = 'http://www.qiushibaike.com/text/page/';
let page = 1;
let jokeStories = []; // 用来存储笑话的数组

// 载入笑话并存入数组
function loadJokes (){
    if(jokeStories.length < 3){
        superAgent
            .get(url)
            .end((err, res) => {
                if(err) console.error(err);

                const $ = cheerio.load(res.text);
                const jokeList = $('.article .content span');

                jokeList.each(function (index, value){
                    jokeStories.push($(this).text());
                    // console.log($(this).text());
                })
                page++;
            })
    }
};


rl.prompt();
loadJokes();

// line事件, 每当input流接收到结束符（\n、\r 或 \r\n）时触发 'line' 事件。 通常发生在用户按下 <Enter> 键或 <Return> 键
rl.on('line', (line) => {
    if(jokeStories.length > 0){
        console.log('========================');
        console.log(jokeStories.shift().bgCyan.black);// 用color模块改变输出颜色
        loadJokes();
    }
    else{
        console.log('正在加载中....'.green);
    }
    rl.prompt();
}).on('close', () => {
    console.log('ByeBye!');
    process.exit(0)
})