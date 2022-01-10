const productRoutes = require("./products");
const orderRoutes = require("./orders");
const userRoutes = require("./user");
function route(app) {
  app.use("/products", productRoutes);
  app.use("/orders", orderRoutes);
  app.use("/user", userRoutes);
}

module.exports = route;
