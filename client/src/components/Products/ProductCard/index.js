import React from "react";
import ReactStars from "react-stars";
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

  const { name: category } = product.category;
  const percentage = product?.promotion?.percentage;
  const ends = product?.promotion?.ends;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

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
    <div className="pc-container mb-4 flex-xl-column p-md-2">
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
                onClick={() => addItemToCart(1)}
              >
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
