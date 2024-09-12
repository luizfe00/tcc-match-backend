FROM node:20.14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm install
COPY . ./
EXPOSE 8080

RUN npx prisma generate
CMD [ "npm", "run", "dev" ]