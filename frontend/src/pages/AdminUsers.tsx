import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../store/userStore";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { user } = useUserStore();

  const handleDelete = async (userId: number) => {
    if (!user?.access_token) return;

    try {
      await axios.delete(`/api/v1/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      alert("Ошибка при удалении пользователя");
    }
  };

  useEffect(() => {
    if (!user?.access_token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/v1/admin/users", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setError("Ошибка при загрузке пользователей");
      }
    };

    fetchUsers();
  }, [user?.access_token]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Пользователи</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">Нет пользователей</p>
      ) : (
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Имя</th>
              <th className="py-2">Фамилия</th>
              <th className="py-2">Email</th>
              <th className="py-2">Admin</th>
              <th className="py-2">Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2">{user.first_name}</td>
                <td className="py-2">{user.last_name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.is_admin ? "✅" : "❌"}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
