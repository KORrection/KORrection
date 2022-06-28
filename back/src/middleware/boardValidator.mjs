import { Post } from '../post/postModel.mjs';
import { Comment } from '../comment/commentModel.mjs';

// comments?pId=postId 에서 postId가 유효한지 검사
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

// comments?user={userId} 에서 받은 userId와 currentUserId가 같은지 비교
const validateUserId = async (req, res, next) => {
  try {
    const userId = req.query.user;
    const userObjId = req.currentUserId;
    if (userId !== userObjId) {
      throw new Error('잘못된 접근입니다.');
    }
    next();
  } catch (err) {
    return res.send(err.message);
  }
};
export { checkPostId, validateParentPost, validateUserId };
