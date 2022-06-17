// comments?postId=postId 같은 쿼리를 res.locals.post에 넣는다
// upvotes?postId=postId
import { Post } from '../post/postModel.mjs';
import { Comment } from '../comment/commentModel.mjs';

const checkPostId = async (req, res, next) => {
  try {
    const post = await Post.findPost({ postId: req.query.pId });
    res.locals.postId = post.postId;
    next();
  } catch (err) {
    return res.send(err.message);
  }
};

const valParentPost = async (req, res, next) => {
  try {
    const comment = await Comment.findCommentById({ commentId: req.query.cId });
    console.log(comment);
    console.log(comment.parentPostId);
    if (comment.parentPostId === req.query.pId) {
      res.locals.commentId = comment.commentId;
      next();
    }
  } catch (err) {
    return res.send(err.message);
  }
};

export { checkPostId, valParentPost };
