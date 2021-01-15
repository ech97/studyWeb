// 이런식으로 두개의 변수를 한번에 선언 가능
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".js-title");

// 시간 알려줌 하지만. 이렇게 변수에 넣으면 시간이 고정됨!
/*const date = new Date()
date.getDate();
date.getDay;
date.getTime;
console.log(date);
*/

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    /*
    if(seconds < 10){
        seconds = seconds + "0";
    }
    */
   
    // 삼항 연산자
    clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
    }`;
}

function init() {
    // getTime함수를 1초에 한번 실행
    setInterval(getTime, 1000);

}

init();