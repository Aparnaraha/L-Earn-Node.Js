import { useState } from 'react';
import UserList from './UserList';
import UserDetail from './UserDetail';
import LoginPage from './LoginPage'; // <-- 1. Import your brand new component here!

export default function Dashboard() {
  const [token, setToken] = useState(null); 
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleBackToList = () => { setSelectedUserId(null); };
  const handleSelectUser = (id) => { setSelectedUserId(id); };

  // Clear out token and selection states on log out
  const handleLogout = () => {
    setToken(null);
    setSelectedUserId(null);
  };

  // 2. Clear out the big form code and call the component cleanly
  if (!token) {
    return (
      <LoginPage onLoginSuccess={(receivedToken) => setToken(receivedToken)} />
    );
  }

  // 3. Your normal data pages run below if token exists
  return (
    <>
      {selectedUserId ? (
        <UserDetail userId={selectedUserId} onBack={handleBackToList} />
      ) : (
        /* Pass the handleLogout function down to give our header access */
        <UserList 
          onSelectUser={handleSelectUser} 
          token={token} 
          onLogout={handleLogout} 
        />
      )}
    </>
  );
}