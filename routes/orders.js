const router = require("express-promise-router")();
const checkAuth = require("../middleware/check-auth");

const OrdersController = require("../controllers/orders");
router
  .route("/")
  .get(OrdersController.getAllOrders)
  .post(checkAuth, OrdersController.createOrder);

router
  .route("/:orderId")
  .get(OrdersController.getOrderByID)
  .delete(checkAuth, OrdersController.deleteOrder);

module.exports = router;
