import { usePromotions } from "../../../hooks/promotionHooks";
import { useWindowWidth } from "../../../hooks/navHooks";

function AllPromotions() {
  const promotions = usePromotions();
  const width = useWindowWidth();

  return (
    <div className="dialog">
      <h2 className="fw-light">All promotions</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Discount</th>
            <th scope="col">Ends</th>
          </tr>
        </thead>
        <tbody>
          {promotions &&
            promotions.map((promotion) => (
              <tr key={promotion._id}>
                <td>{promotion.name}</td>
                <td>{promotion.percentage}%</td>
                <td>
                  {width > 500
                    ? promotion.ends
                    : `${promotion.ends.split("/")[0]}/${
                        promotion.ends.split("/")[1]
                      }`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllPromotions;
