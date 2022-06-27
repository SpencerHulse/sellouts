// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PROMOTIONS } from "../../graphql/queries";

export function usePromotions() {
  const { loading, data } = useQuery(QUERY_PROMOTIONS);

  if (!loading) {
    return data.promotions
  }
}