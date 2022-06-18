import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_ORDERS } from "../../graphql/queries";
import { ADD_ORDER, UPDATE_PRODUCT } from "../../graphql/mutations";
import { idbPromise } from "../../utils/helpers";
import Auth from "../../utils/auth";
import { addMultipleItems } from "../../redux/features/cartSlice";

export function useSuccessfulPurchase(data) {
  const dispatch = useDispatch();
  const [getOrder, { data: orderExists }] = useLazyQuery(QUERY_ORDERS);
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (data) {
      // Stripe session data, including shipping type/cost
      const { session, shipping } = data.session;
      // Payment subtotal, total after tax/shipping,
      // Stripe session ID, payment status, and address
      const {
        amount_subtotal,
        amount_total,
        id: stripeId,
        payment_status,
        shipping: { address },
      } = session;
      // Address specifics
      const {
        city,
        state,
        line1: addressLine1,
        line2: addressLine2,
        postal_code,
      } = address;
      // Shipping type and cost
      const {
        display_name: shippingType,
        fixed_amount: { amount: shippingCost },
      } = shipping;

      function createAddress(
        city,
        state,
        addressLine1,
        addressLine2,
        postal_code
      ) {
        if (addressLine2) {
          return `${addressLine1}, ${city}, ${state} ${postal_code} - additional: ${addressLine2}`;
        } else {
          return `${addressLine1}, ${city}, ${state} ${postal_code}`;
        }
      }

      getOrder({ variables: { stripeId } });

      async function saveOrder() {
        const cart = await idbPromise("cart", "get");
        let products = [];
        // Get an array of the product IDs in the cart
        cart.forEach((product) => {
          for (let i = 0; i < product.purchaseQuantity; i++) {
            products.push(product._id);
          }

          updateProduct({
            variables: {
              input: {
                _id: product._id,
                inventory: product.product.inventory - product.purchaseQuantity,
              },
            },
          });
        });

        if (products.length) {
          const { data: orderData } = await addOrder({
            variables: {
              input: {
                products: products,
                purchaseDate: DateTime.now().toLocaleString(
                  DateTime.DATETIME_SHORT
                ),
                customer: Auth.getProfile().data._id,
                stripeId: stripeId,
                paymentStatus: payment_status,
                deliveryAddress: createAddress(
                  city,
                  state,
                  addressLine1,
                  addressLine2,
                  postal_code
                ),
                shippingType: shippingType,
                shippingCost: shippingCost,
                tax: amount_total - amount_subtotal - shippingCost,
                subtotal: amount_subtotal,
                total: amount_total,
              },
            },
          });

          const productData = orderData.addOrder.products;
          productData.forEach((item) => {
            idbPromise("cart", "delete", { _id: item._id });
          });
          const cart = await idbPromise("cart", "get");
          dispatch(addMultipleItems([...cart]));
        }
      }

      if (orderExists) {
        if (orderExists.orders.length === 0) {
          saveOrder();
        } else {
          window.location.replace("/");
        }
      }
    }
  }, [data, orderExists, addOrder, dispatch, updateProduct, getOrder]);
}
