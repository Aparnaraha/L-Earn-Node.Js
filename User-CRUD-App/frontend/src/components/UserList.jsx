import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react"; 
import { themeStyles } from "./themeStyles";
import axios from "axios";
import UserModal from "./UserModal";
import UserDetail from "./UserDetail"; 

export default function UserList({
  onSelectUser,
  onLogout,
  token, // 🌟 Received token from parent App state
  styles = themeStyles,
}) {
  // 1. STATE INITIALIZATIONS
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); 

  // 2. NETWORK SYNC (Fetches user list on component mount)
  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Sends validation key to secure route
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
        setLoading(false);
      });
  }, [token]); 

  // 3. EVENT HANDLERS
  const handleDelete = (e, id) => {
    e.stopPropagation();

    if (window.confirm("Delete this user?")) {
      axios
        .delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Added authorization for secure delete actions
          }
        })
        .then(() => {
          setUsers(users.filter((u) => u._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          alert("A network error occurred while trying to delete.");
        });
    }
  };

  // 4. CONDITIONAL RENDER STATES
  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-gray-500">
        Loading records...
      </div>
    );
  }

  // 5. SEARCH FILTER CALCULATION
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.address?.toLowerCase().includes(query)
    );
  });

  // 6. CORE UI LAYOUT RENDER
  return (
    <div className={styles.container}>
      {/* Dynamic Action Header Panel */}
      <div className={styles.headerBlock}>
        <h1 className={styles.headerTitle}>Users</h1>

        {/* Action Controls Side Wrapper */}
        <div className="flex items-center gap-2">
          {/* Add User Button */}
          <button
            onClick={() => setIsModalOpen(true)} 
            className={styles.btnSecondary}
          >
            <Plus className="w-3.5 h-3.5" />
            Add User
          </button>

          {/* Sign Out Control Trigger */}
          <button
            onClick={onLogout}
            title="Sign Out"
            className="flex items-center justify-center p-2 text-gray-400 hover:text-red-600 bg-gray-50 border border-gray-200 rounded-md transition-colors hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-sm my-4 text-gray-500">
        Click "Add User" to check the popup overlay!
      </p>

      {/* Popup Window Dialog Panel */}
      <UserModal
        isOpen={isModalOpen}
        token={token} // 🌟 CRITICAL FIX: Token successfully passed down as a prop to child modal
        editingUser={editingUser} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null); 
        }}
        onUserAdded={(savedUser) => {
          const exists = users.some((u) => u._id === savedUser._id);
          if (exists) {
            setUsers(
              users.map((u) => (u._id === savedUser._id ? savedUser : u)),
            );
          } else {
            setUsers([...users, savedUser]);
          }
        }}
        styles={styles}
      />

      {/* Search Input Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search profiles by name, email, or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-3 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-colors shadow-xs"
        />
      </div>

      {/* Main Records Table Framework */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Email</th>
              <th className={`${styles.tableHeaderCell} hidden sm:table-cell`}>
                ID
              </th>
              <th className={`${styles.tableHeaderCell} text-right`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-sm text-gray-400 italic"
                >
                  No profiles match your search criteria.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className={styles.tableRow}
                  onClick={() => setSelectedUser(user)}
                >
                  <td className={styles.tableCellBold}>{user.name}</td>
                  <td className={styles.tableCell}>{user.email}</td>
                  <td className={`${styles.monoText} ${styles.tableCell} hidden sm:table-cell`}>
                    {user._id}
                  </td>

                  {/* Actions Column Space */}
                  <td className={`${styles.tableCell} text-right`}>
                    <div className="flex items-center justify-end gap-3">
                      {/* Edit Trigger Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingUser(user); 
                          setIsModalOpen(true); 
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Trigger Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDelete(e, user._id);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Side Summary Panel view */}
      <UserDetail
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        styles={styles}
      />

      {/* Empty Database State Notice */}
      {users.length === 0 && (
        <div className="text-center py-8 text-xs text-gray-400">
          No database files available.
        </div>
      )}
    </div>
  );
}