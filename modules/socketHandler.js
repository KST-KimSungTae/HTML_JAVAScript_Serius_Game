const { Server } = require('socket.io');

const socketHandler = (server) => {
    const io = new Server(server);

    let connectedClients = {}; // 각 난이도별 사용자 상태 관리

    let LeftgameData = {};
    let RightgameData = {};

    io.on("connection", (socket) => {
        const req = socket.request;
        const socket_id = socket.id;
        console.log("연결 되었습니다.");
        console.log("socket ID : ", socket.id);

        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`${socket.id}가 ${room} 방에 참여`);

            if (!LeftgameData[room]) {
                LeftgameData[room] = { level: null, questions: [], side: null, panelId: null };

            }
            if (!RightgameData[room]) {
                RightgameData[room] = { level: null, questions: [], side: null, panelId: null };
            }

            if (!connectedClients[room]) { // 처음 1명이 들어올 때
                connectedClients[room] = [];
                connectedClients[room].push({ socketId: socket.id, side: 'left' });
                socket.emit('assignSide', 'left');
                console.log(`${socket.id}가 ${room}의 왼쪽으로 할당됨.`);
            } else {
                if (connectedClients[room].length === 1) { // 같은 난이도에 두번째 참가자 참여
                    connectedClients[room].push({ socketId: socket.id, side: 'right' });
                    socket.emit('assignSide', 'right');
                    console.log(`${socket.id}가 ${room}의 오른쪽으로 할당됨.`);

                    io.emit('startCountdown');
                    //io.emit('gameReady', '두 명이 모였습니다. 게임을 시작합니다!');
                    //console.log('게임 시작');

                } else { // 2명이 모두 들어왔을 때
                    socket.emit('gameMemberFull', '인원이 초과되었습니다!');
                }
            }
        });

        // if (connectedClients.length < 2) {
        //     const side = connectedClients.length === 0 ? 'left' : 'right';
        //     connectedClients.push({ socketId: socket.id, side});
        //     socket.emit('assignSide', side);
        //     console.log(`${socket.id}가 ${side}로 할당됨.`);
        // } else {
        //     socket.emit('gameMemberFull', '인원이 초과됨.');
        // }



        socket.on('level', (data, room) => {
            if (connectedClients[room].length === 1) { // 두 명만 한다는 전제! -> 여러 명(2명 이상)이 한다면 코드를 바꿔야 함
                LeftgameData[room].level = data;
                console.log(LeftgameData[room].level);
            } else {
                RightgameData[room].level = data;
                console.log(RightgameData[room].level);
            }

        });

        socket.on('question', (data, room) => {
            if (connectedClients[room].length === 1) {
                LeftgameData[room].questions = [...data];
                console.log(LeftgameData[room].questions);

            } else {
                RightgameData[room].questions = [...data];
                console.log(RightgameData[room].questions);
            }

        });

        socket.on('side', (data, room) => {
            if (connectedClients[room].length === 1) {
                LeftgameData[room].side = data;
                console.log(LeftgameData[room].side);
            } else {
                RightgameData[room].side = data;
                console.log(RightgameData[room].side);
            }

        });

        socket.on('panel', (data, room) => {
            if (connectedClients[room].length === 1) {
                LeftgameData[room].panelId = data;
                console.log(LeftgameData[room].panelId);
            } else {
                RightgameData[room].panelId = data;
                console.log(RightgameData[room].panelId);
            }

        });

        //상대방의 타이머 불러오는 코드
        socket.on('timerUpdate', (data, room) => {
            socket.to(room).emit('timerUpdate', data);
            console.log(`${room}에서 타이머 업데이트 전달됨.`);
        });

        socket.on('GameData', (data, room) => {
            const roomClients = connectedClients[room];

            if (data === 'right') { // 두번째 참가자(오른쪽)에게 첫번째(왼쪽) 정보 전달
                const rightClient = roomClients.find(client => client.side === 'right');
                if (rightClient) {
                    io.to(rightClient.socketId).emit('MoveData', LeftgameData[room]);
                    console.log(`${room}에 있는 오른쪽(두번째 참가자)로 전달 완료!`);
                }
            } else if (data === 'left') { // 두번째(오른쪽) 정보를 첫번째(왼쪽)으로 전달
                const leftClient = roomClients.find(client => client.side === 'left');
                if (leftClient) {
                    io.to(leftClient.socketId).emit('MoveData', RightgameData[room]);
                    console.log(`${room}에 있는 왼쪽(첫번째 참가자)로 전달 완료!`);
                }
            }
        });

        // 버튼 클릭 이벤트 처리
        socket.on('buttonClicked', (data, room) => {
            console.log(data.userSide);
            socket.to(room).emit('buttonClicked', data);
            console.log(`${room}으로 보냈음`);
        });

        // 입력란 생성 이벤트 처리
        socket.on('inputCreated', (data, room) => {
            console.log(data.userSide);
            socket.to(room).emit('inputCreated', data);
            console.log(`${room}으로 보냈음`);
        });

        // 입력 제출 이벤트 처리
        socket.on('inputSubmitted', (data, room) => {
            console.log(data.userSide);
            socket.to(room).emit('inputSubmitted', data);
            console.log(`${room}으로 보냈음`);
        });

        // 정답 입력 이벤트 처리
        socket.on('correctEnglish', (data, room) => {
            console.log(data.userSide);
            socket.to(room).emit('correctEnglish', data);
            console.log(`${room}으로 보냈음`);
        });



        socket.on("disconnect", () => {
            console.log(socket.id, "클라이언트 연결 끊어짐.");
            for (let room in connectedClients) {
                const clinetIndex = connectedClients[room].findIndex(client => client.socketId === socket.id);
                if (clinetIndex !== -1) {
                    const side = connectedClients[room][clinetIndex].side;
                    connectedClients[room].splice(clinetIndex, 1);

                    // // 상대방에게 승리 알림
                    // const opponentSide = side === 'left' ? 'right' : 'left';
                    // const opponentClient = connectedClients[room].find(client => client.side === opponentSide);

                    // if (opponentClient) {
                    //     io.to(opponentClient.socketId).emit('playerLeft', { message: '상대방이 게임을 나갔습니다. 당신이 승리했습니다!' });
                    // }

                    if (side === 'left') LeftgameData[room] = null;
                    else RightgameData[room] = null;

                    if (connectedClients[room].length === 0) {
                        delete connectedClients[room]; // 방에 사람이 없으면 방 제거
                    }
                    socket.to(room).emit('playerLeft', { side }); //남은 사용자에게 알림

                }


            }

        });
    });
};

module.exports = socketHandler;
