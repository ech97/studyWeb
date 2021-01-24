'use strict';


// Hell of Callback Function
class UserStorage {
    logginUser(id, pw){
        return new Promise((resolve, reject) => {
            setTimeout(()=>
            {
                if(
                    (id === 'ellie' && pw === 'dream') ||
                    (id === 'coder' && pw === 'academy')
                ){
                    resolve(id);
                }else{
                    reject(new Error('not found!'));
                }
            }, 2000);
        })
    }

    getRoles(user){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if (user === 'ellie'){
                    resolve({name: 'ellie', role: 'admin'});
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        })
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your pw');


userStorage.logginUser(id, pw)
    .then(user => {
        userStorage.getRoles(user)
            .then((userWithRole)=>{
                alert(`name: ${userWithRole.name}, role: ${userWithRole.role}`);
            })
            .catch(console.log);
    })
    .catch(console.log);


// 위에를 다 생략해서 작성한다면

userStorage.logginUser(id, pw)
    .then(userStorage.getRoles)
    .then(userWithRole => {
        alert(`name: ${userWithRole.name}, role: ${userWithRole.role}`);
    })
    .catch(console.log);