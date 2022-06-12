// * (1) http req, res handler layer

import { Router } from 'express';
import { postService } from './post-service.mjs';
//import { loginRequired } from '../middlewares/loginRequired';

const postRouter = Router();

// TODO: Create
postRouter.post('/', async (req, res, next) => {
  try {
    const { category, author, title, content } = req.body;
    const post = await postService.createPost({ category, author, title, content });
    res.status(200).json(post);
    //.redirect(`/posts/${post.shortId}`);
  } catch (err) {
    next(err);
  }
});

// TODO: Read
// access to board, get every posts.
// if (board?write=true), edit창으로 연결 (해결 못함)
postRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.write) {
      res.redirect('post/edit');
      return;
    }
    const posts = await postService.findAll();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

postRouter.get('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    if (req.query.edit) {
      res.redirect(`post/edit/${shortId}`);
      return;
    }

    const post = await postService.findPost({ shortId });
    res.status(200).json(post);
    //res.redirect(`view/${shortId}`)}
  } catch (err) {
    next(err);
  }
});

// TODO: Update
postRouter.post('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const { category, title, content } = req.body;
    const post = await postService.updatePost({ shortId, category, title, content });
    res.status(200).json(post);
    //.redirect(`posts/${shortid}) //
  } catch (err) {
    next(err);
  }
});
export { postRouter };

// TODO: Delete
postRouter.delete('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    await postService.deletePost({ shortId });
    res.send('deletion completed');
  } catch (err) {
    next(err);
  }
});
