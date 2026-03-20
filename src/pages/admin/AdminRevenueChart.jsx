import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

function AdminRevenueChart() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/admin/revenue/monthly", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [token]);

  return (
    <div className="card mt-4 p-3">
      <h5 className="mb-3">Monthly Revenue</h5>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0d6efd"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminRevenueChart;
