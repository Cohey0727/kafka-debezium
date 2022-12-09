FROM node:19.2.0

WORKDIR /opt/app

COPY package.json ./
RUN npm install

COPY src ./

CMD [ "npm", "run", "dev" ]