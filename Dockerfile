# Estágio de compilação
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Estágio de produção
FROM node:20-alpine AS production
WORKDIR /usr/app
COPY --from=builder /usr/src/app/package.json /usr/app/
COPY --from=builder /usr/src/app/dist /usr/app/dist
RUN yarn install --prod --frozen-lockfile
EXPOSE 4000
CMD ["yarn", "start"]