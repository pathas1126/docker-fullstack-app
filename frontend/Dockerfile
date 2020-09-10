FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx
EXPOSE 3000
# 직접 작성한 nginx 설정 파일을 이미지 내부의 nginx 설정 파일 위치에 덮어씀
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html