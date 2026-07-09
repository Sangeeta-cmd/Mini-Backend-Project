#FROM amazonlinux:2023
#FROM node:22-alpine

#WORKDIR /app

#COPY . /app
#COPY package.json ./

#RUN yum install -y nodejs 

#RUN npm install

#COPY . .

#EXPOSE 8080

#CMD ["node", "index.js"]
#CMD ["npm", "start"]


#################################
# Multi Stage Docker Build
#################################

# BUild Stage
FROM ubuntu AS build

WORKDIR /app

# copying dependency package to leverage docker layering cache mechanism
COPY package*.json ./

RUN apt-get update && apt-get install -y nodejs npm

#RUN npm ci ---> for better cleanup than npm install
RUN npm install

COPY . .


#Run-time Stage /final stage
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/ ./

EXPOSE 8080

CMD ["node", "index.js"]

