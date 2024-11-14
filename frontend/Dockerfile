FROM node:20.16.0-alpine

WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào image
COPY package*.json ./

# Cài đặt tất cả dependencies (bao gồm devDependencies)
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

RUN npm run build
# Mở cổng 3000 cho ứng dụng
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]
