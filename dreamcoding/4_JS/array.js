'use strict'

// 배열 선언방식 
const array1 = Array();

const array2 = [1, 2, 3];

const fruits = ['🍎','🍊','🍋','🍏'];

// 배열값 불러오기
// for, for..of, forEach


//forEach 콜백함수 불러옴
// 1.
fruits.forEach(function(value, index, array) {
    console.log(value, index, array);
});
console.clear();

//2. 위와같이 익명함수를 사용하는경우는 arrow function 사용할수잇었쮜
fruits.forEach((value, index, array) => {
    console.log(value, index, array);
})

// 배열에 값 삽입, 삭제, 복사방법
fruits.push();
fruits.pop();
console.log(fruits);

fruits.unshift();
fruits.shift();
console.log(fruits);

//fruits.splice(1, 2); // 1이라는 index부터 2개 지우기, 안지정하면 1부터 다지움
fruits.splice(1, 1, '🍔', '🌭');

const fruits2 = ['apple', 'pineapple'];
const newFruits = fruits.concat(fruits2);


// Searching
// Find the index
console.clear();
console.log(fruits.indexOf('🍔')); // 해당되는게 없으면 -1
console.log(fruits.lastIndexOf('🍔'));

console.log(fruits.includes('🌭'));




