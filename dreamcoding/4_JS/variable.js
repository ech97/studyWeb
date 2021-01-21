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
// Class는 틀, 그걸 채운게 Object
class fishBread {
    // 생성자임 constructor
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    // public, private로 변수 선언방법은 #을 붙이냐 안붙이냐
    
    // static을 사용하면, '클래스'고유의 변수가 됨. 인스턴스한 애들은 못봄
    // 진짜 ㅈㄴ 자주쓰이는 변수가 있따면, 굳이 인스턴스까지 안해도되게. 그냥 클래스에서 바로 부를수있도록.


    // Method
    speak() {
        console.log(`${this.name}: Hello!`);
    }

    //getter, setter .. private한 멤버변수를 수정하거나 가져오기위한 함수를 별도 제작해야함.
    //여기선 name과 age가 private한 멤버변수임.
    //따라서 생성자도 멤버변수 초기화를 위해선 get함수와 set함수를 사용해야함
    get age() {
        console.log('값을 호출했습니다.');
        return this._age;
    }

    set age(value){
        // this.age = value; // 이렇게 선언하게 된다면, 
        // private 멤버변수 this.age를 value로 초기화하기위해 set()을 계속 호출함
        console.log('값을 대입했습니다');
        this._age = value;

        this._age = value < 0 ? 0 : value;
    }

    // 전체적인 Sequence
    // this.age = value 을 실행하게되면
    // setter함수가 실행되어 _age라는 변수에 value 값 저장.
    // 이후에 this.age를 호출할때,
    // getter함수가 실행되어 _age가 호출됨
}



class Shape {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color of`);
    }

    getArea(){
        return width * this.height;
    }
}

// 상속
class Rectangle extends Shape {}
class Triangel extends Shape {
    draw() {
        super.draw(); // 부모의 메소드를 호출! // 완전 덮어쓰기 되지 않게!
        console.log('😚')
    }
    getArea(){
        return (this.width * this.height) / 2;
    }
}
const rectangle = new Rectangle(20, 20, 'blue');

rectangle.draw();


// instanceof. 특정 Object가 특정 Class의 인스턴스인지 확인하는 명령
console.log(rectangle instanceof Rectangle);

// 자바스크립트의 모든 Object는 다 Object를 상속받아 제작됨.
console.log(rectangle instanceof Object);








