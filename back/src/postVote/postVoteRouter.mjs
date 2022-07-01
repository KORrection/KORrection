import { Router } from 'express';
import { postVoteService } from './postVoteService.mjs';
import { validateUserId } from '../middleware/boardValidator.mjs';

const postVoteRouter = Router();

postVoteRouter.get('/board/upvotes', validateUserId, async (req, res, next) => {
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
