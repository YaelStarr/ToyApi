const express = require("express");
const { getToys,getToyById,searchToysByCategory,searchToyByNameOrInfo,addNewToy,deleteToy,editToy} = require("../controllers/toys.controller");
const { auth, authNoPermistion } = require("../middlewares/auth");
const router = express.Router();

// roles=['admin', 'user'];

// crud => 
router.get("/", getToys);
// router.get("", getToysByPrice);
router.get("/search", searchToyByNameOrInfo);
router.get("/category/:catName", searchToysByCategory);
router.get("/single/:id", getToyById);

router.post("/", auth(), addNewToy);
router.put("/:editId", auth(), editToy);
router.delete("/:delId", auth(), deleteToy);


module.exports = router;

