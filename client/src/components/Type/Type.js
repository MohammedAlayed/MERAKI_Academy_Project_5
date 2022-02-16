import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Type.css";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import { addcart } from "../../reducer/cart/carts";

const Type = () => {
  const dispatch = useDispatch();
  const { brand } = useParams();
  const [elementId, setElementId] = useState([]);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const state = useSelector((state) => {
    return { token: state.loginReducer.token };
  });

  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getByType();
  }, []);

  const { type } = useParams();

  const getByType = () => {
    axios

      .get(`/products/type/${type}`)
      .then((result) => {
        setProducts(result.data.products);
        setShow(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  //============================
  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    let quantity = 1;
    await axios.post(`/carts/${id}`, { quantity }, { headers }).then((res) => {
      dispatch(addcart(res.data.result));
    });
  };
  //============================
  const addToWishList = async (id) => {
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

  const handlecolor = (element) => {
    setElementId([...elementId, element.id]);
  };
  //============================
  return (
    <>
      <div className="header">
        <div className="laptop-brand">
          {type === "Laptop" ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Dell`);
                }}
              >
                Dell
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/HP`);
                }}
              >
                HP
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Lenovo`);
                }}
              >
                Lenovo
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
          {type === "Mobile" ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Apple`);
                }}
              >
                Apple
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Samsung`);
                }}
              >
                Samsung
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Huawei`);
                }}
              >
                Huawei
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
          {type === "TV" ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/LG`);
                }}
              >
                LG
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Sony`);
                }}
              >
                Sony
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/TCL`);
                }}
              >
                TCL
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}

          {type === "Watch" ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Rolex`);
                }}
              >
                Rolex
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Omega`);
                }}
              >
                Omega
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Blancpain`);
                }}
              >
                Blancpain
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
          {type === "Camera" ? (
            <>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Canon`);
                }}
              >
                Canon
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/Nikon`);
                }}
              >
                Nikon
              </span>
              <span
                className="linkSize"
                onClick={() => {
                  navigate(`/brand/DJI`);
                }}
              >
                DJI
              </span>
              <a href="#hidden" className="linkSizeArrow">
                <TiArrowBackOutline
                  size={25}
                  onClick={() => {
                    navigate(`/home`);
                  }}
                />
              </a>
            </>
          ) : (
            <></>
          )}
        </div>

        <div>
          <div className="products">
            {show &&
              products.map((element) => {
                return (
                  <div>
                    <div class="container page-wrapper">
                      <div class="page-inner">
                        <div class="row">
                          <div class="el-wrapper">
                            <div class="box-up">
                              <img
                                class="imgProduct"
                                src={element.image}
                                onClick={() => {
                                  navigate(`/products/${element.id}`);
                                  window.scrollTo(0, 0);
                                }}
                                alt=""
                              />
                              <div class="img-info">
                                <div class="info-inner">
                                  <span
                                    className="add "
                                    onClick={() => {
                                      addToWishList(element.id);
                                    }}
                                  >
                                    {elementId.includes(element.id) ? (
                                      <BsHeart
                                        className="t1"
                                        onClick={() => {
                                          Swal.fire({
                                            icon: "success",
                                            title: "Your work has been saved",
                                            showConfirmButton: false,
                                            timer: 1500,
                                          });

                                          handlecolor(element);
                                        }}
                                        style={{ color: "red" }}
                                      />
                                    ) : (
                                      <BsHeart
                                        className="t1"
                                        id={element.id}
                                        onClick={() => {
                                          handlecolor(element);
                                        }}
                                      />
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div class="box-down">
                              <div class="h-bg">
                                <div class="h-bg-inner"></div>
                              </div>

                              <a class="cart h-bg">
                                <span class="price">{element.price}$</span>

                                <span class="p-name padName">
                                  <span
                                    class="txt"
                                    onClick={() => {
                                      Swal.fire({
                                        icon: "success",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500,
                                      });

                                      addToCart(element.id);
                                    }}
                                  >
                                    <BsCartPlus
                                      size={29}
                                      className="addToIcon"
                                    />
                                  </span>
                                  <span class="add-to-cart">
                                    {element.name}
                                  </span>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Type;
