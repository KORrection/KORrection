const questions = [
  {
    text: `'잇달았다'와 '잇따랐다'어떤 것이 맞는 말??`,
    answers: [
      { text: '화물칸을 객차 뒤에 잇달았다.', correct: true },
      { text: '화물칸을 객차 뒤에 잇따랐다.', correct: false },
    ],
    Commentary: `'잇달다'가 타동사로 쓰이는 일이 있는데 이때에는 '잇따르다'로 바꿔 쓸 수 없습니다. '잇달았다'가 맞는 말입니다.`,
  },
  {
    text: `왠만하면? 웬만하면? 무엇이 맞을까요?`,
    answers: [
      { text: '왠만하면?', correct: false },
      { text: '웬만하면', correct: true },
    ],
    Commentary: `‘왜’의 형태가 나타나는 단어는 ‘왠지’처럼 까닭을 나타내는 단어 ‘왜’와 의미적으로 관련이 있습니다. 반면에 ‘웬만하다’처럼 단어 ‘왜’와 의미적으로 관련이 없는 경우에는 대부분 ‘웬’으로 표기합니다.`,
  },
];

export { questions };

/**
 * @swagger
 * tags:
 *  name: Quiz
 *  description: Quiz data
 * definitions:
 *  Quiz: 
 *      type: object
 *      properties:
 *          text:
 *              type: string
 *              description: 퀴즈 질문 텍스트
 *          answer:
 *              type: array
 *              items: 
 *                  type: object
 *                  properties:
 *                      correct:
 *                          type: boolean
 *                          description: 선택지 텍스트의 정답 여부
 *                      text:
 *                          type: string
 *                          description: 선택지 텍스트
 *          
 */