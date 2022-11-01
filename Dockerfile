# Stage 1
FROM node:14 as build-step
RUN mkdir -p /app/src
WORKDIR /app/src

COPY package.json /app/src
RUN npm install
COPY . /app/src
RUN npm run build

#stage 2
FROM node:14
RUN mkdir -p /app/ls10_net_entity
WORKDIR /app/ls10_net_entity
COPY --from=build-step /app/src/build /app/ls10_net_entity/
COPY package*.json /app/ls10_net_entity/
RUN npm install && npm i -g nodemon
CMD [ "npm", "run", "run-build" ]
EXPOSE 33999

