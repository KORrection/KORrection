import { gecClient } from './gecClientModel.mjs';

class gecClientService {
  static async checkTaskExist({ userObjId }) {
    const task = await gecClient.findTaskByUser({ userObjId });
    const result = task == undefined ? false : true;
    return result;
  }

  static async requestCorrection({ userObjId, sentences }) {
    const task = await gecClient.createTask({ userObjId });
    // TODO: split sentences and send to flask server to start analyzing
    return task;
  }

  static async checkTaskProgress({ userObjId, taskId }) {
    // TODO: const taskWork = request GET to flask server with taskId
    let taskWork;
    if (taskWork.status == -'inProgress') {
      return { status: 'inProgress', result: '분석이 진행 중입니다.' };
    }
    const result = taskWork.result;
    // TODO: delete taskData in Collection
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

// * get 요청 시 받는 값 (1) - taskWork
// const GETreturn = {
//   taskId: '~~',
//   status: 'completed',
//   result: [
//     {
//       original: sentence1,
//       corrected: [sentence1_1, sentence1_2, sentence1_3],
//     },
//     {
//       original: sentence2,
//       corrected: [sentence2_1, sentence2_2, sentence2_3],
//     },
//     {
//       original: sentence3,
//       corrected: [sentence3_1, sentence3_2, sentence3_3],
//     },
//   ],
// };
// * get 요청 시 받는 값 (2) - taskWork <- 유력!!
// const GETreturn = {
//   taskId: '~~',
//   status: 'completed',
//   result: [ [ s1, s2, s3] , [s1, s2, s3] , ... ],
// };
