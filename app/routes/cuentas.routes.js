import express from "express";
import { getCuentas, addCuentas } from "../controllers/cuentas.controller.js";

const router = express.Router();

router.get("/", getCuentas);
router.post("/", addCuentas);

export default router;
