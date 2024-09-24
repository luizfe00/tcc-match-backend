FROM node:20.14

WORKDIR /app

# Download and copy the wait-for-it script into the container
RUN apt-get update && apt-get install -y curl
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

RUN npm install
COPY . ./
EXPOSE 8080

RUN npx prisma generate
CMD ["npm", "run", "db-migrate-dev"]
CMD [ "npm", "run", "dev" ]