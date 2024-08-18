import React,{useState} from 'react'
import Navbar from './NavBar';
import Footer from './Footer';
import Product1 from './images/Glutanex-Tablets-100.jpeg'
import Img2 from './images/glutanex-1.jpg'
import Img3 from './images/glutathione.jpg'
import Img4 from'./images/img3.jpg'
import './individual.css'

function Individual(){
    const [mainImage, setMainImage] = useState(Product1);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Glutanex Tablets - 100g', price: 5000, quantity: 1, image: Product1 }
       
    ]);
    const[quantity,setQuantity] = useState('');
    const [errors, setErrors] = useState({});
    const validateForm=()=> {
        const newErrors={};
        if(!quantity){
            newErrors.quantity='Please select a valid quantity';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Quantity:', quantity);
            
        }
    };

    return(

        <>
        <Navbar/>
        <section className='details-with-img'>
            <div className='imgs'>
                <div className='single-image'>
                    <img src={mainImage} alt='' className='main-img'></img>
                </div>
                <div className='other-imgs'>
                <div><img src={Img2} alt='' className='sub-img' onClick={() => setMainImage(Img2)}></img></div>
                <div><img src={Img3} alt='' className='sub-img' onClick={() => setMainImage(Img3)}></img></div>
                <div><img src={Img4} alt='' className='sub-img' onClick={() => setMainImage(Img4)}></img></div>
                </div>
            </div>
            <div className='content'>
            {cartItems.map((item, index) => (
                <form className='prod-details-form'>
                
                    <h1>{item.name}</h1>
                    <h3>{item.price.toLocaleString()}</h3>
                    <input type='number' className='qty-input' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                    <button className='add-to-cart' onClick={handleSubmit}>Add to Cart</button>
               
                </form>
                 ))}
            </div>
            </section>
        <Footer/>
        </>
    );
}
export default Individual;