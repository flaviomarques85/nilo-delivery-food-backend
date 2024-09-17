FROM node:14-alpine

RUN mkdir -p /usr/srv/app 

WORKDIR /usr/src/app 

COPY index.js package.json package-lock.json ./

RUN npm install --production 

EXPOSE 3001

CMD ["npm", "start"]
