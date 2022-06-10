import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateCategories } from "../../redux/features/categoriesSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../graphql/queries";
import { idbPromise } from "../../utils/helpers";

export function useCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      // Redux update
      dispatch(updateCategories(categoryData.categories));
      // IndexedDB update
      categoryData.categories.forEach((product) => {
        idbPromise("categories", "put", product);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  return categories;
}
