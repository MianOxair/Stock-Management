const { json } = require("express");
const express = require("express");
const router = express.Router();
const stockManagement = require("../models/stockManagement.model");

// Getting All
router.get("/", async (req, res) => {
  try {
    const stocks = await stockManagement.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one
router.get("/:id", middleware, (req, res) => {
  res.send(res.stock);
});

// Creating One
router.post("/", async (req, res) => {
  try {
    const stock = new stockManagement({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// updating one
router.patch("/:id", middleware, async (req, res) => {
  try {
    if (req.body.name != null) {
      res.stock.name = req.body.name;
    }
    if (req.body.description != null) {
      res.stock.description = req.body.description;
    }
    if (req.body.quantity != null) {
      res.stock.quantity = Number(req.body.quantity);
    }
    if (req.body.price != null) {
      res.stock.price = Number(req.body.price);
    }
    if (req.body.category != null) {
      res.stock.category = req.body.category;
    }
    if (req.body.image != null) {
      res.stock.image = req.body.image;
    }

    res.stock.UpdatedDate = Date.now();
    const updateStock = await res.stock.save();

    res.json(updateStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete one
router.delete("/:id", middleware, async (req, res) => {
  try {
    await res.stock.remove();
    res.json({ message: `Deleted Stock ${res.stock.name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function middleware(req, res, next) {
  let stock;
  try {
    console.log(`req.params.id:${req.params.id}`);
    stock = await stockManagement.findById(req.params.id);
    console.log(`stock${JSON.stringify(stock)}`);
    if (stock == null) {
      res.status(404).json({ message: "Can't find the stock by id." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.stock = stock;
  next();
}

module.exports = router;
