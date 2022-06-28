import { gecClientModel } from './gecClientSchema.mjs';

class gecClient {
  static async findTaskByUser({ userObjId }) {
    const task = await gecClientModel.findOne({ userObjId });
    return task;
  }
}

export { gecClient };
