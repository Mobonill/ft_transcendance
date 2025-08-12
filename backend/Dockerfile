FROM node:bullseye

WORKDIR /backend

COPY package.json package-lock.json ./


RUN npm install
COPY . .
RUN npm run build



#RUN npm run start
CMD ["npm", "run", "start"]


EXPOSE 3000
