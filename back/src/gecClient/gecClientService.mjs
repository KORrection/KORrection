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
      message: '진행 중인 작업이 있습니다.',
      taskId,
    };
  }

  // taskId 반환은 router에서 처리됨
  static async requestCorrection({ userObjId, sentences }) {
    if (!sentences) {
      throw new Error('내용을 입력해 주세요.');
    }

    sentences = sentences.split('.');
    const task = await gecClient.createTask({ userObjId, sentences });
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
    const asd = await gecClient.findSentencesByTaskId({ taskId }); // asd 수정 요망
    await gecClient.deleteTask({ userObjId, taskId });
    return { status: 'Completed', result, asd }; // asd 수정 요망
  }
}

export { gecClientService };
