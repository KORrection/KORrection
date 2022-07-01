import { gecClientModel } from './gecClientSchema.mjs';

class gecClient {
  static async findTaskByUser({ userObjId }) {
    return await gecClientModel.findOne({ userObjId });
  }

  static async createTask({ userObjId, sentences }) {
    return await gecClientModel.create({ userObjId, sentences });
  }

  static async deleteTask({ userObjId, taskId }) {
    return await gecClientModel.deleteOne({ userObjId, taskId });
  }
  static async findSentencesByTaskId({ taskId }) {
    return await gecClientModel.findOne({ taskId });
  }
}

export { gecClient };
