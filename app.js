const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API is running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
