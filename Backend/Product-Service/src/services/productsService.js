// products-service/src/services/productsService.js

import { Products } from '../data-access/productsModel.js';

export const productsService = {
  async fetchAllProducts() {
    try {
      const products = await Products.findAll();
      return products;
    } catch (err) {
      console.error('Error fetching products:', err);
      throw new Error('Failed to fetch products');
    }
  }
};
