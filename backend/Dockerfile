FROM node:bullseye

WORKDIR /backend

COPY package.json ./
RUN npm install


COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh","-lc","npx prisma migrate dev || true; npm run start"]
