#FROM amazonlinux:2023
FROM node:22-alpine

WORKDIR /app

#COPY . /app
COPY package.json ./

#RUN yum install -y nodejs 

RUN npm install

COPY . .

EXPOSE 8080

#CMD ["node", "index.js"]
CMD ["npm", "start"]

