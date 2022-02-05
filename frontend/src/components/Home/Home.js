import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css"
import { setproducts, addproduct, updateproductById, deleteProductById } from "../../reducer/products";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../reducer/login";


////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home
const Home = () => {
    const [message, setMessage] = useState("")

    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return { token: state.loginReducer.token, products: state.productsReducer.products, isLoggedIn: state.loginReducer.isLoggedIn };

    })


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //  getAllProducts

    const getAllProducts = async () => {
        await axios
            .get("http://localhost:5000/products")
            .then((res) => {
                dispatch(setproducts(res.data.result))

                setShow(true)
            })
            .catch((err) => {
                throw err
            });
    };



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //   

    const addToCart = async (id) => {
        const headers = {
            Authorization: `Bearer ${state.token}`,
        };
        let quantity = 1;
        await axios.post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
            .then((res) => {
                setMessage(res.data.massage)
            })
    }
    //=====================================================
    const addToWishList = async (id) => {
        console.log(state.token);
        const headers = {
            Authorization: `Bearer ${state.token}`,
        };

        await axios.post(`http://localhost:5000/wishList/${id}`, {},{ headers })
            .then((res) => {
                setMessage(res.data.massage)
            })
            .catch(err => {
                console.log(err);
            })
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        getAllProducts();
      }, []);




    return (<div>

        <div>
            <select className="selecttype" onChange={(e) => {
                navigate(`/type/${e.target.value}`)

            }

            }>
                <option value="All" >All</option>
                <option value="apple">apple</option>
                <option value="samsung" >samsung</option>
                <option value="laptop" >laptop</option>


            </select>
        </div>
        <div className="products">
            {
                show && state.products.map((product, index) => {
                    return <div key={index}  >
                        <div className="product">
                        <img onClick={() => navigate(`/products/${product.id}`)} src={product.image} alt=""/>
                            <p>name:{product.name}</p>
                            <p>price:{product.price}</p>
                            <div className="twoButton">
                            <button className="add" onClick={() => { addToCart(product.id) }}>add to cart</button>
                            <button className="add" onClick={() => { addToWishList(product.id) }} >add to wishList</button>
                            </div>
                        </div><br />
                    </div>

                })
            }
        </div>

        {/* <button onClick={
            getAllProducts
        }>test</button> */}
    </div>)
};

export default Home;
