FROM node:19.2.0

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY index.ts ./

EXPOSE 8080
CMD [ "pnpm", "start" ]