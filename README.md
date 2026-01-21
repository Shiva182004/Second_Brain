# 🧠 Second Brain

Second Brain is a personal knowledge management application that helps users save, organize, and share useful content such as links, notes, videos, and documents in one place.  
Inspired by the *Second Brain* concept, this project allows users to build their own digital knowledge base and share it publicly if they want.

---

## 🚀 Features

- 🔐 User authentication using JWT (httpOnly cookies)
- 📝 Add, view, and delete content
- 🏷️ Tag-based content organization
- 📺 Supports multiple content types (YouTube, Twitter, Links, Documents)
- 🔗 Share Brain feature with public shareable link
- 🧠 Clean dashboard UI
- 🛡️ Secure protected APIs

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Sequelize ORM
- MySQL
- JWT Authentication

---

## 📂 Project Structure
Second_Brain/
│
├── frontend/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ ├── config/
│ └── main.tsx
│
├── backend/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── index.ts
│
└── README.md



---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=second_brain
JWT_SECRET=your_jwt_secret

▶️ Getting Started
1️⃣ Clone the repository
git clone https://github.com/Shiva182004/Second_Brain.git
cd Second_Brain

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Backend runs on:

http://localhost:3002

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication

JWT is stored securely using httpOnly cookies

Cookies are automatically sent with each request

Protected routes use middleware for authentication

🔗 Share Brain Feature

Users can generate a public shareable link

A unique token is created and stored per user

Anyone with the link can view shared content

Example:

http://localhost:3002/api/v1/brain/<shareToken>

🧪 API Endpoints
Auth

POST /api/v1/signup

POST /api/v1/signin

Content

GET /api/v1/content

PUT /api/v1/content

DELETE /api/v1/content

Share Brain

POST /api/v1/brain/share

GET /api/v1/brain/:shareToken

🚧 Future Enhancements

Search and filter by tags

Edit content

Analytics for shared brains

Deployment using Docker / Cloud

Toast notifications

👨‍💻 Author

Shivam Sharma
GitHub: https://github.com/Shiva182004

⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub!


---

If you want next, I can:
- add screenshots section
- make it resume/portfolio optimized
- write contribution guidelines
- add badges (Tech stack, license, stars)

Just say 👍
