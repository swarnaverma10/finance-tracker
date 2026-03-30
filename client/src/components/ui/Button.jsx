// components/ui/Button.jsx
export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-xl hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}