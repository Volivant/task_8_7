const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
answerField.innerText = `Задайте минимальное число для игры`;

let minValue = 0;
let maxValue = 100;

document.getElementById('inputMinValue').value = 0;

//Задание минимума
document.getElementById('btnSetMin').addEventListener('click', function () {
    minValue = parseInt(document.getElementById('inputMinValue').value);
    minValue = minValue || 0; // проверка допустимого значения
    minValue = (minValue < -999 ? -999 : minValue); //проверка нижней границы
    answerField.innerText = `Задайте максимальное число для игры`;
    document.getElementById('formMinValue').className = 'collapse';
    document.getElementById('formMaxValue').className = 'collapse show';
})


document.getElementById('inputMaxValue').value = 100;

//Задание максимума
document.getElementById('btnSetMax').addEventListener('click', function () {
    maxValue = parseInt(document.getElementById('inputMaxValue').value);
    maxValue == 0 ? maxValue = 0 : (maxValue = maxValue || 100); // проверка допустимого значения
    maxValue = maxValue > 999 ? 999 : maxValue; //проверка верхней границы
    answerField.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
    document.getElementById('formMaxValue').className = 'collapse';
    document.getElementById('imReady').className = 'collapse show';
})


let answerNumber;
let answerString;
let orderNumber = 1; //первое приближение
let gameRun = true; //игра начата

//Начало игры
document.getElementById('btnReady').addEventListener('click', function () {
    answerNumber  = Math.floor((minValue + maxValue) / 2); // определение середины
    orderNumberField.innerText = orderNumber;
    answerString = numberToWord(answerNumber).length < 20 ? numberToWord(answerNumber) : String(answerNumber);
    answerField.innerText = `Вы загадали число ` + answerString + `?`;
    document.getElementById('imReady').className = 'collapse';
    document.getElementById('btnPanel').className = 'collapse show';
})

//Играть сначала
document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Задайте минимальное число для игры`;
    document.getElementById('btnPanel').className = 'collapse';
    document.getElementById('formMinValue').className = 'collapse show';
    answerNumber  = Math.floor((minValue + maxValue) / 2); // определение середины
    orderNumber = 1; //первое приближение
    gameRun = true; //игра начата
})

let phraseRandom = Math.round(Math.random()*2);

//Обработка ответа больше
document.getElementById('btnOver').addEventListener('click', function () {
    console.log(numberToWord(answerNumber));
    phraseRandom = Math.round(Math.random()*2);
    if (gameRun){
        if (minValue === maxValue){
            let answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
            switch(phraseRandom) {
                case 0:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                    break;
                case 1:
                    answerPhrase = `Может еще раз?\n\u{1F632}`;
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerString = numberToWord(answerNumber).length < 20 ? numberToWord(answerNumber) : String(answerNumber);
            switch(phraseRandom) {
                case 0:
                    answerField.innerText = `Я точно знаю - это ` + answerString + `!`;;
                    break;
                case 1:
                    answerField.innerText = `Пусть будет ` + answerString + `.`;;
                    break;
                default:
                    answerField.innerText = `Вы загадали число ` + answerString + `?`;
            }
            
        }
    }
})

//Обработка ответа меньше
document.getElementById('btnLess').addEventListener('click', function () {
    phraseRandom = Math.round(Math.random()*2);
    if (gameRun){
        if (minValue === maxValue){
            let answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
            switch(phraseRandom) {
                case 0:
                    answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                    break;
                case 1:
                    answerPhrase = `Может еще раз?\n\u{1F632}`;
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerString = numberToWord(answerNumber).length < 20 ? numberToWord(answerNumber) : String(answerNumber);
            switch(phraseRandom) {
                case 0:
                    answerField.innerText = `Я точно знаю - это ` + answerString + `!`;;
                    break;
                case 1:
                    answerField.innerText = `Пусть будет ` + answerString + `.`;;
                    break;
                default:
                    answerField.innerText = `Вы загадали число ` + answerString + `?`;
            }
            
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    phraseRandom = Math.round(Math.random()*2);
    if (gameRun){
        switch(phraseRandom) {
            case 0:
                answerField.innerText = `В точку!\n\u{1F973}`;;
                break;
            case 1:
                answerField.innerText = `Я знал! Я знал!\n\u{1F913}`;;
                break;
            default:
                answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        }
        gameRun = false;
    }
})

// функция число прописью
function numberToWord(number){
    let elemWord =[
        ['','один','два','три','четыре','пять','шесть','семь','восемь','девять'],
        ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'],
        ['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'],
        ['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот']
    ];
    let numberString = String(number);
    let signNumber = '';
    if (number < 0) {
        signNumber = 'минус ';
        numberString = numberString.substring(1);//извлекаем подстроку без минуса (со второго символа до конца)
    }

    if (numberString.length>3) {
        return ''; // не работаем с числами больше трех знаков
    } else if (number == 0) {
        return 'ноль';
    } else {
        numberString=numberString.padStart(3, "0"); // добавляем в начало 0, пока длина не будет равна 3
        return signNumber + elemWord[3][numberString[0]] + 
            (numberString[1] == 1 ?  
                elemWord[1][numberString[2]] + ' ' : 
                (elemWord[2][numberString[1]] + ' ' + elemWord[0][numberString[2]]));
    } 
}
//--------------------------------------------------------------------------------------