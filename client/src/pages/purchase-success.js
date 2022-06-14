import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { loggedOutRedirect } from "../utils/helpers";
import { useSuccessfulPurchase } from "../hooks/orderHooks";
import { QUERY_SESSION } from "../graphql/queries";

function PurchaseSuccess() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const { data } = useQuery(QUERY_SESSION, {
    variables: { sessionId },
  });
  loggedOutRedirect();

  useSuccessfulPurchase();
  console.log(data);
  return (
    <div className="mt-5">
      <div className="success-container shadow">
        <div className="success-header d-flex align-items-center justify-content-center">
          <Link to="/" className="logo">
            Sellouts
          </Link>
        </div>
        <h2 className="mt-4 text-center">Thank you for your purchase!</h2>
        <p className="mt-3 mb-5 text-center">
          The order was created successfully.
        </p>
        <div>
          <p className="mt-2 pb-4 text-center">
            <Link to="/">Continue shopping</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
