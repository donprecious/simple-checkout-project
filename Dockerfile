FROM node:16 AS builder
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
COPY package.json .

RUN chmod +x ./run.sh

ENTRYPOINT ["npm run start:prod"]



