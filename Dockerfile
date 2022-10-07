FROM node:latest
WORKDIR /usr/src/clandestine
COPY package.json .
RUN npm install
CMD ["npm", "start"]
