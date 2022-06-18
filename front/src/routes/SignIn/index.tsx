import axios from 'axios';
import { FormEvent } from 'react';

const backendPortNumber = '5001';
const serverUrl = `http://${window.location.hostname}:${backendPortNumber}/`;

const SignIn = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    axios.get(`${serverUrl}google`, { withCredentials: false }).then((res) => console.log(res));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button id='google_login_btn' type='submit'>
          ddd
        </button>
      </form>
    </div>
  );
};

export default SignIn;
