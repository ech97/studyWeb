'use strict';
// 자바스크립트는 동기적으로 움직임


// hoisting = var, func declaration을 제일 위로 올리는거


console.log('1');
setTimeout(()=>console.log('2'), 1000);
// 이런걸 넣는 순간 async
console.log('3')


// 호출순간 즉각적으로 실행하는 Synchronous callback func.
function printImm(print) {
    print();
}
printImm(()=> console.log('hello'));


// Async. callback
function printDelay(print, ms) {
    setTimeout(()=>print(), ms);
}
printDelay(()=>console.log('hello async'), 1000);




// Hell of Callback Function
class UserStorage {
    logginUser(id, pw, onSuccess, onError){
        setTimeout(()=>{
            if(
                (id === 'ellie' && pw === 'dream') ||
                (id === 'coder' && pw === 'academy')
            ){
                onSuccess(id);
            } else {
                onError(new Error('not found!'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(()=>{
            if (user === 'ellie'){
                onSuccess({name: 'ellie', role: 'admin'})
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your pw');
userStorage.logginUser(
    id, 
    pw, 
    // id, pw가 맞다면 아래의 익명함수가 호출됨 (onSuccess(id))
    function(user) {
        userStorage.getRoles(
            user, 
            // user = id이므로, id가 일치한다면 함수에 구조체가 들어옴
            function(userWithRole) {
                alert(`hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            (error) => {
                console.log(error)
            }
        )
    },
    error => {
        console.log(error);
    }
    )