const weather = document.querySelector(".js-weather");


const API_KEY = "63e31fa528666722da7d91037085a9bf";
const COORDS = 'coords';

function getWeather(lat, lon){
    //데이터 가져오기 (날짜, 위치 등 가져옴)
    //또한, 데이터가 다 가져와지고 실행해야하니 then 사용
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            // 받은 데이터 중, json 형식만 리턴
            return response.json();
        })
        .then(function(json){
            // json이 로딩됐을때 실행되게 또 then 사용
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        })
}

function saveCoords(coordsObj){
    // LS에 저장하기위해, obj는 string으로 변환해서!
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
        // 걍
        // latitude
        // longitude 이런식으로만 써도됨(요소와 변수명 일치하는경운)
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cantaccess Geo location");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        // getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();