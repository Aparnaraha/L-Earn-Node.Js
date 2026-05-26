import { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { themeStyles } from './themeStyles'; 

export default function UserModal({ 
  isOpen, 
  onClose, 
  onUserAdded, 
  editingUser, 
  token, // 🌟 CRITICAL FIX: Accepted token prop from the parent UserList container
  styles = themeStyles 
}) {
  // 1. STATE CONFIGURATIONS
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false); 

  // 2. FORM DATA SYNC (Runs whenever the modal opens or switches targeted users)
  useEffect(() => {
    if (editingUser) {
      setFormData({ 
        name: editingUser.name, 
        email: editingUser.email, 
        address: editingUser.address || ''
      });
    } else {
      setFormData({ name: '', email: '', address: '' });
    }
  }, [editingUser, isOpen]);

  // Guard Clause: If open toggle flag is false, halt mounting tree cycle
  if (!isOpen) return null;

  // 3. BACKEND NETWORK SUBMISSION HANDLER
 // 3. BACKEND NETWORK SUBMISSION HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const isEditing = Boolean(editingUser?._id);
    
    // 🌟 THE FIX: Change '/api/users' to '/api/auth/register' for new profiles!
    const url = isEditing 
      ? `/api/users/${editingUser._id}` 
      : '/api/auth/register'; // 👈 Change this line right here
      
    const method = isEditing ? 'put' : 'post';

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios[method](url, formData, config)
      .then((response) => {
        // Since /api/auth/register returns the whole user object or { user: ... }, 
        // make sure your parent page receives the user data object smoothly
        const savedUser = response.data.user || response.data;
        onUserAdded(savedUser); 
        
        setFormData({ name: '', email: '', address: '' });
        onClose();
      })
      .catch((err) => {
        console.error("Failed to save user:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Save failed. Please check your network connection.');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // 4. UI RENDERING DOM DIALOG OVERLAY WINDOWS
  return (
    /* Full-screen tinted backdrop overlay layer */
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      
      {/* Container dialog frame structure box */}
      <div className="bg-white border border-gray-200 w-full max-w-md rounded p-5 shadow-lg relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Block Control Row */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h3 className="text-sm font-medium text-gray-800">
            {editingUser ? 'Edit Profile Settings' : 'Create New Profile'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Interactive Fields Block */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          
          {/* Runtime Server-side Error Alert notification space */}
          {error && (
            <div className="p-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded">
              {error}
            </div>
          )}

          {/* Input field 1: Name */}
          <div>
            <label className={styles.inputLabel}>Full Name</label>
            <input
              type="text"
              required
              className={styles.inputField}
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Input field 2: Email */}
          <div>
            <label className={styles.inputLabel}>Email Address</label>
            <input
              type="email"
              required
              className={styles.inputField}
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Input field 3: Address */}
          <div>
            <label className={styles.inputLabel}>Physical Address</label>
            <input
              type="text"
              required
              className={styles.inputField}
              placeholder="123 Main St, New York, NY"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          {/* Bottom Dialog Action Panel Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-5">
            <button
              type="button"
              onClick={onClose}
              className={styles.btnSecondary}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`${styles.btnPrimary} ${submitting ? 'opacity-50' : ''}`}
            >
              {submitting ? 'Saving...' : editingUser ? 'Update Profile' : 'Save Profile'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}