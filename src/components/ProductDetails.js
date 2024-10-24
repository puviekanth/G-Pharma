import React, { useEffect, useState } from 'react'
import  Navbar  from './NavBar';
import Footer from './Footer';
import Img from './images/Glutanex-Tablets-100.jpeg';
import './ProductDetail.css'
import { faLeanpub } from '@fortawesome/free-brands-svg-icons';
import Banner from './images/BANNER-delivery-full.jpg';
import Product1 from './images/Glutanex-Tablets-100.jpeg'
import Product2 from './images/Eventone-C-Cream-300x300.jpg';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
function ProductDetail(){


    const {id} = useParams();
    
    const [quantity,setQuantity] = useState('');
     // Initialize stock
    const [product,setProduct] = useState([]);

    const [products,setProducts] = useState([]);

    useEffect(() => {
        if (id) { // Check if the id is defined
            axios.get(`http://127.0.0.1:3000/getindividualproduct?id=${id}`)
                .then(res => {
                    if (res.data.error) {
                        console.log(res.data.error);
                    } else {
                        setProduct(res.data);
                        setStock(res.data.quantity); // Update stock from fetched product
                        console.log('Fetched successfully', res.data);
                    }
                })
                .catch(err => {
                    console.log('Error Fetching the product', err);
                });
        } else {
            console.log('No id described');
        }
    }, [id]);

    useEffect(() => {
        if (id) { // Check if the id is defined
            axios.get(`http://127.0.0.1:3000/getrelatedproduct`)
                .then(res => {
                    if (res.data.error) {
                        console.log(res.data.error);
                    } else {
                        setProducts(res.data);
                        console.log('Fetched successfully', res.data);
                    }
                })
                .catch(err => {
                    console.log('Error Fetching the product', err);
                });
        } else {
            console.log('No id described');
        }
    }, []);

    

    


// Function to decrease stock when adding to cart
const handleAddToCartMAIN = (product) => {
    if (stock > 0) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, please login');
            return;
        }
        const userEmail = JSON.parse(atob(token.split('.')[1])).email;
        axios.post('http://127.0.0.1:3000/addtocart', { 
            ProductName: product.name,
            email: userEmail,
            ProductPrice: product.price,
            ProductQuantity: quantity,
            Subtotal: product.price * quantity, // Change this line to multiply by quantity
            Image: product.image
        }, {
            headers: { Authorization: `Bearer ${token}` } // Send the token in the headers
        })
        .then(response => {
            console.log('Added to cart successfully', response);
            handlestockchange(id, quantity);
            setQuantity(1); // Reset the quantity to default value after adding to cart
        })
        .catch(error => {
            console.log('Error adding to cart', error);
        });
    } else {
        console.log("Out of Stock");
    }
};

const handleAddToCart = (product) => {
    if (stock > 0) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, please login');
            return;
        }
        const userEmail = JSON.parse(atob(token.split('.')[1])).email;
        axios.post('http://127.0.0.1:3000/addtocart', { 
            ProductName: product.name,
            email: userEmail,
            ProductPrice: product.price,
            ProductQuantity: 1, // Set to 1 for adding one item
            Subtotal: product.price * 1,
            Image: product.image
        }, {
            headers: { Authorization: `Bearer ${token}` } // Send the token in the headers
        })
        .then(response => {
            console.log('Added to cart successfully', response);
            handleChangequantity(product._id);
            setQuantity(1); // Reset the quantity to default value after adding to cart
        })
        .catch(error => {
            console.log('Error adding to cart', error);
        });
    } else {
        console.log("Out of Stock");
    }
};

const navigate = useNavigate();

const navigatePage = (id) => {
    navigate(`/product/${id}`);
};
    
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

// Get 4 random products from the shuffled array
const randomProducts = shuffleArray(products).slice(0, 4);

const [stock, setStock] = useState();

const handlestockchange = (id, quantity) => {
    axios.put(`http://127.0.0.1:3000/updatestock?id=${id}`, { quantity })
        .then(res => {
            setQuantity(res.data); // Ensure you update with the response data correctly
            console.log('Updated successfully');
        })
        .catch(err => {
            console.log('Error updating the product', err);
        });
};


const handleChangequantity = (id) =>{
    axios.put(`http://127.0.0.1:3000/reduceoneitem?id=${id}`)
    .then(res=>{
        setQuantity(res.data)
        console.log('Updated successfully');
        console.log(stock);
    })
    .catch(err=>{
        console.log('Error updating the product',err);
    })
}



    return(
        <>
        <Navbar />
        
            <section className='prod-ind-page'>
              <div className='pro-with-desc' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <div className='prod-ind-det-del' style={{marginTop:'30px'}}>
               <div className='img-det-cont'>
               <div className='img-det-ind' style={{height:'58vh'}}>
                    <img 
                            src={product.image ? `http://localhost:3000/${product.image.replace(/\\/g, '/')}` : ''} 
                            alt='img' 
                            className='prod-ind-img' 
                    />
                    <div className='prod-ind-details' style={{marginLeft:'10px'}}>
                        <h2 style={{fontSize:'40px', fontWeight:'bold',marginTop:'30px',width:'40vw',marginRight:'20px'}}>{product.name}</h2>
                       <div className='input-btn'>
                       <h6 style={{margin:'10px 0px'}}>Category : <b>{product.category}</b></h6>
                       <h6>Availability : <b>{stock>0 ? 'In Stock':'Out of Stock'}</b></h6>

                       <h3 style={{marginTop:'20px'}}><b>Rs. {product.price} </b></h3>
                       <input 
                       
                        type='number'
                        className='input-qty-prod'
                        value={quantity||1}
                        onChange={(e)=>{setQuantity(e.target.value)}}
                        min={1}
                        disabled={stock<=0}
                        />
                       <button
                        className='btn btn-primary'
                        onClick={() => handleAddToCartMAIN(product)}
                        disabled={stock <= 0}
                    >
                        Add to Cart
                    </button>

                       </div>
                       
                       
                        
                    </div>
                </div>
               
               </div>
               <div className='del-info' style={{height:'58vh',marginTop:'28px'}}>
                   <div className='delivery-prod-info'>
                   <div className='doorstep-delivery' style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px',marginLeft:'20px'}}>
                   <img width="24" height="24" src="https://img.icons8.com/material-two-tone/24/door-to-door-delivery.png" alt="door-to-door-delivery"/>
                   <p style={{marginTop:'15px'}}><b> Doorstep Delivery</b></p>
                   </div>
                   <div className='delivery-fee' style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px',marginLeft:'20px'}}>
                   <img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/cost.png" alt="cost"/>
                   <p style={{marginTop:'5px'}}><b> Delivery Fee</b> :Rs. 600</p>
                   </div>
                   <div className='delivery-duration' style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px',marginLeft:'20px'}}>
                   <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/deliver-food.png" alt="deliver-food"/>
                   <p style={{marginTop:'5px'}}><b> Delivery Duration</b> : 1 Day</p>
                   </div>
                   </div>
                   <div className='warranty-prod-info'>
                   <div className='delivery-return' style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px',marginLeft:'20px'}}>
                   <img width="24px" height="24px" src="https://img.icons8.com/ios-filled/50/replay-10.png" alt="replay-10"/>
                   <p style={{marginTop:'5px'}}><b> 10 Day easy return T&C applies</b></p>
                   </div>
                   <div className='delivery-warranty' style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px',marginLeft:'20px'}}>
                   <img width="24" height="24" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-no-protection-security-tanah-basah-glyph-tanah-basah.png" alt="external-no-protection-security-tanah-basah-glyph-tanah-basah"/>
                   <p style={{marginTop:'5px'}}><b> No warranty available</b></p>
                   </div>
                   </div>
               </div>
               </div>
               <p className='prod-ind-desc' style={{ width:'78vw',backgroundColor:'#fff',padding:'20px',textAlign:'justify',marginTop:'7px',marginLeft:'15px'}}>
                {product.description}
               </p>
              </div>
              
            </section>
            <div className='delivery-banner' style={{marginTop:'40px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src={Banner} alt='Banner' className='banner-img' />
              </div>
            <section className='related-products'>
                <h2>Related Products</h2>
                <div className='container'>
                        {randomProducts.map(prod => (
                             <div className='pro-container' key={prod.id} >

                             <img src={`http://localhost:3000/${prod.image.replace(/\\/g, '/')}`} alt={prod.name} className='pro-image'  onClick={() => navigatePage(prod._id)}/>
                             <h3 className='pro-name' onClick={() => navigatePage(prod._id)}>{prod.name}</h3>
                             <h4 onClick={() => navigatePage(prod._id)}>Rs. {prod.price.toLocaleString()}</h4>
                             <button
                                className='add-to-cart'
                                onClick={() => handleAddToCart(prod)}
                            >
                                Add to Cart
                            </button>

                         </div>
                        ))}
                    </div>
            </section>

        <Footer />
        </>
    )
}

export default ProductDetail; 