// products-service/src/services/productsService.js

import { Products } from '../data-access/productsModel.js';
import { ProductsImages } from '../data-access/productsImagesModel.js';

export const productsService = {
  async createProduct(productData) {
    try {
      const {
        name,
        category,
        description,
        price,
        datasheet_url,
        image_url,
        extra_images = [],
      } = productData;

      console.log('from service', productData);

      const newProduct = await Products.create({
        name: name || null,
        category: category || null,
        description: description || null,
        price: price || null,
        datasheet_url: datasheet_url || null,
        image_url: image_url || null,
      });

      for (const url of extra_images) {
        await ProductsImages.create({
          product_id: newProduct.id,
          image_url: url,
        });
      }

      return newProduct;
    } catch (err) {
      console.error('Error creating product:', err);
      throw new Error('Failed to create product');
    }
  },

  async updateProductById(productId, updateData) {
    try {
      const [updatedRows] = await Products.update(updateData, {
        where: { id: productId },
      });
      if (updatedRows === 0) {
        throw new Error('Product not found or no changes made');
      }
      return await Products.findByPk(productId);
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error('Failed to update product');
    }
  },

  async deleteProductById(productId) {
    try {
      const deletedRows = await Products.destroy({
        where: { id: productId },
      });
      if (deletedRows === 0) {
        throw new Error('Product not found');
      }
      return { message: 'Product deleted successfully' };
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error('Failed to delete product');
    }
  },

  async fetchProductById(productId) {
    try {
      const product = await Products.findByPk(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      throw new Error('Failed to fetch product');
    }
  },

  async fetchAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      throw new Error('Failed to fetch products');
    }
  },
};
