FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

ENV MONGODB_URL=mongodb+srv://nicolaananda:bPihr58PCKhFlXy4@cluster0.wmwkpiq.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0

EXPOSE 8000

CMD ["npm", "start"]