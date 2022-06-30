import { gecClient } from './gecClientModel.mjs';
import axios from 'axios';

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
    sentences = sentences.split('.');
    const flaskRequest = {
      taskId: task.taskId,
      sentences,
    };

    await axios.post(process.env.FLASK_URL, flaskRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return task;
  }

  static async checkTaskProgress({ userObjId, taskId }) {
    const endPoint = `/${taskId}`;

    const taskWork = await axios
      .get(process.env.FLASK_URL + endPoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => res.data);

    if (taskWork.status == 'InProgress') {
      return { status: 'InProgress', result: '분석이 진행 중입니다.' };
    }
    const result = taskWork.sentences;
    await gecClient.deleteTask({ userObjId, taskId });
    return { status: 'Completed', result };
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
//   result: [ [ s1, s2, s3] , [s1, s2, s3] ],
// };
