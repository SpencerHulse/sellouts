import Auth from "./auth";
import { DateTime } from "luxon";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function calculateTotal(cartItems) {
  let sum = 0;
  cartItems.forEach((item) => {
    const { product, purchaseQuantity } = item;
    const { promotion, price, promotionPrice } = product;
    const ends = product?.promotion?.ends;

    if (effectivePromotion(promotion, ends)) {
      sum += promotionPrice * purchaseQuantity;
    } else {
      sum += price * purchaseQuantity;
    }
  });
  return sum.toFixed(2);
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("sellouts", 1);

    let db, tx, store;

    request.onupgradeneeded = function (event) {
      const db = request.result;
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    request.onerror = function (err) {
      console.log("An error occurred");
    };

    request.onsuccess = function (event) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (err) {
        console.log("error", err);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("You did not include a valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}

export function loggedInRedirect() {
  const loggedIn = Auth.loggedIn();
  if (loggedIn) {
    window.location.assign("/");
  }
}

export function loggedOutRedirect() {
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) {
    window.location.assign("/");
  }
}

export function noSessionRedirect(sessionId) {
  if (!sessionId) {
    window.location.assign("/");
  }
}

export function notAdminRedirect() {
  loggedOutRedirect();
  const admin = Auth.getProfile().data.admin;
  if (!admin) {
    window.location.assign("/");
    return false;
  }
  return true;
}

export function effectivePromotion(promotion, ends) {
  const date = DateTime.now().toFormat("M/dd/yyyy");
  return !promotion ? false : ends > date ? true : false;
}

export function groupOrderData(orderData) {
  const updatedOrders = [];

  const orders = orderData.orders;
  orders.forEach((order) => {
    const { products } = order;
    const orderSummary = [];

    products.forEach((product) => {
      const { _id, name } = product;
      let updated = false;

      orderSummary.map((orderProduct) => {
        if (orderProduct[0]._id === _id) {
          orderProduct[0].quantityPurchased += 1;
          updated = true;
        }
        return orderProduct;
      });

      if (!updated) {
        const productSummary = [
          {
            _id,
            name,
            quantityPurchased: 1,
          },
        ];
        orderSummary.push(productSummary);
      }
    });
    updatedOrders.push({
      orderData: order,
      products: orderSummary,
    });
  });

  return updatedOrders;
}

// Takes an array and items per page
// Returns the number of pages needed for pagination
export function numberOfPages(array, itemsPP) {
  if (array.length % itemsPP === 0) {
    return array.length / itemsPP;
  } else {
    return Math.floor(array.length / itemsPP) + 1;
  }
}
