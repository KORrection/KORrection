// * (1) http req, res handler layer

import { Router } from 'express';
import { commentService } from './commentService.mjs';
import { checkPostId, validateParentPost, getCommentsMiddleware } from '../middleware/boardValidator.mjs';

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
commentRouter.post('/board/comments', checkPostId, async (req, res, next) => {
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
// post에 해당하는 comments 가져오거나 한 유저가 작성한 comments 가져오기
commentRouter.get('/board/comments', getCommentsMiddleware, async (req, res, next) => {
  try {
    const { condition } = res.locals;
    const comments = await commentService.getComments({ condition });
    res.status(200).json({
      status: 'success',
      payload: { comments },
    });
  } catch (err) {
    next(err);
  }
});

// * Update one comment
commentRouter.put('/board/comments/:commentId', validateParentPost, async (req, res, next) => {
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
// ** Delete one comment (delete DB docs for real)
commentRouter.delete('/board/comments/:commentId', validateParentPost, async (req, res, next) => {
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

export { commentRouter };
