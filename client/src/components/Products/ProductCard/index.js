import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { idbPromise } from "../../../utils/helpers";
import "./style.css";

function ProductCard({ product }) {
  const { name: category } = product.category;
  const {
    _id,
    description,
    inventory,
    mainImage,
    name,
    price,
    promotionPrice,
    rating,
  } = product;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addItemToCart = (quantity) => {
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
  };

  function percentDifference(price, percentDifference) {
    const percent = price - percentDifference / price * 100;

    return (
      Math.abs(percent.toFixed(2))
    );
  }

  return (
    <div className="pc-container mb-4 d-sm-flex flex-xl-column p-md-2">
      <Link to={`/product/${_id}`} className="me-md-3 me-xl-0">
        <img
          className="pc-image mb-xl-2"
          src={mainImage}
          alt={`${name} ${category} ${mainImage}`}
        />
      </Link>
      <div className="pc-details">
        <Link to={`/product/${_id}`} className="pc-title">
          {name}
        </Link>
        <div>
          <div className="pc-priceblock">
            {promotionPrice === price ?
              <div className="pc-price font-weight-bold bolden">${price}</div>
              :
              <>
                <div className="d-xs-column d-md-flex">
                  <div className="pc-price text-decoration-line-through me-2">${price}</div>
                  <div className="pc-price pc-promoprice">
                    <div className="d-sm-column d-md-flex">
                      <div>
                        <span className="bolden me-1">${promotionPrice}</span>
                      </div>
                      <div>
                        ({percentDifference(price, promotionPrice)} % off)
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>

          <div>Rating: {rating}</div>
          <div>
            {inventory <= 0 ? (
              <button className="addtocart-unavailable mt-2" disabled>
                Unavailable
              </button>
            ) : (
              <button className="addtocart mt-2" onClick={() => addItemToCart(1)}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
