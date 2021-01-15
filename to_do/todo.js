const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';  

let toDos = [];



function deleteToDo(event){
    // html에서 li지우는거 부터 시작
    // 클릭된 태그 반환
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    
    //filter ForEach와 유사. toDos에서 하나씩 꺼내서 실행하고 리턴이 True인 것만 return하여 새로운 array 제작
    const cleanToDos = toDos.filter(function filterFn(toDo){
        //toDos 배열에는 오브젝트들이 들어있고 거기엔 id가 있음
        //li.id는 지우려는 id번호 // 문자이기때문에, 숫자로 바꿔줘야함
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

    console.log(cleanToDos);
}


function saveToDos(){
    // toDos는 Object가 있는상황, 따라서 LS에 저장하기위해 toDos 사용. string으로 바꿔줌
    // JSON = JavaScript Object Notation. 오브젝트로 바꿔주는거
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "✔";
    delBtn.addEventListener("click", deleteToDo);



    const span = document.createElement("span");
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);



    const newId = toDos.length + 1;
    li.id = newId;
    const toDoObj  = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj) // 배열에 오브젝트 삽입, 텍스트와 아이디를 설정해주기
    saveToDos();
}


// 입력 받기
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    
    // 입력창 초기화
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // 저장된게 있다면
    if(loadedToDos !== null){
        // 오브젝트형태로 변환
        const parsedToDos = JSON.parse(loadedToDos);

        // LS에있는거 li에 띄우기
        // Array에있는 원소를 하나씩 꺼내와서 함수에 전달
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}



function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();