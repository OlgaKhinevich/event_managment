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

    async function getSomeUser(email) {
        let sqlQuery = `SELECT * FROM users WHERE email="${email}"`;
        return await connection.execute(sqlQuery);
    }

});

http.listen(3000, ()=>{
    console.log("Server is working successful!");
});

init();
