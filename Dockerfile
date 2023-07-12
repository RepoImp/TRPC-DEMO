FROM gcr.io/google-appengine/nodejs

WORKDIR /app

FROM node:16.13.0-alpine3.11

RUN npm install -g typescript

COPY . .

RUN yarn install

# RUN npx prisma migrate dev --name init 

EXPOSE 3000

CMD ["yarn","dev"] 