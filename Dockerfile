FROM node:22 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
RUN ls -la build/client/ && echo "Build files verified"

FROM nginx:alpine
COPY --from=builder /app/build/client /usr/share/nginx/html
# Проверяем, что файлы скопированы правильно
RUN ls -la /usr/share/nginx/html/ && echo "Files copied to Nginx directory"
# Копируем конфигурацию Nginx
COPY ./nginx.workroom.conf /etc/nginx/conf.d/default.conf

# ВАЖНО: меняем порт с 80 на 5500
EXPOSE 5500
CMD ["nginx", "-g", "daemon off;"]
