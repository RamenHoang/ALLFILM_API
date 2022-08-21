FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --location=global --force yarn && \
    yarn && \
    yarn cache clean

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]