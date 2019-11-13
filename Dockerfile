FROM node:latest
WORKDIR /home/node/app
COPY package.json /home/node/app
RUN npm install --quiet
COPY . /home/node/app
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "app.js"]