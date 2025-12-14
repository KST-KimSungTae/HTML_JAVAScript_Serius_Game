// routes/register.js
const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/db'); // DB 연결 파일 가져오기

// 회원가입 페이지 라우트
router.get('/register', (req, res) => {
    if (req.session.token) {
        return res.redirect('/homepage');
    } else {
        res.sendFile(path.join(__dirname, '../views', 'register.html'));
    }
});

// 회원가입 처리
router.post('/register', async (req, res) => {
    const { id, password1, password2 } = req.body;

    if (password1 !== password2) {
        return res.status(400).send('비밀번호가 일치하지 않습니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password1, 10);

    // 사용자 정보를 DB에 저장
    db.query('INSERT INTO users (id, password) VALUES (?, ?)', [id, hashedPassword], (err, result) => {
        if (err) {
            console.error('DB 삽입 오류:', err); // 에러 로그 추가
            return res.status(500).send('회원가입 중 오류가 발생했습니다.');
        }

        res.redirect('/login');
    });
});

module.exports = router;
