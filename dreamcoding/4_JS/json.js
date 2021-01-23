let json = JSON.stringify(["apple", "banana"]);
console.log(json);

const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () => {
        console.log(`${name}, can jump!`);
    },
};

console.clear();

json = JSON.stringify(rabbit, ['name']); // 함수는 데이터형식이 아니므로 안들어감. // Symbol과 같이 js에만 있는 특수한것도 안들어감

json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'ellie' : value;
});

const obj_js = JSON.parse(json);

console.log(rabbit.birthDate.getDate());
console.log(obj_js.birthDate);


const obj_js2 = JSON.parse(json, (key, value)=>{
    console.log(`key: ${key}, value: ${value}`);
    return value; 
});