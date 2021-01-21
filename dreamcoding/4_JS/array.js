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