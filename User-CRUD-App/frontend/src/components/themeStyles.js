/**
 * REUSABLE THEME STYLE CONFIGURATION
 * PURPOSE: To eliminate duplicate Tailwind class strings across different components.
 * This file is created FIRST so that both list, detail, and modal components can ingest it.
 */
export const themeStyles = {
  // Container wrappers for layout consistency
  container: "max-w-5xl mx-auto px-4 mt-4",
  card: "border border-gray-200 rounded overflow-hidden bg-white",
  
  // Section Headers
  headerBlock: "flex items-center justify-between mb-4 pb-2 border-b border-gray-200",
  headerTitle: "text-lg font-medium text-gray-800",
  
  // Interactive Elements (Buttons)
  btnSecondary: "inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-black border border-gray-300 rounded px-2.5 py-1 hover:bg-gray-50 transition-colors",
  btnPrimary: "inline-flex items-center text-xs font-medium text-white bg-gray-800 hover:bg-black rounded px-3 py-1.5 transition-colors disabled:bg-gray-400",
  
  // Form Controls
  inputLabel: "block text-xs font-medium text-gray-400 mb-1",
  inputField: "w-full px-2.5 py-1.5 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:border-gray-500 text-xs",
  
  // Meta typography
  monoText: "font-mono text-xs text-gray-400",

  // Table design
  tableHeaderCell: "py-2.5 font-normal text-gray-400 border-b border-gray-200",
  tableRow: "hover:bg-gray-50/70 cursor-pointer transition-colors divide-y divide-gray-100",
  tableCell: "py-3 text-gray-600",
  tableCellBold: "py-3 text-gray-900 font-medium"
};