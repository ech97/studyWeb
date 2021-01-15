const body = document.querySelector("body");

const IMG_NUMBER = 5;

function handleImgLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber){
    
    // 객체생성
    const image = new Image();
    image.src = `imgs/${imgNumber + 1}.jpeg`
    image.classList.add("bgImage");
    
    body.appendChild(image);

    // API를 이용할때만!
    image.addEventListener("loadend", handleImgLoad);
}


function genRandom() {
    // 0~5 random값을 올림으로 저장
    const number = Math.floor(Math.random() * IMG_NUMBER);
    
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();