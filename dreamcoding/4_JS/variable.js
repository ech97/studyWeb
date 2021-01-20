// 개발공부를 위해 꼼꼼하게 체크하라는 선언
'use strict';




function init(){

}

let name = 'ellie';
console.log(name);
name = 'hello';
console.log(name);



init();


/*
function, first-class function // JS에서는 함수도 변수로 할당됨. (class 할당되는거마냥) // = first class func

number = int, float 등등을 number로 통합
프로그램이 동작하면서 알아서 형 변환함
*/

// object
const ellie = { name: 'Chan', age: 20 };


// 배열을 param으로 받음
function printAll(...args){
    for (let i = 0; i < args.length; i++){
        console.log(args[i]);
    }
    // 파이썬 for in
    for (const arg of args){
        console.log(arg);
    }
}


printAll('dream', 'coding', 'ellie');



// 함수의 호출명을 설정하지않은게 그냥 Anonymous Function 이었따니ㅋㅋㅋ 이름붙이면 named func.
// 함수도 hoisting 돼서, 선언 전에 호출가능. 
const joint = function() {
    console.log('print');
};

joint(); // 이렇게 함수 호출 가능


// Arrow Function은 결국 이걸 간단하게 만들어주는아이
const add = (a, b) => a + b;

const add1 = function(a, b) {
    return a + b;
};

const add2 = (a, b) =>  {
    // do something more
    return a*b;
};


// IIFE : 함수를 바로 실행
(function hello() {
    console.log('IIFE');
})();



const Calculate = (cmd, a, b) => {
    switch (cmd) {
        case 'add':
            return a+b;
            break;
        case 'sub':
            return a-b;
            break;
        case 'mul':
            return a*b;
            break;
        case 'div':
            return a/b;
            break;

        default:
            console.log(`${cmd}는 없는 명령어입니다.`)
    }
}

const result = Calculate('add', 1, 3);




// class = fields + methods
