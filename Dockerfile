FROM node:latest
WORKDIR /home/ubuntu/Clandestine
COPY package.json /home/ubuntu/Clandestine
RUN npm install
RUN ls -la
CMD ["npm", "start"]
