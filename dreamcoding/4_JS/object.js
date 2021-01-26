'use strict'

// 오브젝트는 그냥 자주쓰이는거 틀로 만들어놓으면 되는거니깐

const obj1 = {}; // obj literal, 구조체와 비슷하네
const obj2 = new fishBread('chanHyunLee', 25); // obj constructor

const obj3 = {
    _name: 'chanhyun',
    _age: 25,

    get name() {
        console.log('get 호출됨');
        return this._name;
    },

    set name(value) {
        console.log('set 호출됨');
        this._name= value;
    }
};

obj3.name;
obj3.name = "이찬현";
obj3._age;
delete obj3._age;
// 나중에 Object의 요소를 삭제하거나 추가할수있음. (미침)



// 2. Computed properties
console.log(obj2.age);
console.log(obj2['name']);
obj2['hasJob'] = true; // 이렇게 요소 추가 가능



// 2-1. Computed properties는 다음과같이 활용가능
function printValue(obj, key){
    console.log(obj[key])
}

printValue(obj2, 'name')



// 3. Property value shorthand
const Person1 = {name: 'bob', age: 2};
const Person2 = {name: 'dave', age: 24};
const Person3 = {name: 'steve', age: 40};

const Person4 = makePerson('ellie', 30);

//이렇게 구조체를 리턴하는 함수를 작성해서 사용가능
function makePerson(name, age){
    return {
    name: name,
    age: age
    };
}

function makePerson2(name, age){
    return {
        name,
        age
    };
} // 다음과같이 입력받은 인자그대로 key에 사용하는경우 생략 가능

// 이런식으로 IIFE를 활용한 방식도 사용가능
const Person5 = (function makePerson3(name, age){
    return {
        name,
        age
    };
})('chanHyun', 25);



// 4. 어느정도의 규칙이 있음
const fish1 = {name: '붕어', size: 7};
const fish2 = {name: '가재', size: 10};
const fish3 = new Fish('ellie', 100);

// 이렇게 구조체를 리턴해주는 애들은 앞에 대문자를 씀
function Fish(name, size){
    // this = {};
    this.name = name;
    this.size = size;
    // return this;
}

console.log('-------dlcks------');


// 5. in op
console.log('name' in Fish);


// 6. for..in vs for..of
// for (key in obj)
for (const key in fish3){
    console.log(key);
}

const array = [1, 2, 3, 4, 5];
for(let i = 0; i < array.length; i++){
    console.log(i);
}
for(const value of array){
    console.log(value);
}


console.log('-------------');


// 값 복사
const user1 = {name: 'chan', age: 20};
const user2 = user1;

// 무식한 방식
const user3 = {};
for(const key in user1){
    user3[key] = user1[key]; // 이렇게하면 key를 생성하고, value를 대입함
}

// Object 내장함수 사용
let user4 = {};
user4 = Object.assign(user4, user1);
console.log(user4);
// 또는
const user5 = Object.assign({}, user1)
console.log(user5);


