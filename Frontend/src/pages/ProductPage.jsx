import './ProductPage.css'
import { useEffect, useState } from 'react'
import api from '../services/api.js';
import '../App.css';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProductById() {
            try {
                const response = await api.get(`/products/read-product/${id}`);
                console.log("Product data from DB:", response.data);
                setProduct(response.data);
            } catch (err) {
                console.error("Eroor loading product", err);
            }
        }
        fetchProductById();
    }, [id]);
    
    if (!product) return <div>Loading...</div>;

    // const Flex = () => {
    return (
    //   <view
    //     style={[
    //       styles.container,
    //       {
    //         flexDirection: 'culomn',
    //       },
    //     ]}>
    //       <view style={{flex: 1, backgroundColor: 'red'}} />
          
      
      
    //   >

      // </view>
        <div className="product-page">   
          <div className="product-container">
            <img className="product-image" src='https://www.jiomart.com/images/product/original/590000454/banana-robusta-1-kg-product-images-o590000454-p590000454-0-202410011654.jpg?im=Resize=(1000,1000)' alt='Banana'/>
              <div className="product-details">
                <h1>{product.name}</h1>
                <p><strong>קטגוריה:</strong> {product.category}</p>
                <p><strong>מחיר:</strong> {product.price}</p>
                <p>{product.description}</p>
                <button className="buy-button">הוסף לעגלה</button>
              </div>
          </div>
        </div>
    );
  // };
};