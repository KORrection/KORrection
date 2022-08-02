# KORrection - 맞춤법 교정 서비스

## 프로젝트 실행

- clone repository

```bash
git clone https://github.com/KORrection/KORrection.git
```

**백엔드 실행**
- install package & add `.env` file

```bash
cd back
npm install
```

- start

```bash
npm start
```

**프론트엔드 실행**
- install package

```bash
cd ../front
npm install
```

- start

```bash
npm start
```

## 기술 스택

- 💻 Frontend

  `TypeScript` `React` `SCSS` `Recoil`

- 💾 Backend

  `JavaScript` `Node.js` `mongoDB` `mongoose`

- 🤖 AI

  `Python` `T5(Hugging Face: digit82/kolang-t5-base)` `PyTorch` `Flask`

## 프로젝트 구조도

<img src='https://user-images.githubusercontent.com/76952602/179302831-47991ea1-c266-42a0-a80d-2bc2b711e8ef.png' height='300px' />

### 팀원 소개 및 역할

| 이름 | 역할 |
| --- | --- |
| 김민지 | Data preprocessing, AI modeling |
| 김영곤 | Data preprocessing, AI modeling, Ai model serving, Quiz API |
| 노서현 | 프론트엔드(전범위) |
| 박건태 | 백엔드(Login, User API, gec-flask API), 배포 |
| 심은지 | 백엔드(Post API, Comment API, Vote API, User-board API, gecClient API), Notion 구축 |

## 서비스 소개

### 문제 정의 및 서비스 필요성

- **문제**: 철자 오류 및 띄어쓰기에 비해 문법적 요소의 수정이 제한적
- **해결책**: 한국어 문법 요소를 수정해주는 기능 개발
- **필요성**

  1. 한류 열풍
  2. 외국인 유학생 증가
  3. 한국어 학습자 증가

### 타겟 유저

- 한국어 학습에 관심있는 외국인
- 한국어 문법 수정을 원하는 한국인

## 메인 기능

![gec](https://user-images.githubusercontent.com/76952602/179305001-8e5461f0-04a6-4640-837b-9cab39272500.gif)

- AI 기반 한국어 문법 검사 서비스
- 사용자가 교정받고 싶은 한국어 문장(500자 제한)을 문법검사기 Input으로 입력
- T5 GEC(Grammer Error Correction) AI model 분석을 통하여 상위 3개의 정문장을 제시
- 사용자가 적합한 문장으로 자유롭게 선택하여 교정이 가능
- 폴링 방식으로 구현하여 장문의 경우 AI model 분석이 완료될 시점까지 다른 커뮤니티 서비스 이용 가능

## 서브 기능

### 게시판

![board](https://user-images.githubusercontent.com/76952602/179305061-36ce706f-b686-4860-8693-cfa921f4fa7a.gif)

- 게시판 성격에 따라 한국어 질문 게시판/자유 게시판으로 분리
- 한국어 질문 게시판의 경우 모르는 한국어에 관한 내용을 댓글로 원어민(한국인)이 직접 답변

  한국어가 미숙한 외국인의 경우 문법검사기 결과에 대한 추가적인 설명 및 답변 진행 가능
    
- 게시판 글 작성/수정/삭제 기능
- 댓글 작성/수정/삭제 기능
- 좋아요 기능
- 마이페이지 내 게시글/댓글/좋아요 목록 모아보기

### 퀴즈

![quiz](https://user-images.githubusercontent.com/76952602/179304740-52552f8e-3581-4cd5-9c6b-bd99888e83dd.gif)

- 맞춤법 퀴즈 기능
- 정답에 대한 해설 제공

## AI model

- Model: T5(GEC SOTA)
  - Framework: Pytorch
  - Server: Flask
  - GEC: Grammer Error Correction
  - SOTA: State Of the Art(가장 성능이 좋은 모델)

  ![image](https://user-images.githubusercontent.com/76952602/179301884-ae2dbefa-0858-474f-aeaf-a9d63a606d62.png)

- Dataset
  - KorNLI + 국립국어원 문법성 판단 말뭉치 v1.1 + Data Augmentation(Noise Generation)
  - 총 오문장(input)/정문장(output) 1,631,129 pair(Train 1,549,572 pair /  Test 81,557 pair)
    
  ![image](https://user-images.githubusercontent.com/76952602/179302106-33aa1781-8777-44c4-845f-ff8b879be92a.png)

- Data Augmentation
  - T5 63만 pair → 103만 pair → 163만 pair
    
  ![image](https://user-images.githubusercontent.com/76952602/179302170-05d8ff72-2ee3-47b4-9855-24685a758ff7.png)

- Hyperparameter
    
  batch_size = 16,    
  learning_rate=2e-5,
  num_train_epochs=4,
  weight_decay=0.01,
  num_beams=4,
  max_length=128,
  predict_with_generate=True,
  gradient_accumulation_steps = 6
    
- Evaluation

  ![image](https://user-images.githubusercontent.com/76952602/179302375-00cd8649-29e5-46c7-b607-09bbaa2dbae4.png)
