import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        alert("Signup successful 🎉");
        navigate("/login");
      }
    } catch (err) {
      setError("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name",     label: "Full Name", placeholder: "John Doe",          type: "text"     },
    { key: "email",    label: "Email",     placeholder: "you@example.com",   type: "email"    },
    { key: "password", label: "Password",  placeholder: "••••••••",          type: "password" },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -35, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '12%', right: '12%',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ y: [0, 28, 0], x: [0, -15, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          position: 'absolute', bottom: '8%', left: '10%',
          width: '440px', height: '440px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: 'absolute', top: '40%', left: '25%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(36px)', pointerEvents: 'none',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(15,23,42,0.65)',
          backdropFilter: 'blur(28px) saturate(1.8)',
          border: '1px solid rgba(139,92,246,0.16)',
          borderRadius: '24px',
          padding: '48px 40px',
          width: '420px',
          maxWidth: '92vw',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.07), 0 0 80px rgba(139,92,246,0.07)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: '25%', right: '25%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.55), transparent)',
        }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45, type: 'spring', stiffness: 180 }}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 8px 24px rgba(139,92,246,0.3)',
              fontSize: '1.35rem',
            }}
          >
            ✦
          </motion.div>

          <h1 style={{
            fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #e0e7ff, #ddd6fe)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Create account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '6px' }}>
            Join Finlytics AI today
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(244,63,94,0.09)',
              border: '1px solid rgba(244,63,94,0.22)',
              borderRadius: '12px', padding: '11px 16px',
              marginBottom: '20px', color: '#fb7185',
              fontSize: '0.84rem', textAlign: 'center',
            }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {fields.map(({ key, label, placeholder, type }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22 + i * 0.07, duration: 0.35 }}
            >
              <label style={{
                display: 'block', fontSize: '0.72rem', fontWeight: 600,
                color: '#94a3b8', marginBottom: '7px',
                textTransform: 'uppercase', letterSpacing: '0.07em',
              }}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                className="input"
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="btn"
            disabled={loading}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(139,92,246,0.5)' }}
            whileTap={{ scale: 0.98 }}
            style={{ marginTop: '6px', padding: '14px', fontSize: '0.9rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ textAlign: 'center', color: '#64748b', fontSize: '0.84rem', marginTop: '24px' }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 600 }}
            onMouseEnter={(e) => e.target.style.color = '#a78bfa'}
            onMouseLeave={(e) => e.target.style.color = '#818cf8'}
          >
            Sign In
          </span>
        </motion.p>

        <p style={{ textAlign: 'center', color: '#374151', fontSize: '0.72rem', marginTop: '18px' }}>
          Privacy Policy · Terms · Help
        </p>
      </motion.div>
    </div>
  );
}