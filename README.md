# sysad-log-monitoring
_Nhớ đọc nhé các bro :v_

- [SETUP](#setup)
- [WORKFLOW](#workflow)
- [GIT BRANCH](#git-branch)
- [GIT FLOW](#git-flow)
- [FOLDER STRUCTURE](#folder-structure-)

### SETUP
- **Frontend**:
  - Framework: NextJs 
  - PORT: 3000
- **Backend**:
  - Framework: Express.js
  - PORT: 3001

  **ELK Stack**
  - Elasticsearch: 
    - PORT: 9200
  - Kibana: 
    - PORT: 5601
  - Nginx: 
    - PORT: 80
  - Logstash: 
    - PORT: 5044 (for Beats input) and 9600 (http)
  - Beats:
    - Filebeat: Output to Logstash
    - Metricbeat: Output to Elasticsearch
    - Packetbeat: Output to Elasticsearch

  **ELK Setup**
  - Make sure you have docker installed on your machine
  - `docker-compose up -d`
  - Dừng ELK: `docker-compose down`
  - Truy cập Kibana: http://localhost:5601
  
  **Setup Problems**
    - Lỗi kibana `"Kibana server is not ready yet"`
      - Check log của kibana: `docker logs elk_kibana_1`
      - Vào container elastic và set pass cho kibana_system (nhập trên terminal)
      `docker compose exec elastic sh`
      `curl -X POST -u "elastic:${ELASTIC_PASSWORD}" -H "Content-Type: application/json" http://localhost:9200/_security/user/kibana_system/_password -d "{ \"password\": \"${KIBANA_PASSWORD}\" }"`
      - F5 là oke
    - Thiếu log để test:
      - extract file logs.zip
    - Các lỗi khác:
      - Xóa hết các image ELK (trừ Frontend, Backend)
      - Xóa data của ELK đi bằng cách xóa folder [elk/data]([data](elk/data)) đi 
      - Chạy lại `docker-compose up -d`

### WORKFLOW
- **Frontend side:**
  - Chuyển sang folder frontend để code`cd frontend`
  - Tải dependencies: `npm install`
  - Chạy FE server (môi trường development): `npm run dev`
- **Backend side:** 
  - Chuyển sang folder backend để code `cd express-backend`
  - Tải dependencies: `npm install`
  - Chạy BE server: `npm start`

### GIT BRANCH
- `main`: nhánh root, khi nào build xong hết rồi mới up lên, không được code trực tiếp lên đây, không được xóa
- `develop`: nhánh phát triển, base từ nhánh main, chỉ merge code trên này, không được xóa
- `feature/…`: các nhánh temp, code 1 tính năng gì đó thì tạo branch này
- `hotfix/…`: các nhánh temp, nếu cần thay đổi nhanh hay fix nhanh cái nào thì tạo branch này

### GIT FLOW
*Lưu ý: Nếu muốn merge code lên develop phải thông báo lên nhóm*
*Nhớ chuyển về root folder để commit code*
1. Clone repo về máy: `git clone`
2. Chuyển sang nhánh develop: `git checkout develop`
3. Cập nhật các thay đổi trên nhánh develop: `git fetch` hoặc `git pull`
   - Lưu ý làm trước khi tạo branch mới
4. Tạo branch mới base trên nhánh develop: `git checkout -b [Tên nhánh temp mới]`
   - [Lưu ý về tên nhánh](#git-branch): Mặc định sẽ là _**feature/…**_. VD: `feature/api-server`
   - Nếu muốn dùng lại nhánh temp thì `git checkout [Tên nhánh temp]`
5. Code trên nhánh vừa tạo ([chọn đúng folder làm việc](#do-not-code-in-the-root-folder-))
6. Add các thay đổi: `Git add . `(add tất)
7. `Git commit -m “message”`
8. Đẩy nhánh temp lên github: `git push origin [Tên nhánh]`
9. Pull request

### FOLDER STRUCTURE ###
      project-root/
      │
      ├── README.md
      │
      ├── elk/
      │   ├── data/                    <!-- Elastic storage -->
      │   ├── filebeat.yaml            <!-- Filebeat configuration -->
      │   ├── logstash.conf            <!-- Logstash configuration -->
      │   ├── metricbeat.yaml          <!-- Metricbeat configuration -->
      │   └── packetbeat.yaml          <!-- Packetbeat configuration -->
      │
      ├── nginx/nginx.conf             <!-- Nginx configuration -->
      │
      ├── docker-compose.yml           <!-- Docker Compose configuration --> 
      │
      ├── logs/                        <!-- (log files) --> 
      │
      ├── express-backend/
      │   ├── src/
      │   │   ├── controllers/      
      │   │   ├── models/
      │   │   ├── routes/
      │   │   └── index.ts
      │   ├── .env  
      │   ├── Dockerfile
      │   ├── package.json  <!-- (backend dependencies) -->
      │   └── ...           <!-- (other frontend files) -->      │
      │
      ├── frontend/
      │   ├── index/          <!-- (frontend source code, e.g., components, services) -->
      │   ├── public/       <!-- (static assets like index.html, images) -->
      │   ├── .env          <!-- (environment variables for the frontend) -->
      │   ├── .gitignore    <!-- (ignore files for the frontend) -->
      │   ├── package.json  <!-- (frontend dependencies) -->
      │   └── ...           <!-- (other frontend files) -->
      │
      └── .gitignore        <!-- (global .gitignore if needed) -->



_From 22025510~_