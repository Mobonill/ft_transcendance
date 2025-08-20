FROM node:bullseye

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# 5) Au démarrage: appliquer les migrations (dev) puis lancer l'app
#    En prod: préfère `npx prisma migrate deploy`
CMD ["sh","-lc","npx prisma migrate dev || true; npm run start"]