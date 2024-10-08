# sysad-log-monitoring
_Nhớ đọc nhé các bro :v_
- [Folder structure](#folder-structure-)
- [Git branch](#git-branch)
- [Git flow](#git-flow)

### FOLDER STRUCTURE ###
- **Working with backend:** Chuyển sang folder backend để code `cd backend` -> `npm install`
- **Working with frontend:** Chuyển sang folder frontend để code`cd frontend` -> `npm install`

      project-root/
      │
      ├── README.md
      │
      ├── backend/
      │   ├── app/
      │   │   └── api/      <!-- (route files, e.g., userRoutes.js, authRoutes.js) -->
      │   │
      │   ├── lib/
      │   │   ├── models/   <!-- (model scripts, e.g., userModel.js) -->
      │   │   └── db.ts     <!-- (database configuration, e.g., connecting to MongoDB) -->
      │   │
      │   ├── .env          <!-- (MONGO_URI, JWT_SECRET) -->
      │   ├── .gitignore    <!-- (ignore files for version control) -->
      │   ├── package.json  <!-- (backend dependencies or other config files) -->
      │   └── ...           <!-- (other backend files) -->
      │
      ├── frontend/
      │   ├── src/          <!-- (frontend source code, e.g., components, services) -->
      │   ├── public/       <!-- (static assets like index.html, images) -->
      │   ├── .env          <!-- (environment variables for the frontend) -->
      │   ├── .gitignore    <!-- (ignore files for the frontend) -->
      │   ├── package.json  <!-- (frontend dependencies) -->
      │   └── ...           <!-- (other frontend files) -->
      │
      └── .gitignore        <!-- (global .gitignore if needed) -->


### GIT BRANCH
- `main`: nhánh root, khi nào build xong hết rồi mới up lên, không được code trực tiếp lên đây
- `develop`: nhánh phát triển, base từ nhánh main, chỉ merge code trên này
- `feature/…`: các nhánh temp, code 1 tính năng gì đó thì tạo branch này
- `hotfix/…`: các nhánh temp, nếu cần thay đổi nhanh hay fix nhanh cái nào thì tạo branch này

### GIT FLOW
*Lưu ý: Nếu muốn merge code thì phải thông báo lên nhóm*
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
8. Đẩy lên nhánh develop: `git push origin develop`



