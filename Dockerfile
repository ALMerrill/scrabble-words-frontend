FROM node:12.6.0-alpine

COPY yarn.lock /yarn.lock
COPY package.json /package.json

ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 3000

CMD ["yarn", "start"]

