import { Router } from 'express';
import { postVoteService } from './postVoteService.mjs';

const postVoteRouter = Router();

postVoteRouter.get('/users/my/upvotes', async (req, res, next) => {
  try {
    const userObjId = req.currentUserId;
    const Upvotes = await postVoteService.findUpvotesByUser({ userObjId });
    res.status(200).json({
      status: 'success',
      payload: { Upvotes },
    });
  } catch (err) {
    next(err);
  }
});

export { postVoteRouter };
