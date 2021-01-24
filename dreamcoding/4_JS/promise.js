'use strict';

// Promise is a JavaScript object for asynchronous operation.

// 1. State (성공? 실패?)
// state : pending(수행중) -> fulfilled or rejected



// 2. 배포자/쓰는자 구별
// Producer vs Consumer


// 1) Producer
// 새로운 promise가 생성되자마자 바로 exec함수가 실행되니깐 유의해.
const promise = new Promise((resolve, reject) => {
    // doing some heavy work
    // 따라서 비동기로 처리하고, 다른작업을 수행할수있께 이런식으로 짜는게 좋음
    console.log('doing something...');
    setTimeout(()=>{
        // 시간이 되면 resolve함수에 value 전달
        //resolve('ellie');
        reject(new Error('no network'));
    }, 2000)
})


// 2) Consumers: then, catch, finally
promise.then((value) => {
    console.log(value); // 고대로 프로미스가 리턴됨.
})
.catch(error => {
    console.log(error);
})
.finally(()=>{
    console.log('finally'); //그냥 실패, 성공 상관없이 항상 호출
})




const fetchNumber = new Promise((resolve, reject)=>{
    setTimeout(()=> resolve(1), 1000);  //성공하면 1의 값 전달
})

fetchNumber
.then(num => num * 2)
.then(num => num * 3)
.then(num => { // 이걸 서버에 보내서 다른 숫자를 받을거임
    return new Promise((resolve, reject) => {
        setTimeout(()=>resolve(num-1), 1000);
    });
})
.then(num => console.log(num));


console.clear();


// 오류 처리 방식
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });


const getEgg = (hen) =>
    new Promise((resolve, reject) => {
        //setTimeout(()=>resolve(`${hen} => 👁`), 1000);
        setTimeout(()=>reject(new Error(`${hen} => 👁`)), 1000);
        // 에러가 발생하게 된다면 이거 핸들링 해줘야함.(catch)
    });


const cook = (egg) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg}=>🐣`), 1000);
    });



// 이 함수를 실행하면 promise obj를 return받음
getHen()
    .then((hen) => getEgg(hen))
    .catch(error => {
        return '🦆';
    })
    .then((egg)=> cook(egg))
    .then(meal => console.log(meal));


// 이런식으로 생략도 가능
getHen()
    .then(getEgg)
    .catch(error => {
        return '🦆';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log);