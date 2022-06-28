// * (1) http req, res handler layer

import { Router } from 'express';
import { commentService } from './commentService.mjs';
import { checkPostId, validateParentPost } from '../middleware/boardValidated.mjs';

const commentRouter = Router();
/**
 * @swagger
 * tags:
 *  name: comment
 *  description: Board에서 사용되는 Comment API
 */

// *  Create
/**
 * @swagger
 * paths:
 *  /board/comments?pId=postId:
 *   post:
 *    tags: [Post]
 *    summary: Creates new post
 *    security:
 *	      - jwt: []
 *    parameters:
 *      - in: body
 *        name: commentBody
 *        description: 댓글 작성 내용
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            commentBody:
 *              type: string
 *      - in: query
 *        name: pId (postId)
 *        description: ?pId=parentPostId => ###이 유효한 값일 때 createComment 가능
 *        schema:
 *          type: string
 *    responses:
 *      201:
 *       description: 새 댓글 생성 성공!!
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          type: object
 *                          properties:
 *                              comment:
 *                                  type: object
 *                              authorName:
 *                                  type: string
 */
commentRouter.post('/', checkPostId, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { parentPostId, parentPostObjId } = res.locals;
    const { commentBody } = req.body;
    const refinedComment = await commentService.createComment({
      userId,
      parentPostId,
      parentPostObjId,
      commentBody,
    });
    res.status(201).json({
      status: 'success',
      payload: refinedComment,
    });
  } catch (err) {
    next(err);
  }
});

// * Read
// all matches to the post
commentRouter.get('/', checkPostId, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { parentPostId } = res.locals;
    const comments = await commentService.getCommentsByPostId({ parentPostId, userId });
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
