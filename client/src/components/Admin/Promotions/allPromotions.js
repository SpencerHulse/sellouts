import { usePromotions } from "../../../hooks/promotionHooks";

function AllPromotions() {
  const promotions = usePromotions();

  return (
    <div className="dialog">
      <h2 className="fw-light">All promotions</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Promotion name</th>
            <th scope="col">Percentage off</th>
            <th scope="col">Promotion ends</th>
          </tr>
        </thead>
        <tbody>
          {promotions &&
            promotions.map((promotion) => (
              <tr key={promotion._id}>
                <td>{promotion.name}</td>
                <td>{promotion.percentage}%</td>
                <td>{promotion.ends}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllPromotions;
