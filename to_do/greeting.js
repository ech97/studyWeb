const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting")

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    // 키 & 밸류
    localStorage.setItem(USER_LS, text);
    //localStorage.getItem("nico")
}


function handleSubmit(event){
    // 기본적으로 input 이벤트가 발생하면 새로고침됨. 그걸 방지
    event.preventDefault();

    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);

}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);        
}


function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);

    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else{
        // 가져온 정보가 있다면, 이름에 색칠
        paintGreeting(currentUser);    
    }
}




function init(){
    loadName();
}
init();

// 로컬저장소 이용. 딕셔너리와 유사함