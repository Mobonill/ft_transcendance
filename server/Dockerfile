FROM node:20-bullseye-slim

WORKDIR /server

COPY package.json ./
RUN npm install

COPY . .
RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npm run dev"]