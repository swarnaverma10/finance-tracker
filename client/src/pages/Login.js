import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        localStorage.setItem("token", data.token);
        alert("Login successful 🎉");
        navigate("/");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '8%', left: '10%',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
          filter: 'blur(48px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: 'absolute', bottom: '10%', right: '8%',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)',
          filter: 'blur(48px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{
          position: 'absolute', top: '50%', right: '20%',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
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
          border: '1px solid rgba(99,102,241,0.16)',
          borderRadius: '24px',
          padding: '48px 40px',
          width: '400px',
          maxWidth: '92vw',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.07), 0 0 80px rgba(99,102,241,0.07)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: '25%', right: '25%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.55), transparent)',
        }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45, type: 'spring', stiffness: 200 }}
            style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
              fontSize: '1.35rem',
            }}
          >
            💰
          </motion.div>

          <h1 style={{
            fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Welcome back
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '6px' }}>
            Sign in to Finlytics AI
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
          onSubmit={handleLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label style={{
              display: 'block', fontSize: '0.72rem', fontWeight: 600,
              color: '#94a3b8', marginBottom: '7px',
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{
              display: 'block', fontSize: '0.72rem', fontWeight: 600,
              color: '#94a3b8', marginBottom: '7px',
              textTransform: 'uppercase', letterSpacing: '0.07em',
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <motion.button
            type="submit"
            className="btn"
            disabled={loading}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(99,102,241,0.5)' }}
            whileTap={{ scale: 0.98 }}
            style={{ marginTop: '6px', padding: '14px', fontSize: '0.9rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </motion.button>
        </motion.form>

        {/* Footer links */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{ textAlign: 'center', color: '#64748b', fontSize: '0.84rem', marginTop: '24px' }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 600 }}
            onMouseEnter={(e) => e.target.style.color = '#a78bfa'}
            onMouseLeave={(e) => e.target.style.color = '#818cf8'}
          >
            Sign Up
          </span>
        </motion.p>

        <p style={{ textAlign: 'center', color: '#374151', fontSize: '0.72rem', marginTop: '18px' }}>
          Privacy Policy · Terms · Help
        </p>
      </motion.div>
    </div>
  );
}