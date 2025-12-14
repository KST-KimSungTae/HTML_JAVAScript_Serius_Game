let currentQuestion = {
    leftPanelIndex: 0,
    rightPanelIndex: 0
};
let score = 0;
let selectedDifficulty; // 선택된 난이도
let questions = [];

// 초기 점수 설정
let LeftPlayerScore = 0;
let RightPlayerScore = 0;

// 각 난이도별 질문 설정
const easyQuestions = [
    { image: 'images/easy/easy1.jpg', koreanWords: ['사과', '포도', '바나나', '수박'], correct: '사과', english: 'apple' },
    { image: 'images/easy/easy2.jpg', koreanWords: ['풍선', '연필', '지우개', '종이'], correct: '풍선', english: 'balloon' },
    { image: 'images/easy/easy3.jpg', koreanWords: ['책', '연필', '지우개', '종이'], correct: '책', english: 'book' },
    { image: 'images/easy/easy4.jpg', koreanWords: ['포도', '딸기', '파인애플', '바나나'], correct: '바나나', english: 'banana' },
    { image: 'images/easy/sleep.jpg', koreanWords: ['먹다', '마시다', '잠을 자다', '일어나다'], correct: '잠을 자다', english: 'sleep' },
    { image: 'images/easy/tree.jpg', koreanWords: ['풀', '꽃', '나무', '벌레'], correct: '나무', english: 'tree' },
    { image: 'images/easy/flower.jpg', koreanWords: ['잎', '꽃', '이슬', '개미'], correct: '꽃', english: 'flower' },
    { image: 'images/easy/eye.jpg', koreanWords: ['눈', '코', '입', '귀'], correct: '눈', english: 'eye' },
    { image: 'images/easy/train.jpg', koreanWords: ['자동차', '비행기', '기차', '자전거'], correct: '기차', english: 'train' },
    { image: 'images/easy/sun.jpg', koreanWords: ['태양', '화성', '인공위성', '달'], correct: '태양', english: 'sun' },
    { image: 'images/easy/icecream.jpg', koreanWords: ['커피', '아이스크림', '케이크', '음료수'], correct: '아이스크림', english: 'icecream' },
    { image: 'images/easy/piano.jpg', koreanWords: ['피아노', '기타', '드럼', '바이올린'], correct: '피아노', english: 'piano' },
    { image: 'images/easy/ball.jpg', koreanWords: ['라켓', '탁구채', '공', '골대'], correct: '공', english: 'ball' },
    { image: 'images/easy/jump.jpg', koreanWords: ['눕기', '스트레칭', '점프', '달리기'], correct: '점프', english: 'jump' },
    { image: 'images/easy/nose.jpg', koreanWords: ['눈', '코', '입', '귀'], correct: '코', english: 'nose' },
];

const mediumQuestions = [
    { image: 'images/medium/elephant.jpg', koreanWords: ['치타', '코끼리', '사자', '하마'], correct: '코끼리', english: 'elephant' },
    { image: 'images/medium/wash hands.jpg', koreanWords: ['양치하다', '목욕하다', '손을 씻다', '세수하다'], correct: '손을 씻다', english: 'wash hands' },
    { image: 'images/medium/glove.jpg', koreanWords: ['장갑', '목도리', '구체', '종이'], correct: '장갑', english: 'glove' },
    { image: 'images/medium/walk.jpg', koreanWords: ['버리다', '먹다', '달리다', '걷다'], correct: '걷다', english: 'walk' },
    { image: 'images/medium/stair.jpg', koreanWords: ['계단', '연필', '지우개', '종이'], correct: '계단', english: 'stair' },
    { image: 'images/medium/space.jpg', koreanWords: ['행성', '별', '우주', '구름'], correct: '우주', english: 'space' },
    { image: 'images/medium/butterfly.jpg', koreanWords: ['나비', '벌', '애벌레', '메뚜기'], correct: '나비', english: 'butterfly' },
    { image: 'images/medium/study.jpg', koreanWords: ['소리 지르다', '춤 추다', '노래 부르다', '공부하다'], correct: '공부하다', english: 'study' },
    { image: 'images/medium/clock.jpg', koreanWords: ['시계', '책상', '필통', '시간'], correct: '시계', english: 'clock' },
    { image: 'images/medium/zebra.jpg', koreanWords: ['노새', '말', '얼룩말', '당나귀'], correct: '얼룩말', english: 'zebra' },
    { image: 'images/medium/sing.jpg', koreanWords: ['노래 부르다', '춤 추다', '연설하다', '질문하다'], correct: '노래 부르다', english: 'sing' },
    { image: 'images/medium/cut.jpg', koreanWords: ['쓰다', '읽다', '붙이다', '자르다'], correct: '자르다', english: 'cut' },
    { image: 'images/medium/mountain.jpg', koreanWords: ['산', '계곡', '숲', '바다'], correct: '산', english: 'mountain' },
    { image: 'images/medium/nurse.jpg', koreanWords: ['상담사', '간호사', '변호사', '선생님'], correct: '간호사', english: 'nurse' },
    { image: 'images/medium/swim.jpg', koreanWords: ['수영하다', '운동하다', '달리다', '읽다'], correct: '수영하다', english: 'swim' },
];

const hardQuestions = [
    { image: 'images/hard/giraffe.jpg', koreanWords: ['기린', '하마', '호랑이', '토끼'], correct: '기린', english: 'giraffe' },
    { image: 'images/hard/refrigerator.jpg', koreanWords: ['서랍', '장식장', '냉장고', '에어컨'], correct: '냉장고', english: 'refrigerator' },
    { image: 'images/hard/whale.jpg', koreanWords: ['고래', '상어', '물고기', '불가사리'], correct: '고래', english: 'whale' },
    { image: 'images/hard/footprint.jpg', koreanWords: ['신호등', '손수건', '입김', '발자국'], correct: '발자국', english: 'footprint' },

    { image: 'images/hard/snowman.jpg', koreanWords: ['붕어빵', '눈사람', '목도리', '비둘기'], correct: '눈사람', english: 'snowman' },
    { image: 'images/hard/halloween.jpg', koreanWords: ['설날', '추석', '크리스마스', '할로윈'], correct: '할로윈', english: 'halloween' },
    { image: 'images/hard/christmas.jpg', koreanWords: ['크리스마스', '할로윈', '단오', '추석'], correct: '크리스마스', english: 'christmas' },
    { image: 'images/hard/pull.jpg', koreanWords: ['올리다', '던지다', '당기다', '밀다'], correct: '당기다', english: 'pull' },

    { image: 'images/hard/push.jpg', koreanWords: ['던지다', '당기다', '밀다', '때리다'], correct: '밀다', english: 'push' },
    { image: 'images/hard/mosquito.jpg', koreanWords: ['애벌레', '파리', '모기', '무당벌레'], correct: '모기', english: 'mosquito' },
    { image: 'images/hard/eyebrow.jpg', koreanWords: ['눈썹', '속눈썹', '눈알', '동공'], correct: '눈썹', english: 'eyebrow' },
    { image: 'images/hard/notebook.jpg', koreanWords: ['공책', '노트북', '컴퓨터', '파일'], correct: '공책', english: 'notebook' },

    { image: 'images/hard/travel.jpg', koreanWords: ['케이크', '학교', '여행', '용기'], correct: '여행', english: 'travel' },
    { image: 'images/hard/china.jpg', koreanWords: ['한국', '중국', '일본', '베트남'], correct: '중국', english: 'china' },
    { image: 'images/hard/france.jpg', koreanWords: ['영국', '프랑스', '미국', '스페인'], correct: '프랑스', english: 'france' },
];

function setQuestions(difficulty) {
    if (difficulty === 'easy') {
        questions = easyQuestions;
    } else if (difficulty === 'medium') {
        questions = mediumQuestions;
    } else if (difficulty === 'hard') {
        questions = hardQuestions;
    }

    // 질문을 랜덤으로 섞기
    questions.sort(() => Math.random() - 0.5);
    // 처음 11개 질문 선택
    questions = questions.slice(0, 11);
}

function loadQuestion(panelId) {
    const isLeftPanel = panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;
    if (currentIndex < questions.length) {
        const question = questions[currentIndex];
        const ContainerId = userSide === 'left' ? 'left-game-container' : 'right-game-container';
        const gameContainer = document.getElementById(ContainerId);
        gameContainer.innerHTML = ` 
            <img src="${question.image}" alt="문제 그림">
            <div>
                ${question.koreanWords.map(word => `<button onclick="checkAnswer('${word}', '${panelId}')">${word}</button>`).join('')}
            </div>`
            ;
    } else {
        endGame();
    }
}

function loadQuestion2(questions, userSide, panelId) {

    if (!isGameReady) return; // 게임 준비 상태 확인

    const isLeftPanel = panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;
    if (currentIndex < questions.length) {
        const question = questions[currentIndex];
        const ContainerId = userSide === 'left' ? 'left-game-container' : 'right-game-container';
        const gameContainer = document.getElementById(ContainerId);
        /*gameContainer.innerHTML = `
            <img src="${question.image}" alt="문제 그림">
            <div>
                ${question.koreanWords.map(word => `<button onclick="checkAnswer('${word}', '${panelId}')">${word}</button>`).join('')}
            </div>`
        ;*/
        gameContainer.innerHTML = `
            <img src="${question.image}" alt="문제 그림">
            <div>
                ${question.koreanWords.map(word => {
            // 각 버튼에 대한 HTML을 생성
            let buttonHtml = `<button onclick="checkAnswer('${word}', '${panelId}')">${word}</button>`;

            // 상대 플레이어의 버튼을 비활성화
            if (userSide !== panelId) {
                buttonHtml = `<button disabled>${word}</button>`;  // 버튼 비활성화
            }

            return buttonHtml;
        }).join('')}
            </div>
        `;
    } else {
        endGame();
    }
}


function checkAnswer(selectedWord, panelId) {
    const isLeftPanel = panelId === 'left-panel';
    const question = questions[isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex];

    console.log(`Selected Word: ${selectedWord}, Correct: ${question.correct}`);

    const ContainerId = userSide === 'left' ? 'left-game-container' : 'right-game-container';
    const gameContainer = document.getElementById(ContainerId);
    const existingInput = gameContainer.querySelector('input'); // 이미 입력란이 있는지 확인

    socket.emit('buttonClicked', {
        userSide: userSide,
        questionIndex: isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex,
        selectedWord: selectedWord,
        panelId: panelId,
    }, selectedDifficulty);

    // 정답일 때
    if (selectedWord === question.correct) {

        //선택된 버튼 비활성화
        const buttons = gameContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = true; // 모든 버튼 비활성화
        });


        if (!existingInput) { // 입력란이 없는 경우에만 생성
            const answerContainer = document.createElement('div'); // 입력란과 힌트를 담을 컨테이너
            answerContainer.style.display = 'flex';
            answerContainer.style.flexDirection = 'column';
            answerContainer.style.alignItems = 'center';
            answerContainer.style.marginBottom = '10px'; // 컨테이너 위쪽 여백
            answerContainer.style.textAlign = 'center'; // 텍스트 중앙 정렬

            const answerInput = document.createElement('input');
            answerInput.placeholder = '   영어 단어를 입력하세요';
            answerInput.style.width = '200px'; // 입력란의 너비 조절
            answerInput.style.height = '40px'; // 입력란의 높이 조절
            answerInput.style.fontSize = '16px'; // 글자 크기 조절
            answerInput.style.marginTop = '10px'; // 위쪽 여백 추가
            answerInput.style.padding = '2px'; 
            answerInput.style.boxSizing = 'border-box'; // 패딩 포함하여 크기 고정

            // 글자 수를 표시하는 요소 추가
            const charCountDisplay = document.createElement('span');
            charCountDisplay.id = 'charCount';
            charCountDisplay.style.marginLeft = '10px'; // 간격 조절
            charCountDisplay.innerText = ` (길이: ${question.english.length})`; // 영어 단어의 길이 표시

            //  // 힌트 버튼 생성
            //  const hintButton = document.createElement('button');
            //  hintButton.textContent = '힌트 보기';
            //  hintButton.style.marginTop = '10px';
            //  hintButton.onclick = () => provideHint(question.english);

            // 힌트 이미지 생성
            const hintImage = document.createElement('img');
            hintImage.src = '../images/hint.png';
            hintImage.alt = '힌트';
            hintImage.style.cursor = 'pointer';
            hintImage.style.width = '40px'; // 이미지 크기 조절
            hintImage.style.height = 'auto';
            hintImage.style.marginTop = '15px';
            //hintImage.style.transition = 'box-shadow 0.3s ease'; // 부드러운 전환 효과
            hintImage.style.transition = 'filter 0.3s ease'; // 부드러운 전환 효과

            // 마우스를 올렸을 때 그림자 효과 추가
            hintImage.addEventListener('mouseenter', () => {
                //hintImage.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.3)';
                hintImage.style.filter = 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))';
            });

            // 마우스를 뗐을 때 그림자 효과 제거
            hintImage.addEventListener('mouseleave', () => {
                //hintImage.style.boxShadow = 'none';
                hintImage.style.filter = 'none';
            });

            // 힌트 버튼 활성화와 제한 로직을 위한 변수들
            let hintIndex = 0; // 현재 힌트의 알파벳 순서
            let hintCooldown = false; // 7초 간격 제한

            // 힌트를 제공하는 함수
            function provideHint(word) {
                if (hintCooldown) return; // 힌트 제한 시간 동안 클릭 불가
                hintCooldown = true;
                setTimeout(() => hintCooldown = false, 7000); // 7초 후에 힌트 버튼 재활성화

                if (hintIndex < word.length) {
                    // 힌트를 점차적으로 노출
                    hintIndex++;
                    alert(`힌트: ${word.slice(0, hintIndex)}`);
                } else {
                    alert('모든 힌트를 이미 다 보았습니다!');
                }
            }

            // 힌트 이미지 클릭 이벤트 추가
            hintImage.onclick = () => provideHint(question.english);


            // 입력란 생성 이벤트를 서버로 전송
            socket.emit('inputCreated', {
                userSide: userSide,
                questionIndex: isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex,
                panelId: panelId,
            }, selectedDifficulty);


            answerInput.onkeyup = (event) => {
                if (event.key === 'Enter')
                    checkEnglish(answerInput.value, panelId);

                // 입력 제출 이벤트를 서버로 전송
                socket.emit('inputSubmitted', {
                    userSide: userSide,
                    questionIndex: isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex,
                    inputValue: answerInput.value,
                    panelId: panelId,
                }, selectedDifficulty);

            };

            // 컨테이너에 입력란, 글자 수 표시, 힌트 이미지 추가
            answerContainer.appendChild(answerInput);
            answerContainer.appendChild(charCountDisplay);
            answerContainer.appendChild(hintImage);

            // 컨테이너를 게임 컨테이너에 추가
            gameContainer.appendChild(answerContainer);

        }
    } else {
        alert('오답입니다.');
    }
}

function checkEnglish(input, panelId) {
    const isLeftPanel = panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;
    const question = questions[currentIndex];
    if (input.toLowerCase() === question.english) {
        score += 10;

        // 정답 입력 이벤트를 서버로 전송
        socket.emit('correctEnglish', {
            userSide: userSide,
            questionIndex: isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex,
            questions: questions,
            panelId: panelId,
            //inputValue: input
        }, selectedDifficulty);

        console.log('어느쪽이냐?', panelId);

        if (isLeftPanel) {
            currentQuestion.leftPanelIndex++;
        } else {
            currentQuestion.rightPanelIndex++;
        };

        loadQuestion(panelId);
    } else {
        alert('오답입니다.');
    }
}

function endGame() {
    alert(score >= 60 ? 'WIN' : 'LOSE');
    ///
    // 게임에서 사용된 questions 배열을 로컬 저장소에 저장
    localStorage.setItem('reviewQuestions', JSON.stringify(questions));
    ///
    window.location.href = '/result'; // 결과 페이지로 이동
}

// 난이도 선택 후 설정
function startGame(difficulty, panelId) {
    //selectedDifficulty = difficulty; // 선택한 난이도 저장
    setQuestions(selectedDifficulty); // 질문 설정
    loadQuestion(panelId); // 첫 질문 로드
    socket.emit('question', questions, difficulty); // 순서가 랜덤화된 질문 리스트
    socket.emit('level', selectedDifficulty, difficulty); // 난이도 전달
    socket.emit('side', userSide, difficulty);
    socket.emit('panel', panelId, difficulty);
}


// 소켓 클라이언트 연결 설정
const socket = io();
let userSide = null;

let isGameReady = false; // 게임 준비 상태 플래그

// 본인 화면에 'ME' 표시하고 상대방 화면에 'OTHER PLAYER' 표시하기 위한 요소
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');


// 서버에 연결 확인
socket.on('connect', () => {
    console.log("접속함");
});

const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');
selectedDifficulty = difficulty;
// 난이도별 방 생성 요청
socket.emit('joinRoom', difficulty);

socket.on('assignSide', (side) => {
    userSide = side;
    console.log(`${side} panel 에 할당됨.`);

    //게임 요소 기본 숨기기
    hideGameElements();

    if (userSide === 'right') {
        leftPanel.style.display = 'none';
        rightPanel.style.display = 'block';

        const urlParams = new URLSearchParams(window.location.search);
        const difficulty = urlParams.get('difficulty'); // URL에서 난이도 가져오기
        const panelId2 = 'right-panel'; // 오른쪽 패널인 정보 전달 

        startGame(difficulty, panelId2);

        // 상대방 패널(left)에는 'OTHER PLAYER' 표시, 본인 패널(right)에는 'ME' 표시

        rightPanel.innerHTML = "<h2>ME</h2>" + rightPanel.innerHTML;


        socket.emit('GameData', 'right', difficulty);  // 상대방에게 게임 데이터를 요청, 여기서 userSide는 right

        //startTimerRight(); //오른쪽 타이머 시작


    } else if (userSide === 'left') {
        leftPanel.style.display = 'block';
        rightPanel.style.display = 'none';

        // 본인 패널(left)에 'ME' 표시, 상대방 패녈(right)에는 'OTHER PLAYER' 표시
        leftPanel.innerHTML = "<h2>ME</h2>" + leftPanel.innerHTML;


        // 난이도를 URL에서 가져와 게임 시작
        const urlParams = new URLSearchParams(window.location.search);
        const difficulty = urlParams.get('difficulty'); // URL에서 난이도 가져오기
        const panelId1 = 'left-panel'; // 왼쪽 패널인 것 전달

        //startTimerLeft(); // 왼쪽 타이머 시작
        startGame(difficulty, panelId1);
    }
});

socket.on('startCountdown', () => {
    isGameReady = true; // 게임 준비 상태 변경

    const countdownText = document.createElement('div');
    countdownText.id = 'countdown';
    countdownText.style.fontSize = '48px';
    countdownText.style.color = 'red';
    countdownText.style.textAlign = 'center';
    countdownText.innerText = '3';
    document.body.appendChild(countdownText);

    let count = 3;
    const interval = setInterval(() => {
        count--;
        if (count === 0) {
            countdownText.innerText = 'GAME START!!!';
            setTimeout(() => {
                document.body.removeChild(countdownText);
                showGameElements(); // 숨겨진 UI 표시
                startTimerLeft(); // 왼쪽 타이머 시작
                startTimerRight(); //오른쪽 타이머 시작
                socket.emit('GameData');
            }, 1000);
            clearInterval(interval);
        } else {
            countdownText.innerText = count;
        }
    }, 1000);

});


socket.on('MoveData', (data) => {

    if (!isGameReady) return; // 게임 준비 상태 확인

    console.log('MoveData 수신:', data);
    console.log(`난이도: ${selectedDifficulty}`);
    console.log('질문 리스트:', questions);


    if (userSide === 'right') {
        const urlParams = new URLSearchParams(window.location.search);
        const difficulty = urlParams.get('difficulty'); // URL에서 난이도 가져오기

        if (difficulty === data.level) { // 첫번째(왼쪽) 데이터 -> 두번째(오른쪾) 참가자
            console.log(data);
            console.log('질문 리스트:', questions);

            leftPanel.style.display = 'block';
            leftPanel.innerHTML = "<h2>OTHER PLAYER</h2>" + leftPanel.innerHTML;

            loadQuestion2(data.questions, data.side, data.panelId); // data.side는 왼쪽, data.panelId는 'left-panel' -> 두번째 참가자에서 첫번째 참가자 정보가 보임

            socket.emit('GameData', 'left', difficulty); // 오른쪽(두번째 참가자) 데이터를 왼쪽으로 옮기기 위한 요청
        }
    } else if (userSide === 'left') { // 두번째(오른쪽) 데이터 -> 첫번째(왼쪽)
        const urlParams = new URLSearchParams(window.location.search);
        const difficulty = urlParams.get('difficulty'); // URL에서 난이도 가져오기

        if (difficulty === data.level) {
            console.log(data);

            rightPanel.style.display = 'block';

            rightPanel.innerHTML = "<h2>OTHER PLAYER</h2>" + rightPanel.innerHTML;

            loadQuestion2(data.questions, data.side, data.panelId); //data.side는 오른쪽
        }
    }
});

socket.on('gameMemberFull', (msg) => {
    alert(msg);
});

// 게임 UI 요소 숨기기
function hideGameElements() {
    const buttons = document.querySelectorAll('.game-container');
    const timers = document.querySelectorAll('.timer'); // 'timer' 클래스 요소 선택

    buttons.forEach(button => {
        button.style.display = 'none'; // 버튼 숨기기
    });

    timers.forEach(timer => {
        timer.style.display = 'none'; // 타이머 숨기기
    });
}

// 게임 UI 요소 표시
function showGameElements() {
    const buttons = document.querySelectorAll('.game-container');
    const timers = document.querySelectorAll('.timer'); // 'timer' 클래스 요소 선택

    buttons.forEach(button => {
        button.style.display = 'inline-block'; // 버튼 표시
    });

    timers.forEach(timer => {
        timer.style.display = 'block'; // 타이머 표시
    });
}


// 다른 클라이언트의 버튼 클릭 이벤트 처리
socket.on('buttonClicked', (data) => {
    const isLeftPanel = data.panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;

    if (data.questionIndex === currentIndex) {
        const ContainerId = data.userSide === 'left' ? 'left-game-container' : 'right-game-container';
        const gameContainer = document.getElementById(ContainerId);
        const buttons = gameContainer.getElementsByTagName('button');

        for (let button of buttons) {

            if (button.textContent === data.selectedWord) {
                // 버튼을 강조 표시하거나 클릭된 상태로 변경
                button.style.backgroundColor = 'yellow'; // 예시 스타일
            }
        }
    }
});

// 다른 클라이언트의 입력란 생성 이벤트 처리
socket.on('inputCreated', (data) => {
    console.log('inputCreated 수신:', data);
    const isLeftPanel = data.panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;
    if (data.questionIndex === currentIndex) {
        const ContainerId = data.userSide === 'left' ? 'left-game-container' : 'right-game-container';
        const gameContainer = document.getElementById(ContainerId);
        const existingInput = gameContainer.querySelector('input');

        if (!existingInput) {
            const answerInput = document.createElement('input');
            answerInput.placeholder = '   영어 단어를 입력하세요';
            answerInput.style.width = '200px';
            answerInput.style.height = '30px';

            // 입력란을 읽기 전용으로 설정하여 입력 방지
            answerInput.disabled = true;

            gameContainer.appendChild(answerInput);
        }
    }
});

// 다른 클라이언트의 입력 제출 이벤트 처리
socket.on('inputSubmitted', (data) => {
    console.log('inputSubmitted 수신:', data);
    const isLeftPanel = data.panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;
    if (data.questionIndex === currentIndex) {
        const ContainerId = data.userSide === 'left' ? 'left-game-container' : 'right-game-container';
        const gameContainer = document.getElementById(ContainerId);
        const inputField = gameContainer.querySelector('input');

        if (inputField) {
            inputField.value = data.inputValue;
        }
    }
});

// 다른 클라이언트의 정답 입력 이벤트 처리
socket.on('correctEnglish', (data) => {
    console.log('correctEnglish 수신:', data);
    const isLeftPanel = data.panelId === 'left-panel';
    const currentIndex = isLeftPanel ? currentQuestion.leftPanelIndex : currentQuestion.rightPanelIndex;
    if (data.questionIndex === currentIndex) {
        const oppositeSide = data.userSide;

        if (isLeftPanel) {
            currentQuestion.leftPanelIndex++
        } else {
            currentQuestion.rightPanelIndex++;
        };

        loadQuestion2(data.questions, oppositeSide, data.panelId);
    }
});
let leftRemainingTime = 60; // 왼쪽 타이머 초기값
let rightRemainingTime = 60; // 오른쪽 타이머 초기값

let leftTimerInterval;
let rightTimerInterval;

// 타이머 업데이트 함수
function updateTimer(side, remainingTime) {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");

    if (side === 'left') {
        document.getElementById('timer-left').textContent = `${minutes}:${seconds}`;
    } else if (side === 'right') {
        document.getElementById('timer-right').textContent = `${minutes}:${seconds}`;
    }
}

// 왼쪽 패널 타이머 시작
function startTimerLeft() {
    leftTimerInterval = setInterval(() => {
        leftRemainingTime--;

        // 남은 시간 계산 후 업데이트
        updateTimer('left', leftRemainingTime);

        // 시간이 끝나면 타이머 정지
        if (leftRemainingTime <= 0) {
            clearInterval(leftTimerInterval);
            alert('왼쪽 타이머가 종료되었습니다!');
            endGame();
        }
    }, 1000);
}

// 오른쪽 패널 타이머 시작
function startTimerRight() {
    rightTimerInterval = setInterval(() => {
        rightRemainingTime--;

        // 남은 시간 계산 후 업데이트
        updateTimer('right', rightRemainingTime);

        // 시간이 끝나면 타이머 정지
        if (rightRemainingTime <= 0) {
            clearInterval(rightTimerInterval);
            alert('오른쪽 타이머가 종료되었습니다!');
            endGame();
        }
    }, 1000);
}

// 서버로부터 타이머 업데이트 받기
socket.on('timerUpdate', (data) => {
    if (data.userSide === 'left') {
        leftRemainingTime = data.remainingTime;
        updateTimer('left', leftRemainingTime);
    } else if (data.userSide === 'right') {
        rightRemainingTime = data.remainingTime;
        updateTimer('right', rightRemainingTime);
    }
});

// 서버로부터 메시지를 받는 로직
socket.on('gameMemberFull', (message) => {
    console.log(message); // 디버깅용 콘솔 출력
    const messageDiv = document.getElementById('memberFullMessage');
    messageDiv.style.display = 'block'; // 메시지를 화면에 표시

    // 'container' 요소 숨기기
    const containerDiv = document.getElementById('container');
    containerDiv.style.display = 'none';
});

// "난이도 선택 페이지로 돌아가기" 버튼 클릭 이벤트
document.getElementById('goBackButton').addEventListener('click', () => {
    window.location.href = '/difficulty.html'; // 난이도 선택 페이지로 이동
});

socket.on('playerLeft', (data) => {
    if (data.side === 'left') {
        leftPanel.style.display = 'none';
    } else {
        rightPanel.style.display = 'none';
    }
    endGameWithWin(); // 자동 승리 처리
});

// 자동 승리 처리 함수
function endGameWithWin() {
    alert('축하합니다! 승리했습니다!');
    localStorage.setItem('gameResult', JSON.stringify({ userSide: userSide, result: 'win' }));
    window.location.href = '/result'; // 결과 페이지로 이동 
     
}


