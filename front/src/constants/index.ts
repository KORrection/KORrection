const BACKEND_PORT_NUMBER = '5001';

export const SERVER_URL = (() => {
  if (process.env.NODE_ENV === 'development') {
    return `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT_NUMBER}`;
  }
  return `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT_NUMBER}/api`;
})();

export const IMAGE_ON_ERROR_URL = 'https://www.yokogawa.com/public/img/default_image.png';

export const GEC_IMAGE_URL =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9c9684cb-c18e-42e1-81e9-9e34c69b2d3e/Untitled.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220701%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220701T195130Z&X-Amz-Expires=86400&X-Amz-Signature=44c6676c44de14e365f2aaae2b18f58a87d15eac6452a4df8e16d5a6a3b4b579&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.gif%22&x-id=GetObject';

export const BOARD_IMAGE_URL =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f98a432f-98d3-4634-b554-76245e1b9c88/Untitled.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220701%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220701T195552Z&X-Amz-Expires=86400&X-Amz-Signature=47105f08c6324f12df02d662cac70222ca9626d3e75befb97a95630389d68fe2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.gif%22&x-id=GetObject';
