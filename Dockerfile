FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env.* ./

RUN npm  ci --production --ignore-scripts

COPY --from=build /app/dist ./dist

EXPOSE 5000

CMD ["npm", "start"]
