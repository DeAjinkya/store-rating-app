import { useEffect, useState } from "react";
import { getStores, submitRating } from "../api/user";

function UserDashboard() {
    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");

    const fetchStores = async (query = "") => {
        try {
            const res = await getStores(query);
            setStores(res.data);
        } catch (err) {
            console.log(err);
            alert("Failed to load stores");
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        fetchStores(value);
    };

    const handleRating = async (storeId, rating) => {
        try {
            await submitRating(storeId, rating);
            alert("Rating submitted");

            // refresh list
            fetchStores(search);
        } catch (err) {
            console.log(err);
            alert("Failed to submit rating");
        }
    };

    return (
        <div className="container mt-4">
            <h2>User Dashboard</h2>

            {/* SEARCH */}
            <input
                type="text"
                className="form-control mt-3 mb-4"
                placeholder="Search stores by name or address..."
                value={search}
                onChange={handleSearch}
            />

            {/* STORE LIST */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Average Rating</th>
                        <th>Your Rating</th>
                        <th>Rate</th>
                    </tr>
                </thead>

                <tbody>
                    {stores.map((s) => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.address}</td>
                            <td>{s.averageRating}</td>
                            <td>{s.userRating !== null ? s.userRating : "Not Rated"}</td>

                            <td>
                                <select
                                    className="form-select"
                                    value={s.userRating || ""}
                                    onChange={(e) =>
                                        handleRating(s.id, Number(e.target.value))
                                    }
                                >
                                    <option value="">Rate</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDashboard;