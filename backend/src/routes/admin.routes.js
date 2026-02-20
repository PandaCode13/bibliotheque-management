const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/dashboard-stats", adminController.getDashboardStats);
router.get("/monthly-books", async (req, res) => {
    try {
        const monthlyBooks = await adminController.getMonthlyBooks();
        res.json(monthlyBooks);
    } catch (error) {
        console.error("Error fetching monthly books:", error);
        res.status(500).json({ error: "Failed to fetch monthly books" });
    }   
});

module.exports = router;
