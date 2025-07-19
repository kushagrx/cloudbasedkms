# ☁️ Cloud-Based Knowledge Management System (KMS)

A full-stack web application that allows users to upload, view, and manage files in a centralized cloud interface. Built with **React.js**, **Express.js**, **Multer**, and **MongoDB**, this app aims to simplify file handling and serve as a foundation for AI-powered document summarization in the future.

---

## 🧠 Features

### ✅ Core Functionalities
- Upload and store files in the cloud
- View a list of uploaded files with names and download links
- Persistent file storage using MongoDB
- Clean and responsive UI with React

### 🧪 Upcoming
- AI-based file summarization
- Search & filter by file type, name, or content
- User authentication and private file storage

---

## ⚙️ Tech Stack

| Layer        | Technology                        |
| ------------ | ---------------------------------- |
| Frontend     | React.js, Axios                   |
| Backend      | Node.js, Express.js, Multer       |
| Database     | MongoDB (via Mongoose)            |
| Others       | CORS, Static Hosting, REST APIs   |

---

## 📁 Folder Structure

project-root/
├── backend-kms/ # Express + Multer backend
│ ├── models/File.js
│ ├── uploads/
│ └── index.js
│
├── frontend-kms/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Header.jsx
│ │ │ ├── UploadForm.jsx
│ │ │ └── UploadedFiles.jsx
│ │ ├── pages/
│ │ │ └── Home.jsx
│ │ └── App.js
│ └── package.json

## 👨‍💻 Author
Kushagra Bisht
🎓 B.Tech CSE, UPES Dehradun
