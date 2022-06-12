<<<<<<< HEAD
import "dotenv/config";
import { app } from "./src/app.mjs";
=======
import 'dotenv/config';
import { app } from './src/app.mjs';
>>>>>>> eac1e53b1e3f9453b2956075c032ce6ecb2ac3b6

const PORT = process.env.SERVER_PORT || 5001;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
