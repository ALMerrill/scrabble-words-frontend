# FROM node:12.6.0-alpine AS builder
# w /app
# COPY . .
# RUN yarn run build

# FROM node:12.6.0-alpine
# RUN yarn global add serve
# WORKDIR /app
# COPY --from=builder /app/build .
# CMD ["serve", "-p", "80", "-s", "."]


FROM node:12.6.0-alpine

COPY yarn.lock /yarn.lock
COPY package.json /package.json

ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 3000

CMD ["yarn", "start"]