FROM node:20-bullseye-slim

WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
