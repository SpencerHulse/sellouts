import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import ReviewList from "../components/ReviewList";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../redux/features/productSlice";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../graphql/queries";

import { effectivePromotion } from "../utils/helpers";
import Auth from "../utils/auth";
import ReviewForm from "../components/Forms/Reviews";

function SingleProduct() {
  const [currentProduct, setCurrentProduct] = useState("");
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // Potentially change this to a lazy query that only launches when it has to.
  // As it is now, it always queries the database, even if the product is in state.
  const { data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === productId));
    } else if (data) {
      dispatch(updateProducts(data.products));
    }
  }, [data, productId, products, dispatch]);

  let percentage, ends;

  if (currentProduct) {
    if (currentProduct.promotion) {
      percentage = currentProduct.promotion.percentage;
      ends = currentProduct.promotion.ends;
    }
  }

  return (
    <>
      {currentProduct ? (
        <div>
          <div className="d-flex">
            <img src={currentProduct.mainImage} alt={currentProduct.name} />
            <div>
              <h2>{currentProduct.name}</h2>
              <ReactStars
                count={5}
                value={currentProduct.rating}
                size={24}
                edit={false}
              />
              <div className="pc-priceblock">
                {effectivePromotion(currentProduct.promotion, ends) ===
                false ? (
                  <div className="pc-price font-weight-bold bolden">
                    ${currentProduct.price}
                  </div>
                ) : (
                  <div className="d-xs-column d-md-flex">
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
              <div>
                <ul>
                  {currentProduct.details.length ? (
                    currentProduct.details.map((detail, index) => {
                      return (
                        <li key={`${productId}-detail-${index}`}>{detail}</li>
                      );
                    })
                  ) : (
                    <li>Nothing here yet...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>{currentProduct.description}</div>
          <div>
            {Auth.loggedIn() && <ReviewForm currentProduct={currentProduct} />}
            {currentProduct.reviews.length ? (
              <ReviewList currentProduct={currentProduct} />
            ) : (
              <div>There are no reviews yet. Be the first to leave one!</div>
            )}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default SingleProduct;
