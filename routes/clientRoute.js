const { Router } = require("express");
const { clientController } = require("../controllers/clientController");
const router = Router();

router.get("", (req, res) => res.send("Client Route"));
router.post("/create", clientController.CREATE);
router.post("/getClientsByUserId", clientController.GETCLIENTSBYUSERID);

module.exports = router;
