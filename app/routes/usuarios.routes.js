import express from "express";
import {
    getUsuarios,
    addUsuarios,
    editUsuarios,
    deleteUsuarios,
    getUsuariosByEmail,
} from "../controllers/usuarios.controller.js";


const router = express.Router();

router.get("/", getUsuarios);
router.get("/email/:email", getUsuariosByEmail);
router.post("/", addUsuarios);
router.put("/:id", editUsuarios);
router.delete("/:id", deleteUsuarios);

export default router;