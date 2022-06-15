import Auth from "./auth";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function calculateTotal(cartItems) {
  let sum = 0;
  cartItems.forEach((item) => {
    sum += item.product.price * item.purchaseQuantity;
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
