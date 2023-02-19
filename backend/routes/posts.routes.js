const express = require("express");
const controller = require("../controllers/posts.controller");
const router = express.Router();

router.get("/", controller.getPosts);
router.get("/:id", controller.getById);
router.put("/:id", controller.deleteById);
router.post("/new-post", controller.addPost);
router.patch("/:id", controller.updatePost);

module.exports = router;
