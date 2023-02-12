// GET /gec
interface getGecRes {
  data: {
    status: string;
    payload: {
      task: boolean;
      message: '진행 중인 작업이 없습니다.' | '진행 중인 작업이 있습니다.';
      taskId?: string;
    };
  };
}

const getGec: getGecRes = {
  data: {
    status: 'success',
    payload: {
      task: true,
      message: '진행 중인 작업이 있습니다.',
      taskId: '[t]CkHA7c1K_7FPpn4lMnqPm',
    },
  },
};

// GET /gec/corrections/:taskId
interface getGecCorrectionsRes {
  data: {
    status: string;
    payload: {
      status: 'Completed';
      result: string[][];
      originals: string[];
    };
  };
}

const gecCorrections: getGecCorrectionsRes = {
  data: {
    status: 'success',
    payload: {
      status: 'Completed',
      result: [
        [
          '오랜만에 친구들을 만나서 기분이 좋았다.',
          '오랜만에 친구들을 만나 기분이 좋았다.',
          '오랜만에 친구들을 만나서 기분이 좋았다.',
        ],
        ['그럼 며칠 뒤에 봬요!', '그럼 며칠 후에 봬요!', '그럼 며칠 뒤에 뵙겠습니다!'],
        ['왜 안돼', '왜 안돼?', '왜 안돼?'],
      ],
      originals: ['오랫만에 친구들을 만나서 기분이 조았다', '그럼 며칠뒤에 뵈요!', '웨 안돼'],
    },
  },
};

export default {
  checkIsInProgress: async () => getGec,
  getCorrectionResult: async () => gecCorrections,
};
