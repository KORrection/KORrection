// * (1) http req, res handler layer

import { Router } from 'express';
import { postService } from './postService.mjs';
//import { loginRequired } from '../middlewares/loginRequired';

const postRouter = Router();
/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Board에서 사용되는 Post API
 */

// *  Create
/**
 * @swagger
 * paths:
 *  /board/posts:
 *   post:
 *    tags: [Post]
 *    summary: Creates new post
 *    security:
 *	      - jwt: []
 *    parameters:
 *      - in: body
 *        name: post info
 *        description: The post to create / userID는 req.locals에서 받아옴
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            category:
 *              type: string
 *            title:
 *              type: string
 *            content:
 *              type: string
 *    responses:
 *      201:
 *       description: 새 게시글 생성 성공!!
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
 *                              shortId:
 *                                  type: string
 */
// postRouter.post('/posts', async (req, res, next) => {
//   try {
//     const { userId } = req.locals; // TODO: check whether the userId is in email-format or not
//     const { category, title, content } = req.body;
//     const post = await postService.createPost({ userId, category, title, content });
//     res.status(201).json({
//       status: 'success',
//       payload: { shortId: post.shortId },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

postRouter.post('/posts', async (req, res, next) => {
  try {
    const userId = 'test@gmail.com';
    const { category, title, content } = req.body;
    const post = await postService.createPost({ userId, category, title, content });
    res.status(201).json({
      status: 'success',
      payload: { shortId: post.shortId },
    });
  } catch (err) {
    next(err);
  }
});

// * Read
/**
 * @swagger
 * paths:
 *  /board/posts:
 *   get:
 *    tags: [Post]
 *    summary: get all posts
 *    security:
 *	      - jwt: []
 *    responses:
 *      200:
 *       description: 모든 게시물 받아오기 성공!
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
 *                              $ref: '#/definitions/Post'
 */
postRouter.get('/posts', async (req, res, next) => {
  try {
    if (req.query.write) {
      res.redirect('post/edit');
      return;
    }
    const posts = await postService.findAll();
    res.status(200).json({
      status: 'success',
      payload: { posts },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * paths:
 *  /board/posts/{shortId}:
 *   get:
 *    parameters:
 *      - in: path
 *        name: shortId
 *        required: true
 *    tags: [Post]
 *    summary: get specific post
 *    security:
 *	      - jwt: []
 *    responses:
 *      200:
 *       description: 게시물 업데이트 성공!
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
 *                              $ref: '#/definitions/Post'
 */
postRouter.get('/posts/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    if (req.query.edit) {
      res.redirect(`post/edit/${shortId}`);
      return;
    }

    const post = await postService.findPost({ shortId });
    res.status(200).json({
      status: 'success',
      payload: post,
    });
    //? res.redirect(`view/${shortId}`)}
  } catch (err) {
    next(err);
  }
});

// * Update
/**
 * @swagger
 * paths:
 *  /board/posts/{shortId}:
 *    put:
 *      tags: [Post]
 *      summary: update post info
 *      security:
 *	      - jwt: []
 *      parameters:
 *        - name: id
 *          in: path
 *          type: string
 *          description: post의 고유 id
 *          required: true
 *        - in: body
 *          name: post info
 *          description: The post to update
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              category:
 *                type: string
 *              title:
 *                type: string
 *              content:
 *                type: string
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/definitions/Post'
 */
postRouter.put('/posts/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const { category, title, content } = req.body;
    const post = await postService.updatePost({ shortId, category, title, content });
    res.status(200).json({
      status: 'success',
      payload: post,
    });
  } catch (err) {
    next(err);
  }
});

// * Delete
/**
 * @swagger
 * paths:
 *  /board/posts/{shortId}:
 *    delete:
 *      tags: [Post]
 *      summary: delete post
 *      security:
 *	      - jwt: []
 *      parameters:
 *        - name: id
 *          in: path
 *          type: string
 *          description: post의 고유 id
 *          required: true
 *      responses:
 *        200:
 *          description: deletion completed
 */
postRouter.delete('/posts/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const isDeleted = await postService.deletePost({ shortId });
    res.status(200).json({
      status: 'success',
      payload: { isDeleted },
    });
  } catch (err) {
    next(err);
  }
});

// * 좋아요
/**
 * @swagger
 * paths:
 *  /board/likes/{shortId}:
 *    put:
 *      tags: [Post]
 *      summary: like the Post(좋아요)
 *      security:
 *	      - jwt: []
 *      parameters:
 *        - name: id
 *          in: path
 *          type: string
 *          description: post의 고유 id
 *          required: true
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          type: object
 *                          properties:
 *                              likeCount:
 *                                  type: number
 */
postRouter.put('/likes/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const post = await postService.likePost({ shortId });
    res.status(200).json({
      status: 'success',
      payload: { likeCount: post.likeCount },
    });
  } catch (err) {
    next(err);
  }
});

// * 좋아요 취소
/**
 * @swagger
 * paths:
 *  /board/de-likes/{shortId}:
 *    put:
 *      tags: [Post]
 *      summary: like the Post(좋아요 취소)
 *      security:
 *	      - jwt: []
 *      parameters:
 *        - name: id
 *          in: path
 *          type: string
 *          description: post의 고유 id
 *          required: true
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          type: object
 *                          properties:
 *                              likeCount:
 *                                  type: number
 */
postRouter.put('/de-likes/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const post = await postService.undoLikePost({ shortId });
    res.status(200).json({
      status: 'success',
      payload: { likecount: post.likeCount },
    });
  } catch (err) {
    next(err);
  }
});

export { postRouter };
