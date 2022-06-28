import { gecClient } from './gecClientModel.mjs';

class gecClientService {
  static async checkTaskExist({ userObjId }) {
    const task = await gecClient.findTaskByUser({ userObjId });
    const result = task == undefined ? false : true;
    return result;
  }

  static async requestCorrection({ userObjId }) {
    // TODO: taskId는 어떡하지
    const foo = await gecClient.createTask({ userObjId }); // TODO: taskId도 같이 넣어서 넘겨줄 건지.
    return foo;
  }
}

export { gecClientService };
