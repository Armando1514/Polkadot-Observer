FROM node AS prod-frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS prod-frontend
WORKDIR /usr/share/nginx/html
COPY --from=prod-frontend-build /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
