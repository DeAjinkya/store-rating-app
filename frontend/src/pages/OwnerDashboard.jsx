import { useEffect, useState } from "react";
import { getOwnerStore } from "../api/owner";

function OwnerDashboard() {
  const [store, setStore] = useState(null);

  const fetchStore = async () => {
    try {
      const res = await getOwnerStore();
      setStore(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load store");
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (!store) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">
      <h2>Store Owner Dashboard</h2>

      <div className="card p-3 mt-3">
        <h4>{store.name}</h4>
        <p>{store.address}</p>
        <p>Average Rating: {store.averageRating}</p>
      </div>

      <h4 className="mt-4">Ratings</h4>

      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {store.ratings?.map((r) => (
            <tr key={r.id}>
              <td>{r.userId}</td>
              <td>{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerDashboard;