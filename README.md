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
  - PORT = 3000
- **Backend**:
  - Framework: Express.js
  - PORT = 3001

  **Logs**
  - FileBeats: 5044
  - Elastic_Search: 9200
  - Kibana: 5601
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