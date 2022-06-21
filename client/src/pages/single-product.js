import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-stars";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/Reviews";
import { updateProducts } from "../redux/features/productSlice";
import { addToCart } from "../redux/features/cartSlice";
import { QUERY_PRODUCTS } from "../graphql/queries";
import { effectivePromotion, idbPromise } from "../utils/helpers";
import Auth from "../utils/auth";

function SingleProduct() {
  // Sets up for dispatch and gets all products and items in the cart from state
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  // Holds the current product object
  const [currentProduct, setCurrentProduct] = useState("");
  // Gets the product ID
  const { productId } = useParams();

  // Used to query the database if the products are not stored in state (such as a direct page load)
  const [getData, { data }] = useLazyQuery(QUERY_PRODUCTS);

  // Function for adding items to the cart
  function addItemToCart(quantity) {
    const itemInCart = cartItems.find(
      (item) => item._id === currentProduct._id
    );

    dispatch(
      addToCart({
        product: currentProduct,
        purchaseQuantity: quantity,
        _id: currentProduct._id,
      })
    );

    if (itemInCart) {
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
    } else {
      idbPromise("cart", "put", {
        product: currentProduct,
        purchaseQuantity: quantity,
        _id: currentProduct._id,
      });
    }
  }

  // Deals with getting the needed product
  useEffect(() => {
    if (products.length) {
      // Find the product needed and set the local state (currentProduct)
      setCurrentProduct(products.find((product) => product._id === productId));
    } else if (data) {
      // Sends data from query (if needed) to Redux
      dispatch(updateProducts(data.products));
    } else {
      // Launches the lazy query if there is no data in the global state (Redux)
      getData();
    }
  }, [data, productId, products, dispatch, getData]);

  // Looks for percentage and end date for promotions, if they exist at all
  const percentage = currentProduct?.promotion?.percentage;
  const ends = currentProduct?.promotion?.ends;

  return (
    <>
      {currentProduct ? (
        <div>
          <div className="bg-tint mb-4">
            <div className="container">
              <div className="row gx-4 fullpage align-items-stretch">
                <div className="col-xl-8 col-md-12 my-auto">
                  <img
                    src={currentProduct.mainImage}
                    alt={currentProduct.name}
                    className="product-image"
                  />
                </div>
                <div className="product-details p-4 h-100 col-xl-4 col-md-12 my-auto text-center">
                  <h1 className="fw-light mb-4">{currentProduct.name}</h1>
                  <div className="pc-priceblock mb-2">
                    {effectivePromotion(currentProduct.promotion, ends) ===
                    false ? (
                      <div className="pc-price font-weight-bold bolden">
                        ${currentProduct.price}
                      </div>
                    ) : (
                      <div className="d-xs-column d-md-flex justify-content-center">
                        <div className="pc-price text-decoration-line-through me-2">
                          ${currentProduct.price}
                        </div>
                        <div className="pc-price pc-promoprice">
                          <div className="d-sm-column d-md-flex">
                            <div>
                              <span className="bolden me-1">
                                ${currentProduct.promotionPrice}
                              </span>
                            </div>
                            <div>({percentage}% off)</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <ReactStars
                      count={5}
                      value={currentProduct.rating}
                      size={18}
                      edit={false}
                      color2={"#7f60db"}
                      color1={"rgba(0, 0, 0, 0.19)"}
                    />
                    <div className="review-button ms-2">
                      ({currentProduct.reviews.length} reviews)
                    </div>
                  </div>
                  <div className="d-none">
                    <ul>
                      {currentProduct.details.length ? (
                        currentProduct.details.map((detail, index) => {
                          return (
                            <li key={`${productId}-detail-${index}`}>
                              {detail}
                            </li>
                          );
                        })
                      ) : (
                        <li>Nothing here yet...</li>
                      )}
                    </ul>
                  </div>
                  <div className="product-description lh-lg">
                    <p>
                      {/* {currentProduct.description} */} Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Ut ac hendrerit magna,
                      sit amet feugiat est. Nunc a tempor est. Nam dignissim
                      ante eu urna ultrices accumsan.{" "}
                      {/* href returning to the current page is a temp fix for a React warning. */}
                      <a href={`/product/${currentProduct._id}`}>Read more</a>
                    </p>
                  </div>
                  <div>
                    <button
                      className="addtocart mt-2"
                      onClick={() => addItemToCart(1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-tint pt-5 pb-5 text-center mb-4">
            <div className="container">
              <h1 className="fw-light mb-5">Product Description</h1>
              <div>{currentProduct.description}</div>
            </div>
          </div>
          <div className="bg-tint p-5 text-center">
            <div className="container">
              <h1 className="fw-light mb-5">Product Reviews</h1>
              {Auth.loggedIn() && (
                <ReviewForm currentProduct={currentProduct} />
              )}
              {currentProduct.reviews.length ? (
                <ReviewList currentProduct={currentProduct} />
              ) : (
                <div>There are no reviews yet. Be the first to leave one!</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default SingleProduct;
