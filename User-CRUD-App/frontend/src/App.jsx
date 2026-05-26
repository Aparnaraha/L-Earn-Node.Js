import { useState } from 'react'
import Dashboard from './components/Dashboard'

function App() {

  return (
<div className="min-h-screen bg-gray-50 py-8">
      {/* App is now 100% clean. Dashboard handles everything else! */}
      <Dashboard />
    </div>
  );
}

export default App
