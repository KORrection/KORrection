import { gecClientModel } from './gecClientSchema.mjs';

class gecClient {
  static async findTaskByUser({ userObjId }) {
    return await gecClientModel.findOne({ userObjId });
  }

  static async createTask({ userObjId }) {
    return await gecClientModel.create({ userObjId });
  }
}

export { gecClient };
