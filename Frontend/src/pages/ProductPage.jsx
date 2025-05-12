import './ProductPage.css'
import { useEffect, useState } from 'react'
import api from '../services/api.js';
import '../App.css';
import { useParams } from 'react-router-dom';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    // useEffect(() => {
    //     async function fetchProducts() {
    //         try {
    //             const response = await api.get(`/products/${productId}`);
    //             console.log("Product data from DB:", response.data);
    //             setProduct(response.data);
    //         } catch (err) {
    //             console.error("Eroor loading product", err);
    //         }
    //     }
    //     fetchProducts();
    // }, [productId]);
    
    // if (!product) return <div>Loading...</div>;

    // const Flex = () => {
    // return (
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
                <h1>Banana</h1>
                <p><strong>קטגוריה:</strong> Fruites</p>
                <p><strong>מחיר:</strong> ₪84</p>
                <p>The biggest banana in the world</p>
                <button className="buy-button">הוסף לעגלה</button>
              </div>
          </div>
        </div>
    );
  };
}