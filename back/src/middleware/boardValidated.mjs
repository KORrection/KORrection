import { Post } from '../post/postModel.mjs';
import { Comment } from '../comment/commentModel.mjs';

// comments?postId=postId 에서 postId가 유효한지 검사
// upvotes?postId=postId
const checkPostId = async (req, res, next) => {
  try {
    const post = await Post.findPostById({ postId: req.query.pId });
    res.locals.parentPostId = post.postId;
    res.locals.parentPostObjId = post._id;
    next();
  } catch (err) {
    return res.send(err.message);
  }
};

// comments/:cId?pId=pId 에서 cId와 pId 관계가 올바른지 검사
const validateParentPost = async (req, res, next) => {
  try {
    const comment = await Comment.findCommentById({ commentId: req.params.commentId });
    if (comment.parentPostId === req.query.pId) {
      next();
    }
  } catch (err) {
    return res.send(err.message);
  }
};

export { checkPostId, validateParentPost };
