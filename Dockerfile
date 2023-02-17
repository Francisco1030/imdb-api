FROM node:16-alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN chown -R root /usr/src/app
RUN npm install --only=development
COPY . .

FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src ./dist
CMD ["node", "src/infra/web-server/index.js"]