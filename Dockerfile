FROM node:16 AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN yarn install 
COPY --from=build /app/dist ./dist


ENTRYPOINT ["/app/run.sh"]


