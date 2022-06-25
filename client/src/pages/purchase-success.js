import React from "react";
import { useQuery } from "@apollo/client";
import { loggedOutRedirect, noSessionRedirect } from "../utils/helpers";
import { useSuccessfulPurchase } from "../hooks/orderHooks";
import { useProducts } from "../hooks/productHooks";
import { QUERY_SESSION } from "../graphql/queries";

function PurchaseSuccess() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const { data } = useQuery(QUERY_SESSION, {
    variables: { sessionId },
  });

  loggedOutRedirect();
  noSessionRedirect(sessionId);

  useSuccessfulPurchase(data);
  useProducts();

  return (
    <div className="bg-tint fullpage row m-0">
      <div className="text-center col p-0">
        <h1 className="m-5">Success!</h1>
        <div className="bg-white pt-5 pb-5 account-mid">
          <h2 className="mt-4 text-center">Thank you for your purchase!</h2>
          <p className="mt-3 mb-5 text-center">
            The order was processed successfully.
          </p>
          <div>
            <p className="mt-2 pb-4 text-center">
              <a href="/">Click here</a> to continue shopping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
