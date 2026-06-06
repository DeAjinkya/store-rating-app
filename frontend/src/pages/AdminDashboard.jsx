import { useEffect, useState } from "react";
import { getAllUsers, getAllStores } from "../api/admin";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const fetchData = async () => {
    try {
      const usersRes = await getAllUsers();
      const storesRes = await getAllStores();

      setUsers(usersRes.data);
      setStores(storesRes.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* USERS */}
      <h4 className="mt-4">Users</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* STORES */}
      <h4 className="mt-5">Stores</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;