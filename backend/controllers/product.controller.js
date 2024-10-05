import mongoose from 'mongoose';
import Product from '../models/product.model.js';

//@desc     Get all products
//@route    GET /api/products

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//@desc     Create new product
//@route    CREATE /api/products

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter all fields' });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//@desc     Update product
//@route    UPDATE /api/products/:id

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No product with that id');
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//@desc     Delete product
//@route    DELETE /api/products/:id

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No product with that id');
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
