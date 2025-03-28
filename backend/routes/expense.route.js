import express from "express";
import { addExpense, updateExpense, removeExpense, getAllExpenses, markAsDoneOrUndone } from "../controllers/expense.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/add").post(isAuthenticated,addExpense);
router.route("/getall").get(isAuthenticated,getAllExpenses);
router.route("/remove/:id").delete(isAuthenticated,removeExpense);
router.route("/update/:id").put(isAuthenticated,updateExpense);
router.route("/:id/done").put(isAuthenticated,markAsDoneOrUndone);

export default router;