// routes/auth.js
const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/db'); // DB 연결 파일 가져오기
const loginManager = require('./loginManger');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// 로그인 페이지 라우트
router.get('/login', (req, res) => {
    if (req.session.token) {
        return res.redirect('/homepage');
    } else {
        res.sendFile(path.join(__dirname, '../views', 'login.html'));
    }
});



// 로그인 처리
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // DB에서 ID로 사용자 조회
    db.query('SELECT * FROM users WHERE id = ?', [username], (err, results) => {
        if (err) {
            console.error('DB 조회 오류:', err);
            return res.status(500).send('서버 오류: DB 조회 실패');
        }

        if (results.length === 0) {
            console.error('사용자가 존재하지 않습니다.');
            return res.status(400).send('사용자가 존재하지 않습니다.');
        }

        const user = results[0];

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            console.error('비밀번호가 일치하지 않습니다.');
            return res.status(400).send('비밀번호가 일치하지 않습니다.');
        }

       

        if (loginManager.hasUser(user.id)) {
            return res.status(400).send('이미 로그인된 사용자입니다.');
        }

        loginManager.addUser(user.id); // 로그인 상태 저장
        console.log('DB에서 찾은 사용자:', user);
        
        // JWT 토큰 생성 후 응답
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        req.session.token = token;
        req.session.userId = user.id; // 세션에 사용자 ID 저장
        res.json({ token, redirectUrl: '/homepage' });
    });
});

// 로그인 여부 확인 라우트
router.get('/is-logged-in', (req, res) => {
    if (req.session.token) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
