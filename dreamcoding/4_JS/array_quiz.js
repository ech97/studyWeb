const fruits_qz = ['apple', 'banana', 'orange'];

fruitStr = fruits_qz.toString();
fruitStr = fruits_qz.join('|');

console.log(fruitStr);



const fruits_qz1 = "🍕,🍔,🍟,🌭";

fruits_qz2 = fruits_qz1.split(',');

console.log(fruits_qz2);


// Array 자체도 뒤집어버림
fruits_reverse = fruits_qz.reverse();

console.log(fruits_reverse);


// Array 자체도 지워버림. 따라서 그냥 slice쓰는거 추천
const array_qz = [1,2,3,4,5];

array_qz2 = array_qz.splice(2, 4);


console.log(array_qz2);



class Student {
    constructor(name, age, enrolled, score){
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;

    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];

let result_qz = students.find((student) => student.score === 90);

console.log(result_qz)



console.clear();

// true값을 가진 Array element로만 다시 Array를 짬
result_qz = students.filter(
    (student) => student.enrolled
)

console.log(result_qz);


// callback func.를 통해 변환된 값을 다시 Array에 매핑
result_qz = students.map(
    student => student.score
);
console.log(result_qz);


// callback func. 중 하나라도 True인게 있으면 return True
result_qz = students.some(
    (student) => student.score < 50
)
console.log(result_qz);


// callback func. 중 하나라도 False인게 있으면 return False
result_qz = students.every(
    (student) => student.score < 50
)
console.log(result_qz);



// 학생들의 평균점수 가져오기
let sum = 0;
students.forEach(
    (student) => sum += student.score
)
console.log(sum/5);

// 현재값 = curr, 이전 return값 = prev // 초기값 설정 가능
// reculsive랑 느낌이 같디같디.
// prev가 아닌 누적값으로 생각
// Arrow Func.은 return 생략된거
result_qz = students.reduce((prev, curr) => prev + curr.score, 0);

console.log(result_qz);


// return값으로 array 다시 짜는거
result_qz = students.map((student) => student.score)

