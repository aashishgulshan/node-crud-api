const express = require("express");
const fs = require("fs");
const path = require("path"); // Import the 'path' module
const users = require("./data/MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Route
app.get("/", (req, res) => {
  return res.json("API is Working fine!");
});
// Authentication middleware
function authenticateUser(username, password) {
  const user = users.find(
    (user) => user.user_name === username && user.password === password
  );
  return user;
}

// authentication
app.get("/api/protected", (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res
      .status(401)
      .json({ error: "Authentication credentials not provided." });
  }

  const authenticatedUser = authenticateUser(username, password);

  if (!authenticatedUser) {
    return res.status(401).json({ error: "Authentication failed." });
  }

  return res.json({ message: "Authenticated!", user: authenticatedUser });
});

// Return HTML list of All Users
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  return res.send(html);
});

// Return JSON data of all users
app.get("/api/users", (req, res) => {
  return res.json(users);
});


app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile(
    path.join(__dirname, "data/MOCK_DATA.json"),
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to save user data." });
      }
      return res.json({ status: "Success", id: users.length });
    }
  );
});

// updat Exist data

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updateData = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const updatedUser = { ...users[userIndex], ...updateData };
  users[userIndex] = updatedUser;

  fs.writeFile(
    path.join(__dirname, "data/MOCK_DATA.json"),
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to update user data." });
      }
      return res.json({ status: "Success", user: updatedUser });
    }
  );
});

// delete Data

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = users.splice(userIndex, 1)[0];

  // updated user data
  fs.writeFile(
    path.join(__dirname, "data/MOCK_DATA.json"),
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to delete user data." });
      }
      return res.json({
        status: "Success",
        message: "User deleted",
        user: deletedUser,
      });
    }
  );
});

// Route for initiating the forgot password process
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  
  return res.json({ message: "Reset token sent.", user });
});

// Route for resetting password using the reset token
app.post("/api/reset-password", (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  if (!email || !resetToken || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email, reset token, and new password are required." });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }


  user.password = newPassword;

  // updated user data
  fs.writeFile(
    path.join(__dirname, "data/MOCK_DATA.json"),
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ status: "Error", message: "Failed to update user data." });
      }
      return res.json({
        status: "Success",
        message: "Password reset successful.",
      });
    }
  );
});

// Catch-all route for wrong API URLs
app.get("/api/*", (req, res) => {
  return res.json("Please Input Correct URL...!");
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
