# 출처 : https://loy124.tistory.com/360
FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-progress

COPY ./ ./

#nodemon 사용 
CMD ["npm", "start"]