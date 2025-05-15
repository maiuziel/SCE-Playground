const products = [
  {
    name: 'Product 1',
    category: 'Category A',
    description: 'Description for product 1',
    price: 29.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 2',
    category: 'Category B',
    description: 'Description for product 2',
    price: 49.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 3',
    category: 'Category C',
    description: 'Description for product 3',
    price: 39.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 4',
    category: 'Category A',
    description: 'Description for product 4',
    price: 24.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 5',
    category: 'Category B',
    description: 'Description for product 5',
    price: 19.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 6',
    category: 'Category A',
    description: 'Description for product 6',
    price: 99.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 7',
    category: 'Category C',
    description: 'Description for product 7',
    price: 79.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 8',
    category: 'Category B',
    description: 'Description for product 8',
    price: 15.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 9',
    category: 'Category A',
    description: 'Description for product 9',
    price: 59.99,
    datasheet_url: null,
    image_url:
      'https://d8iqbmvu05s9c.cloudfront.net/7apfus2bfyjjln8y3i1oy70pqhg4',
  },
  {
    name: 'Product 10',
    category: 'Category C',
    description: 'Description for product 10',
    price: 34.99,
    datasheet_url: null,
    image_url:
      'https://d8iqbmvu05s9c.cloudfront.net/7apfus2bfyjjln8y3i1oy70pqhg4',
  },
  {
    name: 'Product 11',
    category: 'Category B',
    description: 'Description for product 11',
    price: 18.99,
    datasheet_url: null,
    image_url:
      'https://d8iqbmvu05s9c.cloudfront.net/7apfus2bfyjjln8y3i1oy70pqhg4',
  },
  {
    name: 'Product 12',
    category: 'Category A',
    description: 'Description for product 12',
    price: 85.99,
    datasheet_url: null,
    image_url:
      'https://d8iqbmvu05s9c.cloudfront.net/7apfus2bfyjjln8y3i1oy70pqhg4',
  },
  {
    name: 'Product 13',
    category: 'Category C',
    description: 'Description for product 13',
    price: 69.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 14',
    category: 'Category A',
    description: 'Description for product 14',
    price: 22.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 15',
    category: 'Category B',
    description: 'Description for product 15',
    price: 12.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 16',
    category: 'Category C',
    description: 'Description for product 16',
    price: 45.99,
    datasheet_url: null,
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtr4f3qHqC8PrmIFt5qeUCY8kL7cR10Ldskw&s',
  },
  {
    name: 'Product 17',
    category: 'Category A',
    description: 'Description for product 17',
    price: 55.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 18',
    category: 'Category B',
    description: 'Description for product 18',
    price: 77.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 19',
    category: 'Category C',
    description: 'Description for product 19',
    price: 27.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
  {
    name: 'Product 20',
    category: 'Category A',
    description: 'Description for product 20',
    price: 19.99,
    datasheet_url: null,
    image_url:
      'https://www.chrisstewart.ca/wp-content/uploads/2022/06/Atlassian-Confluence.jpg',
  },
];

export default products;
