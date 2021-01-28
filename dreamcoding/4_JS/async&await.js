'use strict';

console.clear();

// Async & Await == Promise를 줄여줌



// //1. async
// function fetchUser() {
//     //do network request in 10 secs...

//     // 언제 끝날진 모르겠지만, 끝나게된다면 resolve또는 reject에 결과를 담아둘게!
//     return new Promise((resolve, reject) => {
//         resolve('ellie');
//     });
// }


// 이걸 이제 async를 쓰면
// 자동으로 Promise를 리턴하게됨.
async function fetchUser() {
    return 'ellie';
}

const user = fetchUser();
user.then(console.log);




// 2. await

// 정해진 시간이 지나면 resolve를 호출하는 함수 제작
function delay(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function getApple(){
    // 3초가 지나면 resolve를 호출할거임. 3초가 지나는동안 기다려(await)
    await delay(5000);
    // throw 'error'; // 에러 발생시키기
    return '🍎'; // async가 있으므로, Promise를 반환하는겨
}

// // 원래였으면
// function getApple(){
//     return delay(5000) // 3초있다가 Promise를 받으면 then으로 안에있는값 빼와서 인자로 넣음
//         .then(() => '🍎');  // 얘도 마찬가지로 Promise 반환(resolve에 사과넣어서)
// }


async function getBanana() {
    await delay(4000);
    return '🍌';
}




// then을 써서 이런식으로 호출해야하는데
// function pickFruits(){
//     return getApple()
//         .then(apple => {
//             return getBanana()
//                 .then(banana => `${banana} + ${apple}`);
//         })
// }

// pickFruits().then(console.log);


async function pickFruits() {
    try{
        const apple = await getApple();
        const banana = await getBanana();
        return `${apple}+${banana}`;
    } catch(e) {
        console.log('error ㅅㄱㅇ!');
    }
};

pickFruits().then(console.log);
// 근데 이렇게 하면 병렬처리의 의미가 없어짐




// 따라서!

async function pickTheFruits() {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    // 이렇게 병렬적으로 실행해서 기다리게 한다음

    const theApple = await applePromise;
    const theBanana = await bananaPromise;
    // Promise를 리턴받고 대입함.(원랜 then을 쓰는건데 그냥 await으로 깔끔하게 처리)

    return `${theApple} +++++ ${theBanana}`;
}

pickTheFruits()
    .then(console.log);



function pickAllFruits() {
    return Promise.all([getApple(), getBanana()]) // 배열안에있는애들의 Promise를 병렬적으로 다 받아옴
        .then(fruits => fruits.join(' + ')); // Pending이 끝날때까지 기다렸다가 resolve나 reject가 호출되면 코드실행
}

pickAllFruits()
    .then(console.log);




function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
} // 제일 먼저 Promise의 (resolve or reject)를 호출하는애만 리턴

pickOnlyOne().then(console.log);