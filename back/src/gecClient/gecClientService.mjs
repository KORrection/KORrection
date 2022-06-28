import { gecClient } from './gecClientModel.mjs';

class gecClientService {
  static async checkTaskExist({ userObjId }) {
    const task = await gecClient.findTaskByUser({ userObjId });
    if (task == undefined) {
      return {
        task: false,
        message: '진행 중인 작업이 없습니다.',
      };
    }
    const taskId = task.taskId;
    return {
      task: true,
      message: taskId,
    };
  }

  // taskId 반환은 router에서 처리됨
  static async requestCorrection({ userObjId, sentences }) {
    if (!sentences) {
      throw new Error('내용을 입력해 주세요.');
    }
    const task = await gecClient.createTask({ userObjId });

    // TODO: (건태) split sentences and send to flask server to start analyzing (sentences를 쪼개고, 플라스크에 taskId와 sentence보내서 분석 시작하기 - 하단부 post 요청 시 보낼 body 참고 )

    return task;
  }

  static async checkTaskProgress({ userObjId, taskId }) {
    // TODO: (건태) const taskWork = request GET to flask server with taskId (taskId로 플라스크에 GET 요청 날리기)

    let taskWork; // TODO: 윗 줄 작업 끝나면 지워주세요

    if (taskWork.status == 'inProgress') {
      return { status: 'inProgress', result: '분석이 진행 중입니다.' };
    }
    const result = taskWork.result;
    await gecClient.deleteTask({ userObjId, taskId });
    return { status: 'completed', result };
  }
}

export { gecClientService };

// ! belows are just a memo
// * status : inprogess / completed
// return { ‘taskId’ : taskId, ‘status’ : ‘InProgress’, ‘sentences’ : [‘’]}, 200

// * body 받아오기
// req.body = {
//   sentences: 'sentence1. sentence2. sentence3',
// };

// * post 요청 시 보낼 body
// const POST = {
//   taskId: '~~',
//   paragraph: [sentence1, sentence2, sentence3],
// };

// * get 요청 시 받는 값
// const taskWork = {
//   taskId: '~~',
//   status: 'completed',
//   result: [ [ s1, s2, s3] , [s1, s2, s3] , ... ],
// };
