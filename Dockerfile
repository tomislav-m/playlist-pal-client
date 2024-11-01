FROM node:20

WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN yarn
EXPOSE 5173
CMD ["yarn", "start"]