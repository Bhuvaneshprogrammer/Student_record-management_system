# 🎓 Student Management System

A full-stack web application to efficiently manage student records. Built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**, this system supports complete CRUD operations along with advanced features like search, sorting, pagination, CSV export, register number tracking, and dark mode.

---

# 🚀 Features

## 🔐 Authentication

* Admin login system
* Prevents unauthorized access

---

## ➕ Add Student

Add new student records with validations:

### ✅ Fields:

* Name
* Age
* Department
* Email
* Register Number

### ⚠️ Validations:

* All fields are required
* Age must be greater than 0
* Valid email format
* Email must be unique
* Register Number must be **12 digits**
* Register Number must be **unique**

---

## 📋 View Students

* Displays all students in a structured table
* Clean and responsive UI using Bootstrap

---

## 🔍 Search

Search students by:

* Name
* Register Number

✔ Case-insensitive filtering
✔ Partial match supported

---

## 🔄 Sorting

Sort records by:

* Name
* Age

---

## 📄 Pagination

* Displays limited records per page
* Navigation using Next & Previous buttons

---

## ✏️ Update Student

* Edit existing student details
* Form auto-filled for easy updates
* Prevents duplicate email & register number

---

## ❌ Delete Student

* Delete student with confirmation prompt

---

## 🎯 Department Filter

Filter students by department:

* IT
* CSE
* ECE

---

## 📤 Export to CSV

Download student data including:

* Name
* Age
* Department
* Email
* Register Number

---

## 🌙 Dark Mode

Toggle between light and dark themes

---

## 🔔 Notifications

* Toast messages for success and error feedback

---

# 🛠️ Tech Stack

## Frontend

* HTML
* CSS (Bootstrap 5)
* JavaScript (Fetch API)

## Backend

* Node.js
* Express.js

## Database

* MongoDB (Mongoose)

---

# 📂 Project Structure

```text
project/
│
├── server.js
├── package.json
├── public/
│   ├── index.html
│   └── app.js
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

---

## 2. Install Dependencies

```bash
npm install express mongoose
```

---

## 3. Start MongoDB

```bash
mongod
```

---

## 4. Run Server

```bash
node server.js
```

---

## 5. Open Application

```text
http://localhost:3000
```

---

# 🔑 Login Credentials

* Username: `admin`
* Password: `1234`

---

# 📡 API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | /api/login        | Admin login       |
| GET    | /api/students     | Get all students  |
| GET    | /api/students/:id | Get student by ID |
| POST   | /api/students     | Create student    |
| PUT    | /api/students/:id | Update student    |
| DELETE | /api/students/:id | Delete student    |

---

# 🧠 Architecture & Design

* REST API architecture
* MVC-like separation:

  * Model (Schema)
  * Service (Business logic)
  * Routes (API layer)

---

# ✅ Validations

* Required field validation
* Email format validation (regex)
* Age must be > 0
* Email must be unique
* Register Number must be **12-digit unique value**

---

# 💡 Key Highlights

* Full CRUD functionality
* Register Number tracking system
* Search by name & register number
* Clean responsive UI
* Pagination for large datasets
* CSV export support
* Dark mode toggle
* Real-time updates without refresh

---

# 🚀 Future Enhancements

* JWT-based authentication
* Role-based access (Admin/User)
* Dashboard with analytics charts
* Cloud deployment (Render / Railway / Vercel)
* Advanced filtering system


# 👩‍💻 Author

**Bhuvanesh S**
B.E. Computer Science Engineering


# 📜 License

This project is developed for educational and learning purposes.

