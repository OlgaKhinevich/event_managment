const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mysql = require('mysql2/promise');

// настройка соединения
let connection;

async function init(){
    try {
        connection = await mysql.createConnection({
            database: 'events',
            host: "localhost",
            port: 3306,
            user: "root",
            password: "xnat2699ol",
            insecureAuth: true
        });
    }
    catch(err) {
        console.log(err);
    }   
}

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket){
    
    // добавление нового пользователя при регистрации
    socket.on("addUser", async(user)=>{
        try {
            const {email, surname, name, patronymic, password} = user;
            // Запрос к БД
            let sqlQuery = `INSERT INTO users VALUES("${email}", "${surname}","${name}", "${patronymic}", "${password}")`; 
            // Проверка на наличие такого пользователя в БД
            let isExist= (await getSomeUser(email))[0];
            if(isExist.length) throw new Error("Такой пользователь уже существует!");
            let result = await connection.execute(sqlQuery);
            if (result[0].warningStatus===0) {
                socket.emit("$addUser", true);
                return;
            }
            socket.emit("$addUser", false);
        }
        catch(err) {
            console.log(err);
        }
    });

    // добавление нового пользователя при регистрации
    socket.on("addEvent", async(event)=>{
        try {
            const {type, format, name, date, time, place, prep_date, /*step_name, person, step_date*/} = event;
            let sqlQuery1 = `INSERT INTO events VALUES("${type}", "${format}", "${name}", "${date}", "${time}", "${place}", "${prep_date}")`;
            /*let sqlQuery2 = `INSERT INTO steps VALUES("${step_name}", "${person}", "${step_date}")`;*/
            // Проверка на наличие такого пользователя в БД
            let isExist= (await getSomeEvent(name, date))[0];
            if(isExist.length) throw new Error("Такое мероприятие уже добавлено!");
            let result2 = '';
            if(!isExist.length) {
                result2 = await connection.execute(sqlQuery2);
            }
            let result1 = await connection.execute(sqlQuery1);
            if (result1[0].warningStatus===0 && result2[0].warningStatus===0) {
                socket.emit("$addEvent", true);
                return;
            }
            socket.emit("$addEvent", false);
        }
        catch(err) {
            console.log(err);
        }
    });

    // проверка на наличие пользователя в БД при входе
    socket.on("login", async(user)=>{
        try {
            const {email, password} = user;
            // Проверка на наличие пользователя в БД
            let isExist= (await getSomeUser(email))[0];
            if(isExist.length === 0) throw new Error("Такого пользователя нет в БД!");
            let currentUser = isExist[0];
            if(currentUser.password !== password) throw new Error("Неправильный пароль!");
            socket.emit("$login",  currentUser.email);      
        }
        catch(err) {
            console.log(err);
            socket.emit("$login", false);
        }
    });

    // получение информации о мероприятии
    socket.on("getEventInfo", async ()=>{
        try {
        let sqlQuery = `SELECT name, date, percent, open FROM events`;
        let [eventInfo] = await connection.execute(sqlQuery);
        socket.emit("$getEventInfo", eventInfo); 
        }
        catch(err){
          console.log(err);
          socket.emit("$getEventInfo", false);
        }
    });

    socket.on("getStepsInfo", async (eventData)=>{
        try {
            const {eventName, eventDate} = eventData; 
            let sqlQuery = `SELECT stepName, stepDate, eventName FROM steps WHERE eventName="${eventName}" AND eventDate="${eventDate}"`;
            console.log(sqlQuery);
            let [stepsInfo] = await connection.execute(sqlQuery);
            socket.emit("$getStepsInfo", stepsInfo); 
        }
        catch(err){
          console.log(err);
          socket.emit("$getStepsInfo", false);
        }
    });

    socket.on("changePercent", async(data)=>{
        try {
            const {percent, name} = data;
            console.log(data);
            let sqlQuery1 = `INSERT INTO events VALUES("${percent}") WHERE name="${name}"`;
            let result = await connection.execute(sqlQuery1);
            if (result[0].warningStatus===0) {
                socket.emit("$changePercent", true);
                return;
            }
            socket.emit("$changePercent", false);
        }
        catch(err) {
            console.log(err);
        }
    });

    // получение информации для графика мероприятий
    socket.on("getChartData", async ()=>{
        try {
        let sqlQuery = `SELECT name, date, percent, prepDate FROM events`;
        let [chartData] = await connection.execute(sqlQuery);
        socket.emit("$getChartData", chartData); 
        }
        catch(err){
          console.log(err);
          socket.emit("$getChartData", false);
        }
    });

    async function getSomeUser(email) {
        let sqlQuery = `SELECT * FROM users WHERE email="${email}"`;
        return await connection.execute(sqlQuery);
    }

    async function getSomeEvent(name, date) {
        let sqlQuery1 = `SELECT * FROM events WHERE name="${name}" AND date="${date}"`;
        return await connection.execute(sqlQuery1);
    }

});

http.listen(3000, ()=>{
    console.log("Server is working successful!");
});

init();
