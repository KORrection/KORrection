import { useParams } from 'react-router-dom';
import { useMount } from 'react-use';
import { getApi } from 'services';

const Post = () => {
  const params = useParams();

  useMount(() => {
    getApi(`board/posts/${params.postId}`).then((res) => console.log(res));
  });

  return <div style={{ width: '500px', height: '1000px', backgroundColor: 'tomato' }}>Post</div>;
};

export default Post;
