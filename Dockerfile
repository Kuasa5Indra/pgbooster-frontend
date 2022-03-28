FROM node:16.14.2-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN apk add yarn
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]

