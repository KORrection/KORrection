import cors from "cors";
import express from "express";
import { swaggerUi, specs } from "./modules/swagger.js";

const app = express();

// CORS 에러 방지
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 16팀 레이서 프로젝트 API 입니다.");
});

export { app };
