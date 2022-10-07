FROM node:latest
WORKDIR .
COPY package.json .
RUN npm install
CMD ["npm", "start"]
