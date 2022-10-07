FROM node:latest
WORKDIR /home/ubuntu/Clandestine
COPY package.json .
RUN npm install
CMD ["npm", "start"]
