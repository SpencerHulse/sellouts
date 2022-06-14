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
    const percent = price-percentDifference/price*100;
    return (
      percent.toFixed(2)
    );
  }

  return (
    <div className="pc-container">
      <Link to={`/product/${_id}`}>
        <img
          className="pc-image"
          src={mainImage}
          alt={`${name} ${category} ${mainImage}`}
        />
      </Link>
      <div>
        <div className="pc-category">
          {category}
        </div>
        <Link to={`/product/${_id}`} className="pc-title">
          {name}
        </Link>
        <div>
          <div className="pc-priceblock">
            {promotionPrice === price ?
              <div className="pc-price font-weight-bold bolden">${price}</div>
              
              :
              <>
                <div className="pc-price pc-promoprice"><span className="bolden">${promotionPrice}</span>{" "}
                ({percentDifference(price, promotionPrice)} % off)
                </div>
                <div className="pc-price text-decoration-line-through">${price}</div>
              </>
            }
          </div>

          <div>Rating: {rating}</div>
          {inventory <= 0 ? (
            <button className="" disabled>
              Unavailable
            </button>
          ) : (
            <button className="" onClick={() => addItemToCart(1)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
