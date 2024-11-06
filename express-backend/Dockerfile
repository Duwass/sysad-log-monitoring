FROM node:20.16.0-alpine

WORKDIR /usr/src/app

# Copy dependencies trước để tận dụng caching
COPY package*.json ./

# Cài đặt dependencies
RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node
RUN chmod +x ./node_modules/.bin/ts-node

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng 3001 cho ứng dụng
EXPOSE 3001

# Khởi chạy ứng dụng
CMD ["npm", "start"]
