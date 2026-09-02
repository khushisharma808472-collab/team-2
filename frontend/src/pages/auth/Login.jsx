import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log({ email, password, rememberMe });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
    
      <div className="auth-left">
        <div className="brand">
          <div className="logo">BT</div>
          <h2>BuildTrack</h2>
        </div>

        <div className="auth-content">
          <span className="welcome-text">
            CONSTRUCTION MANAGEMENT PLATFORM
          </span>

          <h1>Manage your projects with confidence.</h1>

          <p>
            Track projects, teams, tasks, and construction progress seamlessly from one unified workspace.
          </p>

          <div className="auth-features">
            <div>
              <span>✓</span> Real-time project monitoring
            </div>
            <div>
              <span>✓</span> Team & role management
            </div>
            <div>
              <span>✓</span> Smart construction insights
            </div>
          </div>
        </div>

        <div className="left-footer">
          © 2026 BuildTrack. Construction made smarter.
        </div>
      </div>

    
      <div className="auth-right">
        <div className="auth-card">
          <div className="mobile-brand">
            <div className="logo">BT</div>
            <h2>BuildTrack</h2>
          </div>

          <div className="auth-header">
            <h1>Welcome back</h1>
            <p className="subtitle">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className={`auth-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;