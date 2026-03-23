FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install && npm install -g serve

COPY . .

RUN npm run build

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
