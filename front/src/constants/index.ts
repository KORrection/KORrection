const BACKEND_PORT_NUMBER = '5001';

export const SERVER_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT_NUMBER}`;
  }
  return `https://${window.location.hostname}/api`;;
})();

export const IMAGE_ON_ERROR_URL = 'https://www.yokogawa.com/public/img/default_image.png';
