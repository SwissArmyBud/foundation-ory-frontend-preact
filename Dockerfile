# This is the newer version

FROM node:lts-alpine

WORKDIR /app

# Setup the Node harness
COPY package.json .
RUN npm install

# Copy the build
RUN npm i -g serve
COPY dist dist

EXPOSE 3000
CMD [ "serve", "-s", "dist" ]