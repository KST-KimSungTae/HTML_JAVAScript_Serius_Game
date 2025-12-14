const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketHandler = require('./modules/socketHandler');

const db = require('./database/db');    //db 라우트 추가
const authRoutes = require('./routes/auth'); // auth 라우트 추가
const registerRoutes = require('./routes/register'); // register 라우트 추가
const utilRoutes = require('./routes/util'); // util 라우트 추가

const app = express();
const port = 20180;
const host ='0.0.0.0';

require('dotenv').config();


app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 본문을 파싱

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

//
app.use(express.static(path.join(__dirname, 'public')));

// 홈페이지로 이동
app.get('/', (req, res) => {
    if (req.session.token) {
        return res.redirect('/homepage');
    }
    else{
        return res.redirect('/homepage');
    }
});

// auth 라우트 사용
app.use(authRoutes);

// register 라우트 사용
app.use(registerRoutes);

//홈페이지로 이동
app.get('/homepage', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

// util 라우트 사용
app.use(utilRoutes);



app.get('/difficulty', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'difficulty.html'));
    }
    else{
        return res.redirect('/homepage');
    }
});

app.get('/waiting', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'waiting.html'));
    }
    else{
        return res.redirect('/homepage');
    }
});

app.get('/game', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'game.html'));
    }
    else{
        return res.redirect('/homepage');
    }
});

app.get('/ranking', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'ranking.html'));
    }
    else{
        return res.redirect('/homepage');
    }
});

app.get('/rule', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'rule.html'));
});

app.get('/result', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'result.html'));
    }
    else{
        return res.redirect('/homepage');
    }
});

const server = http.createServer(app);
socketHandler(server);


server.listen(port, host, () => {
  console.log(`서버 연결 완료`);
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // views 폴더 경로 설정

app.get('/matching', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'matching.html'));
    }
    else {
        return res.redirect('/homepage');
    }
});

const rooms = [];

// 방 만들기 페이지 라우팅
app.get('/makingRooms', (req, res) => {
    if (req.session.token) {
        res.sendFile(path.join(__dirname, 'views', 'makingRooms.html'));
    } else {
        return res.redirect('/homepage');
    }
});


app.get('/createRoom', (req, res) => {
    const roomName = req.query.roomName;
    const difficulty = req.query.difficulty;

    // 기존 방 목록을 세션에서 가져오거나 빈 배열로 초기화
    req.session.rooms = req.session.rooms || [];

    // 새로운 방을 세션에 추가
    req.session.rooms.push({ roomName: roomName, difficulty: difficulty });

    // joinRooms 화면으로 리디렉션
    res.redirect('/joinRooms');
});

// 방 목록 페이지 라우팅
app.get('/joinRooms', (req, res) => {
    if (req.session.token) {
        // 세션에서 방 목록 가져오기
        const rooms = req.session.rooms || [];
        res.render('joinRooms', { rooms });
    } else {
        return res.redirect('/homepage');
    }
});
