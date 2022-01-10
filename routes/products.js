const router = require("express-promise-router")();
const upload = require("../helpers/uploadImg");
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");
router
  .route("/")
  .get(ProductsController.getAllProducts)
  .post(
    checkAuth,
    upload.single("productImage"),
    ProductsController.createProduct
  );

router
  .route("/:productId")
  .get(ProductsController.getProductByID)
  .patch(checkAuth, ProductsController.updateProduct)
  .delete(checkAuth, ProductsController.deleteProduct);

module.exports = router;
