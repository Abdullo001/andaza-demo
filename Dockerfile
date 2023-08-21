FROM node:14.19.0-alpine3.14

RUN mkdir -p /app
WORKDIR /app

RUN echo "nameserver 1.1.1.1" >> /etc/resolv.conf

COPY . /app/

RUN npm install
RUN npm run build

ARG HOST
ARG PORT
ARG APP_ENV

EXPOSE $HOST 80

CMD ["npm", "start"]
