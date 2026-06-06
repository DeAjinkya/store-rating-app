Setup Steps
---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd project-folder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=store_rating
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend server:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 4️⃣ Database Setup

Start MySQL and create the database:

```sql
CREATE DATABASE store_rating;
```

Tables will be automatically created using Sequelize models/migrations.
