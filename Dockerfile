# Multi-stage build.
# 1. Build the JavaScript code from the TypeScript files.
# 2. Copy generates files from the builder stage to the server stage.
#    Install only --production dependencies.

FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build
EXPOSE 8000
CMD ["npm", "start"]