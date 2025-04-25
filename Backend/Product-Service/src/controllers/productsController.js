import { productsService } from '../services/productsService.js';
import { Products } from '../data-access/productsModel.js';

export const updateProduct = async (req, res) => {
  try {
    res.status(200).json('update products controller');
  } catch (error) {
    res
      .status(500)
      .json({ error: 'error from update function', details: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    res.status(200).json('delete products controller');
  } catch (error) {
    res
      .status(500)
      .json({ error: 'error from delete function', details: error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category } = req.body;

    const newProduct = await Products.create({
      name: name || null,
      category: category || null, 
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res
      .status(500)
      .json({ message: 'Error creating product', details: error.message });
  }
};

export const readAllProducts = async (req, res) => {
  try {
    const products = await productsService.fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching all products', details: error.message });
  }
};

export const readProduct = async (req, res) => {
  try {
    res.status(200).json('read product controller');
  } catch (error) {
    res.status(500).json({ error: 'error from read function', details: error });
  }
};
