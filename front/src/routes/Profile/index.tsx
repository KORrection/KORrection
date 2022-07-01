import { useEffect } from 'react';
import { getApi } from 'services/axios';

const Profile = () => {
  useEffect(() => {
    getApi('users').then((res) => console.log(res));
  }, []);

  return <div>Profile</div>;
};

export default Profile;
