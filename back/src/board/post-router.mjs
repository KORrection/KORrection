// * (1) http req, res handler layer

import { Router } from 'express';
import { postService } from './post-service.mjs';
//import { loginRequired } from '../middlewares/loginRequired';

const postRouter = Router();

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

export { postRouter };
