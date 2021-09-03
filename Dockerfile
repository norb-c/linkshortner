FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

ENV PORT 80

EXPOSE 80

CMD ["sh", "-c", "npm run start"]
