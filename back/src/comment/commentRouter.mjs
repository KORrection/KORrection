// * (1) http req, res handler layer

import { Router } from 'express';
import { commentService } from './commentService.mjs';

const commentRouter = Router();

// * Create
// commentRouter.post('/posts/:parentPostId/comments', async (req, res, next) => {
//   try {
//     const { userId } = req.locals;
//     const { parentPostId } = req.params;
//     const { commentBody } = req.body;
//     const comment = await commentService.createComment({ userId, parentPostId, commentBody });
//     res.staus(201).json({
//       status: 'success',
//       payload: { comment },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// 테스트용
commentRouter.post('/posts/:parentPostId/comments', async (req, res, next) => {
  try {
    const userId = 'test@gmail.com';
    const { parentPostId } = req.params;
    const { commentBody } = req.body;
    const comment = await commentService.createComment({ userId, parentPostId, commentBody });
    res.status(201).json({
      status: 'success',
      payload: { comment },
    });
  } catch (err) {
    next(err);
  }
});

// * Read
commentRouter.get('/posts/:parentPostId/comments', async (req, res, next) => {
  try {
    const { parentPostId } = req.params;
    const comments = await commentService.getComments({ parentPostId });
    res.status(200).json({
      status: 'success',
      payload: { comments },
    });
  } catch (err) {
    next(err);
  }
});

export { commentRouter };
