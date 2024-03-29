const questions = [
  {
    text: `'잇달았다'와 '잇따랐다' 어떤 것이 맞는 말일까요?`,
    answer: [
      { text: '화물칸을 객차 뒤에 잇달았다.', correct: true },
      { text: '화물칸을 객차 뒤에 잇따랐다.', correct: false },
    ],
    Commentary: `'잇달다'가 타동사로 쓰이는 일이 있는데 이때에는 '잇따르다'로 바꿔 쓸 수 없습니다. '잇달았다'가 맞는 말입니다.`,
  },
  {
    text: `왠만하면? 웬만하면? 무엇이 맞을까요?`,
    answer: [
      { text: '왠만하면', correct: false },
      { text: '웬만하면', correct: true },
    ],
    Commentary: `‘왜’의 형태가 나타나는 단어는 ‘왠지’처럼 까닭을 나타내는 단어 ‘왜’와 의미적으로 관련이 있습니다. 반면에 ‘웬만하다’처럼 단어 ‘왜’와 의미적으로 관련이 없는 경우에는 대부분 ‘웬’으로 표기합니다.`,
  },
  {
    text: `'나즈막히'와 '나지막이' 어떤 것이 맞는 말일까요?`,
    answer: [
      { text: '처마 밑에 나즈막히 앉아 웅크려 기다렸다.', correct: false },
      { text: '처마 밑에 나즈막히 앉아 나지막이 앉아 웅크려 기다렸다.', correct: true },
    ],
    Commentary: `'-이'와 '-히'에 관한 표기는 "부사의 끝음절이 분명히 [이]로만 나는 것은 '-이'로 적고, [히]로만 나거나 [이]나 [히]로 나는 것은 '-히'로 적는다."라고 규정되어 있습니다. 그래서 '나지막이'가 맞습니다.`,
  },
  {
    text: `'내로라하다'와 '내노라하다' 무엇이 맞을까요?`,
    answer: [
      { text: '그는 내로라하는 대기업을 다니고 있다.', correct: true },
      { text: '그는 내노라하는 대기업을 다니고 있다.', correct: false },
    ],
    Commentary: `'내노라하다'는 '내로라하다'의 잘못된 표기로 봅니다. 즉, '내로라하다'만 표준어로 봅니다. 참고로, ‘내로라하다’는 ‘나(我)+-이(계사)+-도(인칭법)-+-라(종결어미)+하-(爲)+다(어미)’로 분석됩니다.`,
  },
  {
    text: `'너댓-'와 '네댓-' 어떤 것이 맞는 말일까요?`,
    answer: [
      { text: '누구나 나이 너댓 살씩은 젊어지는 법인 모양이었다.', correct: false },
      { text: '누구나 나이 네댓 살씩은 젊어지는 법인 모양이었다.', correct: true },
    ],
    Commentary: `'너댓'은 수 관형사 '네댓'의 잘못입니다. '네댓'은 '네다섯'의 뜻입니다.`,
  },
  {
    text: `'어깨 넓이'와 '어깨너비' 무엇이 맞을까요?`,
    answer: [
      { text: '어깨 넓이를 측정할 땐 앞이 아닌 뒤로 측정한다.', correct: false },
      { text: '어깨너비를 측정할 땐 앞이 아닌 뒤로 측정한다.', correct: true },
    ],
    Commentary: `'넓이'는 면적의 단위로 사용하는 용어인 반면에 '너비'는 길이의 단위로 사용하는 용어입니다. 따라서 '어깨너비'가 옳은 표현입니다.`,
  },
  {
    text: `'널부러져'와 '널브러져' 어떤 것이 맞는 말일까요?`,
    answer: [
      { text: '소대원들은 땅바닥에 아무렇게나 널브러져 앉아 있었다.', correct: true },
      { text: '소대원들은 땅바닥에 아무렇게나 널부러져 앉아 있었다.', correct: false },
    ],
    Commentary: `'널부러지다'는 '널브러지다'의 잘못입니다. '널브러지다'는  ‘너저분하게 흐트러지거나 흩어지다’ 또는 ‘몸에 힘이 빠져 몸을 추스르지 못하고 축 늘어지다’라는 뜻이 있습니다.`,
  },
  {
    text: `'넓다랗다'와 '널따랗다' 무엇이 맞을까요?`,
    answer: [
      { text: '방이 매우 넓따랗다.', correct: false },
      { text: '방이 매우 널따랗다.', correct: true },
    ],
    Commentary: `‘꽤 넓다’의 의미로 쓰이는 단어는 ‘널따랗다’가 바릅니다. 용언의 어간 뒤에 자음으로 시작된 접미사가 붙는 경우, 그 원형을 밝히어 적음을 원칙으로 하나, 겹받침의 끝소리가 드러나지 않는 것은 소리 나는 대로 적습니다.`,
  },
  {
    text: `'놈팽이'와 '놈팡이' 어떤 것이 맞는 말일까요?`,
    answer: [
      { text: '그는 하는 일 없이 놈팽이처럼 빈둥거리며 돌아다녔다.', correct: false },
      { text: '그는 하는 일 없이 놈팡이처럼 빈둥거리며 돌아다녔다.', correct: true },
    ],
    Commentary: `'놈팽이'의 규범 표기는 '놈팡이'입니다.'놈팡이'라는 말은 지방에 따라 <논패이/논페이/놈팡이/놈팽이/놈패이/놈페이>라 하고 있습니다.`,
  },
  {
    text: `'누누히'와 '누누이' 무엇이 맞을까요?`,
    answer: [
      { text: '누누히 당부하다.', correct: false },
      { text: '누누이 당부하다.', correct: true },
    ],
    Commentary: `'-이'와 '-히'에 관한 표기는 "부사의 끝음절이 분명히 [이]로만 나는 것은 '-이'로 적고, [히]로만 나거나 [이]나 [히]로 나는 것은 '-히'로 적는다."라고 규정되어 있습니다. 그래서 '누누이'가 맞습니다.`,
  },
];

export { questions };

/**
 * @swagger
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
