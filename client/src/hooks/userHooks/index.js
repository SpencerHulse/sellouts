// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../graphql/queries";

export function useUsers() {
  const { loading, data } = useQuery(QUERY_USERS);

  if (!loading) {
    return data.users
  }
}