import axios from 'axios';
import { Cookies } from 'react-cookie';

const SignUp = () => {
  const backendPortNumber = '5001';
  const serverUrl = `http://${window.location.hostname}:${backendPortNumber}/`;

  const cookies = new Cookies();
  let loginStatus = false;
  const loginToken = cookies.get('token');
  loginStatus = !!cookies.get('token');

  const handleLogoutClick = () => {
    axios
      .get(`${serverUrl}userlist`, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      SignUp
      <button type='button' onClick={handleLogoutClick}>
        dddd
      </button>
    </div>
  );
};

export default SignUp;
