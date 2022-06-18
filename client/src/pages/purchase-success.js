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
    <div className="mt-5">
      <div className="success-container shadow">
        <div className="success-header d-flex align-items-center justify-content-center">
          <div className="logo">Sellouts</div>
        </div>
        <h2 className="mt-4 text-center">Thank you for your purchase!</h2>
        <p className="mt-3 mb-5 text-center">
          The order was created successfully.
        </p>
        <div>
          <p className="mt-2 pb-4 text-center">
            <a href="/">Continue shopping</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
