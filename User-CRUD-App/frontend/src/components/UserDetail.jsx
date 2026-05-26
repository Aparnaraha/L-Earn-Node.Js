import { X, User, Mail, MapPin } from 'lucide-react';
import { themeStyles } from './themeStyles';

/**
 * REUSABLE USER DETAIL PANEL COMPONENT
 * PURPOSE: Displays an expanded, read-only profile summary side card.
 */
export default function UserDetail({ user, onClose, styles = themeStyles }) {
  
  // Guard Clause: If no user object is passed down, draw absolutely nothing
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-end p-0">
      {/* We will build the sliding panel layout container box right inside here! */}
      {/* Slide-out Panel Wrapper Box Container */}
      <div className="bg-white h-full w-full max-w-sm p-6 shadow-2xl border-l border-gray-100 flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header Block Row */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-sm font-semibold text-gray-800">Profile Summary Card</h2>
          
          {/* Close Panel Button */}
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Next, we will insert the user's data avatar badge and profile info rows right here! */}

        {/* Profile Card Body Area */}
        <div className="space-y-5 flex-1">
          
          {/* Visual Avatar Placeholder Badge */}
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-base">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-400">Database ID: {user._id}</p>
            </div>
          </div>

          {/* Next, we will insert the specific text data rows for Email and Address right here! */}

          {/* Expanded Field Data Rows */}
          <div className="space-y-4 text-xs">
            
            {/* Row A: Email Details */}
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="block font-medium text-gray-400 uppercase tracking-wider text-[10px]">Email Address</span>
                <span className="text-gray-700 font-medium break-all">{user.email}</span>
              </div>
            </div>

            {/* Row B: Address Details */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <span className="block font-medium text-gray-400 uppercase tracking-wider text-[10px]">Physical Address</span>
                <span className="text-gray-700 font-medium">{user.address || 'No address provided'}</span>
              </div>
            </div>

          </div>

        </div>
        {/* Bottom Panel Action Row */}
        <div className="pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}