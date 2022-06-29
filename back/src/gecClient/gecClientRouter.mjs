import { Router } from 'express';
import { gecClientService } from './gecClientService.mjs';
import { login_required } from '../middleware/login_required.mjs';

const gecClientRouter = Router();

// * GET : 진행 중인 문법 분석 작업이 있는지
gecClientRouter.get('/gec', login_required, async (req, res, next) => {
  try {
    const userObjId = req.currentUserId;
    const result = await gecClientService.checkTaskExist({ userObjId });
    res.status(200).json({
      status: 'success',
      payload: result,
    });
  } catch (err) {
    next(err);
  }
});

// * POST : 분석 작업 요청. return taskId
gecClientRouter.post(
  '/gec/corrections',
  /*login_required,*/ async (req, res, next) => {
    try {
      //const userObjId = req.currentUserId;
      const userObjId = '62b4245773fd451e9640600c';
      const { sentences } = req.body;
      const task = await gecClientService.requestCorrection({ userObjId, sentences });
      res.status(200).json({
        status: 'success',
        payload: { taskId: task.taskId },
      });
    } catch (err) {
      next(err);
    }
  }
);

// * GET : 작업 status 확인 ( inprogress || completed )
gecClientRouter.get(
  '/gec/corrections/:taskId',
  /*login_required,*/ async (req, res, next) => {
    try {
      //const userObjId = req.currentUserId;
      const userObjId = '62b4245773fd451e9640600c';
      const { taskId } = req.params;
      const { status, result } = await gecClientService.checkTaskProgress({ userObjId, taskId });
      res.status(200).json({
        status: 'success',
        payload: { status, result },
      });
    } catch (err) {
      next(err);
    }
  }
);

export { gecClientRouter };
