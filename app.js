const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");

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
app.use("/api/orders", orderRoutes);
app.use("/api/order-details", orderDetailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;
