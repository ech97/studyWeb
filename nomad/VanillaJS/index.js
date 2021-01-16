//alert("Hello world")

const a = 221;
let b = a - 5;
console.log(a, b)


const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", 'Fri']
console.log(daysOfWeek)

// 딕셔너리랑은 살짝 다른 느낌. class에 가까움
const person_info = {
  name:"chanhyun",
  age: 25,
  gender: "Male",
  isHandsome: true,
  favMovies: ["Along the gods", "LOTR"]
}
console.log(person_info.favMovies[1])


function sayHello(name){  
  console.log(`Hello ${name}`);
  return `Hello ${name}`;
}
const greet = sayHello("Chanhyun");
console.log(greet)


const calculator = {
  plus: function(a, b){
    return a + b;
  }
}
const plus = calculator.plus(5, 5);
console.log(plus)

// HTML의 태그를 가져와 객체로 만듦
// DOM(Document Object Model)
const title = document.getElementById("title");
title.innerHTML = "Hi! "