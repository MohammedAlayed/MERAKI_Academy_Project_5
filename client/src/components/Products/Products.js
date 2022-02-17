import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setproducts,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import {  useNavigate, useParams } from "react-router-dom";
import "./Products.css";
import Comment from "./Comment";
import Rating from "./Rating";
import Swal from "sweetalert2";
import { BsHeart } from "react-icons/bs";
import { addcart } from "../../reducer/cart/carts";

const Products = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [elementId, setElementId] = useState([]);

  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);
  const [message, setMessage] = useState("");

  // const [id,setId]=useState("")
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //getproductById

  const { id } = useParams();

  const getproductById = async () => {
    await axios
      .get(`/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        dispatch(setproducts(res.data.products));
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getproductById();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////



  const addToWishList = async (id) => {
    console.log(state.token);
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios
      .post(`/wishList/${id}`, {}, { headers })
      .then((res) => {
        setMessage(res.data.massage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    console.log(headers);
    let quantity = 1;
    await axios.post(`/carts/${id}`, { quantity }, { headers }).then((res) => {
      dispatch(addcart(res.data.result));
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////
  const handleUpdateClick = (product) => {
    setUpdateBox(!updateBox);
    setProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setBrand(product.brand);
    setType(product.type);
    setPrice(product.price);
    setElementId([...elementId, product.id]);

    if (updateBox) updateProduct(product.id);
  };

  const updateProduct = async (id) => {
    const body = {
      name,
      type,
      brand,
      description,
      price,
    };

    try {
      await axios.put(`/products/${id}`, body);
      dispatch(updateproductById(body));
      getproductById();
    } catch (error) {
      throw error;
    }
  };
  const handlecolor = (element) => {
    setElementId([...elementId, element.id]);
  };
  return (
    <div>
      <div className="gridProduct">
        <div>
          {state.products.map((product, index) => {
            return (
              <div>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div id="container">
                  <div class="product-details">
                    <h1>{product.name}</h1>

                    <span className=" addTo">
                      {" "}
                      {elementId.includes(product.id) ? (
                        <BsHeart
                          width={30}
                          onClick={() => {
                            addToWishList(product.id)
                            handleUpdateClick(product);
                          }}
                          style={{ color: "red" }}
                        />
                      ) : (
                        <BsHeart
                          size={30}
                          id={product.id}
                          onClick={() => {
                            addToWishList(product.id)
                            handleUpdateClick(product);
                          }}
                          style={{ color: "black" }}
                        />
                      )}
                    </span>
                    <br />
                    <span class="hint-star star">
                      <Rating />
                    </span>

                    <p class="information">{product.description}</p>

                    <div class="control">
                      <button class="btn">
                        <span class="price">{"$" + product.price}</span>
                        <span class="shopping-cart">
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </span>
                        <span
                          class="buy"
                          onClick={() => {
                            Swal.fire({
                              icon: "success",
                              title: "Your work has been saved",
                              showConfirmButton: false,
                              timer: 1500,
                            });

                            addToCart(product.id);
                          }}
                        >
                          add to cart
                        </span>
                      </button>
                    </div>
                  </div>

                  <div class="product-image">
                    <img src={product.image} alt="" />

                    <div class="info">
                      <h2> Detailes</h2>
                      <ul>
                        <li>
                          <strong>Brand : </strong>
                          {product.brand}{" "}
                        </li>
                        <li>
                          <strong>Type : </strong>
                          {product.type}
                        </li>
                        <li>
                          <strong>Price: </strong>
                          {product.price}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
             
            );
          })}
        </div>
        <div className="paddBIgDiv">
          {" "}
          <Comment id={id} />
        </div>
      </div>
    </div>
  );
};

export default Products;