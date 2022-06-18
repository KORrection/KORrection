import axios from 'axios';
import { useState } from 'react';
import { useMount } from 'react-use';

const backendPortNumber = '5001';
const serverUrl = `http://${window.location.hostname}:${backendPortNumber}/`;

const Board = () => {
  const [posts, setPosts] = useState([]);

  useMount(() => {
    axios.get(`${serverUrl}board`).then((res) => setPosts(res.data.payload.posts));
  });

  return <div />;
};

export default Board;
