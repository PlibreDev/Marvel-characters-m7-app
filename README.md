# Marvel Characters Project

A full-stack web application for managing and viewing Marvel (and other comic) characters. Built with React (frontend), Flask (backend), and MySQL (database).

---

## Features

- View, create, edit, and delete comic characters
- Flip card UI with character details and image
- Character alignment (Hero/Villain) filtering
- Image suggestions for new characters
- Responsive, modern UI with React-Bootstrap

---

## Installation & Setup

### 1. Clone the Repository

Open **Command Prompt** and run:

```
git clone https://github.com/yourusername/marvel-characters-project.git
cd marvel-characters-project\m7project
```

---

### 2. MySQL Setup

- **If you do not have MySQL installed:**
  1. Download and install MySQL Community Server from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
  2. During installation, set a root password (remember this for later).
  3. Start the MySQL server (it usually starts automatically).

- **Create a database user and database (optional):**
  - Open the MySQL Command Line Client and run:
    ```
    CREATE DATABASE marvel;
    CREATE USER 'root'@'localhost' IDENTIFIED BY 'yourpassword';
    GRANT ALL PRIVILEGES ON marvel.* TO 'root'@'localhost';
    FLUSH PRIVILEGES;
    ```
  - Replace `'yourpassword'` with your chosen password.

---

### 3. Backend Setup (Flask + MySQL)

#### a. Install Python dependencies

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

#### b. Configure MySQL Connection

- Open `backend\server.py`
- Update the MySQL connection string:
  ```
  mysql+mysqlconnector://root:yourpassword@localhost
  ```
  Replace `yourpassword` with your MySQL root password.

#### c. Run the Flask server

```
python server.py
```

The backend will run on [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

### 4. Frontend Setup (React)

```
cd ..\frontend
npm install
```

#### a. Start the React app

```
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Visit [http://localhost:3000](http://localhost:3000) in your browser.**
2. Use the navigation bar to:
   - View all character cards
   - Create a new character (with image suggestions)
   - Manage (edit/delete) existing characters
3. Flip cards to see more details, or click "View Details" for a modal popup.
4. Edit or delete characters from the Manage Characters page.

---

## Project Structure

```
m7project/
  backend/         # Flask API and database models
  frontend/        # React app (src/, public/, etc.)
```

---

## Notes

- **Images:** You can use direct image URLs from Wikimedia, Wikia, or upload your own to the `public` folder.
- **Database:** The app will auto-create the database and tables if they don't exist.
- **Environment:** Tested on Windows with Python 3.10+ and Node.js 18+.

---

## Troubleshooting

- If you see CORS or network errors, make sure both backend and frontend are running.
- If images do not display, check that the `image_url` is a direct link to an image file.
- If you change the database connection, restart the Flask server.

---

## License

This project is for educational purposes.

---

## Credits

- Marvel and DC character images and names are property of their respective owners.
- Images used from Wikimedia Commons and Fandom for demonstration purposes.
