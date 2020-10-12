FROM node:13-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --silent

COPY . .

CMD ["npm", "start"]