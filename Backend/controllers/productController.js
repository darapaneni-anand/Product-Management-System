const Product = require('../models/Product')
const mongoose = require('mongoose');

// GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const sortOrder = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : null;
        let query = Product.find();
        if (sortOrder) query = query.sort({ price: sortOrder });
        const products = await query.exec();
        res.json({ success: true, data: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

// POST /api/products
exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, msg: err.message });
    }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, msg: 'Product not found' });
        res.json({ success: true, msg: 'Product deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

// PATCH /api/products/:id
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, msg: 'Invalid product ID' });
        }

        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, msg: 'Product not found' });
        res.json({ success: true, data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};
