FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install --only=prod

ENV PORT 3000

EXPOSE 3000

CMD ["sh", "-c", "npm run start"]
