const mysql = require('mysql2');

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: 'localhost',    // MySQL 서버 호스트
        user: 'root',         // MySQL 사용자
        password: 'qwer',     // MySQL 비밀번호
        database: 'ex'        // 사용할 데이터베이스
    });

    db.connect((err) => {
        if (err) {
            console.error('MySQL 연결 오류:', err);
            setTimeout(handleDisconnect, 2000); // 2초 후 재시도
        } else {
            console.log('MySQL에 연결되었습니다.');
        }
    });

    db.on('error', (err) => {
        console.error('MySQL 연결 중 에러 발생:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('연결이 끊어져 재연결을 시도합니다.');
            handleDisconnect(); // 연결 끊김 시 재연결
        } else {
            throw err; // 다른 에러는 그대로 throw
        }
    });
}

handleDisconnect();

module.exports = db;
