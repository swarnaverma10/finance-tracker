// components/ui/Input.jsx
export default function Input({ label, ...props }) {
  return (
    <div className="relative">
      <input
        {...props}
        className="w-full p-3 bg-transparent border border-gray-600 rounded-xl focus:outline-none"
      />
      <label className="absolute left-3 top-1 text-sm text-gray-400">
        {label}
      </label>
    </div>
  );
}