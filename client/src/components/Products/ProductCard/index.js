import { useState } from "react";
import ReactStars from "react-stars";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { idbPromise, effectivePromotion } from "../../../utils/helpers";

function ProductCard({ product }) {
  const {
    _id,
    inventory,
    mainImage,
    name,
    price,
    promotion,
    promotionPrice,
    rating,
  } = product;

  const { name: category } = product?.category || "Uncategorized";
  const percentage = product?.promotion?.percentage;
  const ends = product?.promotion?.ends;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);

  function addItemToCart(quantity) {
    const itemInCart = cartItems.find((item) => item._id === _id);

    dispatch(addToCart({ product, purchaseQuantity: quantity, _id }));

    if (itemInCart) {
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
    } else {
      idbPromise("cart", "put", {
        product,
        purchaseQuantity: quantity,
        _id,
      });
    }
  }

  return (
    <>
      <ToastContainer style={{ position: "fixed", top: 0, right: 0 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <ToastHeader className="justify-content-between me-2">
            <Toast.Body>{name} added to cart!</Toast.Body>
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <div className="pc-container d-flex flex-sm-nowrap flex-md-wrap">
        <Link to={`/product/${_id}`} className="me-md-3 me-xl-0 mb-2 box">
          <img
            className="pc-image"
            src={mainImage}
            alt={`${name} ${category} ${mainImage}`}
          />
        </Link>
        <div className="pc-details ms-3 ms-md-0">
          <Link to={`/product/${_id}`} className="pc-title">
            {name}
          </Link>
          <div>
            <div className="pc-priceblock">
              {effectivePromotion(promotion, ends) === false ? (
                <div className="pc-price font-weight-bold bolden">${price}</div>
              ) : (
                <>
                  <div className="d-flex">
                    <div className="pc-price text-decoration-line-through me-2">
                      ${price}
                    </div>
                    <div className="pc-price pc-promoprice">
                      <div className="d-flex">
                        <div>
                          <span className="bolden me-1">${promotionPrice}</span>
                        </div>
                        <div>({percentage}% off)</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              <ReactStars
                count={5}
                value={rating}
                size={18}
                edit={false}
                color2={"#7f60db"}
                color1={"#e3e3e3"}
              />
            </div>
            <div>
              {inventory <= 0 ? (
                <button className="addtocart-unavailable mt-2" disabled>
                  Unavailable
                </button>
              ) : (
                <button
                  className="addtocart mt-2"
                  onClick={() => {
                    addItemToCart(1);
                    setShow(true);
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
