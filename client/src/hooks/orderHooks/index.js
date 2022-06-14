import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_ORDER, UPDATE_PRODUCT } from "../../graphql/mutations";
import { idbPromise } from "../../utils/helpers";
import Auth from "../../utils/auth";
import { addMultipleItems } from "../../redux/features/cartSlice";

export function useSuccessfulPurchase(data) {
  const dispatch = useDispatch();
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  console.log(data);
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      let products = [];
      // Get an array of the product IDs in the cart
      cart.forEach((product) => {
        for (let i = 0; i < product.purchaseQuantity; i++) {
          products.push(product._id);
        }
        console.log(product);
        /*         updateProduct({
          variables: {
            id: product._id,
            stock: product.product.stock - product.purchaseQuantity,
          },
        }); */
      });

      if (products.length) {
        /*         const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          idbPromise("cart", "delete", { _id: item._id });
        });
        const cart = await idbPromise("cart", "get");
        dispatch(addMultipleItems([...cart])); */
      }
    }

    saveOrder();
  }, [addOrder, dispatch, updateProduct]);
}
