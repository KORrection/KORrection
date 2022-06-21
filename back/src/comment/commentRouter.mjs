// * (1) http req, res handler layer

import { Router } from 'express';
import { commentService } from './commentService.mjs';
import { checkPostId, validateParentPost } from '../middleware/boardValidated.mjs';

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
    const comments = await commentService.getCommentsByPostId({ parentPostId });
    res.status(200).json({
      status: 'success',
      payload: { comments },
    });
  } catch (err) {
    next(err);
  }
});

// * Update one comment
commentRouter.put('/:commentId', validateParentPost, async (req, res, next) => {
  try {
    const { commentId } = req.params;
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

// * Delete
// ** (1) Delete one comment (delete DB docs for real)
commentRouter.delete('/:commentId', validateParentPost, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const isDeleted = await commentService.deleteComment({ commentId });
    res.status(200).json({
      status: 'success',
      payload: { isDeleted },
    });
  } catch (err) {
    next(err);
  }
});

// ** (2) Pretend To Delete one comment (just change 'isDeleted' value from false to ) - 대댓글 시 필요..
// commentRouter.delete('/:commentId', validateParentPost, async (req, res, next) => {
//   try {
//     const { commentId } = req.params;
//     const comment = await commentService.pretendToDelCom({ commentId });
//     res.status(200).json({
//       status: 'success',
//       payload: {
//         parentPostId: comment.parentPostId,
//         commentId: comment.commentId,
//         isDeleted: comment.isDeleted,
//         commentBody: '삭제된 댓글입니다',
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

export { commentRouter };
