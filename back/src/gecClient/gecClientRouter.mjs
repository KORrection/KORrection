import { Router } from 'express';
import { gecClientService } from './gecClientService.mjs';
import { login_required } from '../middleware/login_required.mjs';

const gecRouter = Router();

// * GET : 진행 중인 문법 분석 작업이 있는지
// payload: false -> 없음 => 새 분석으로 연결 / true -> 있음 => 작업 status 확인으로 연결
gecRouter.get('/gec', login_required, async (req, res, next) => {
  try {
    const userObjId = req.currentUserId;
    const existence = await gecClientService.checkTaskExist({ userObjId });
    res.status(200).json({
      status: 'success',
      payload: existence,
    });
  } catch (err) {
    next(err);
  }
});

// * POST : 분석 작업 요청. return taskId
gecRouter.post('/gec/corrections', login_required, async (req, res, next) => {
  try {
    const userObjId = req.currentUserId;
    const sentences = req.body;
    const task = await gecClientService.requestCorrection({ userObjId, sentences });
    res.status(200).json({
      status: 'success',
      payload: task,
    });
  } catch (err) {
    next(err);
  }
});

// * GET : 작업 status 확인 ( ongoing || completed )
gecRouter.get('/gec/corrections/:taskId', async (req, res, next) => {
  try {
    const userObjId = req.currentUserId;
    const { taskId } = req.params;
    const { status, result } = await gecClientService.checkTaskProgress({ userObjId, taskId });
    res.status(200).json({
      status: 'success',
      payload: { status, result },
    });
  } catch (err) {
    next(err);
  }
});
