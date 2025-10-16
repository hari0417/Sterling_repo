import React, { useState } from "react";
import "./LoginPage.css";
import logo from "./image/IMG_20251016_173926.jpg";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ username: false, password: false });
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = { username: false, password: false };
    if (!username) { newError.username = true; hasError = true; }
    if (!password) { newError.password = true; hasError = true; }
    setError(newError);
    if (hasError) { setMessage("⚠️ Please fill all fields"); return; }

    setLoading(true);
    setMessage("");
    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "react@123") {
        setMessage(`✅ Welcome, ${username}!`);
        if (rememberMe) localStorage.setItem("rememberedUser", username);
        onLogin(username);
      } else {
        setMessage("❌ Invalid username or password");
      }
    }, 1500);
  };

  const handleForgotSubmit = () => {
    if (!email) return alert("Please enter your email");
    alert(`Password reset link sent to ${email}`);
    setEmail("");
    setShowForgot(false);
    setMessage("📧 Please check your email to reset password.");
  };

  const handleChangePassword = () => {
    alert("Password changed successfully!");
    setShowChange(false);
  };

  return (
    <div className={`page-container ${darkMode ? "dark-bg" : "light-bg"}`}>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="login-card">
        <img src={logo} alt="Sterling Reprographics" className="company-logo" />

        <h2>Login</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              className={error.username ? "error" : ""}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              className={error.password ? "error" : ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="links">
          <button onClick={() => setShowForgot(true)}>Forgot Password?</button>
          <button onClick={() => setShowChange(true)}>Change Password</button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="popup">
          <div className="popup-box">
            <h3>Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={() => setShowForgot(false)}>Cancel</button>
              <button onClick={handleForgotSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChange && (
        <div className="popup">
          <div className="popup-box">
            <h3>Change Password</h3>
            <input type="password" placeholder="Current password" />
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm new password" />
            <div className="popup-buttons">
              <button onClick={() => setShowChange(false)}>Cancel</button>
              <button onClick={handleChangePassword}>Change</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
