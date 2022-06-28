import { Router } from 'express';
import passport from 'passport';
import axios from 'axios';
import Auth from '../passport/token.mjs';
import { login_required } from '../middleware/login_required.mjs';

const gecRouter = Router();

gecRouter.post('/gec', async (req, res) => {
  const flaskUrl = 'http://kdt-ai4-team16.elicecoding.com:5000/predict';
  const bodyData = JSON.stringify(req.body);
  const testData = req.body.sentence.split('.');
  console.log(testData);
  const result = [];
  for (let i = 0; i < testData.length; i++) {
    const text = testData[i];
    if (!text) {
      continue;
    }
    console.log(text);
    const sentence = await axios
      .post(
        flaskUrl,
        { sentence: text },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((res) => res.data);

    result.push(sentence.sentence);
  }
  // const sentence = await axios
  //   .post(flaskUrl, bodyData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     withCredentials: true,
  //   })
  //   .then((res) => res.data);
  // console.log(result);
  res.json({ result });
});
export { gecRouter };

//http://kdt-ai4-team16.elicecoding.com:5000/predict post 요청 주소
