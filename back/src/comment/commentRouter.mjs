// * (1) http req, res handler layer

import { Router } from 'express';
import { commentService } from './commentService.mjs';
import { checkPostId, valParentPost } from '../middleware/boardValidated.mjs';

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
commentRouter.post('/', checkPostId, async (req, res, next) => {
  try {
    const userId = 'test@gmail.com';
    const parentPostId = res.locals.postId;
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
// all matches to the post
commentRouter.get('/', checkPostId, async (req, res, next) => {
  try {
    const parentPostId = res.locals.postId;
    const comments = await commentService.getComments({ parentPostId });
    res.status(200).json({
      status: 'success',
      payload: { comments },
    });
  } catch (err) {
    next(err);
  }
});

// * Update one comment
commentRouter.put('/', valParentPost, async (req, res, next) => {
  try {
    const { commentId } = res.locals;
    const { commentBody } = req.body;
    const comment = await commentService.updateComment({ commentId, commentBody });
    res.status(200).json({
      status: 'success',
      payload: { comment },
    });
  } catch (err) {
    next(err);
  }
});

export { commentRouter };
