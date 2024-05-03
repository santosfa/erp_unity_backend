FROM node:20-alpine

WORKDIR /usr/app
COPY package.json ./

RUN yarn
RUN npm install 

COPY . . 

EXPOSE 4000
CMD [ "yarn", "start" ]