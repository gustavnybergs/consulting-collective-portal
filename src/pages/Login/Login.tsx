import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <div className={styles.logoBox}>
            <span className={styles.logoText}>CC</span>
          </div>
          <h1 className={styles.title}>Consulting Collective</h1>
          <p className={styles.subtitle}>Kundportal</p>
        </div>

        {/* Login Form */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Logga in</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.fieldLabel}>E-post</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="din@email.se"
                  required
                />
              </div>
            </div>

            <div>
              <label className={styles.fieldLabel}>Lösenord</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <LogIn className={styles.inputIcon} style={{ position: 'static', transform: 'none', color: 'currentColor' }} />
                  Logga in
                </>
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <a
              href="mailto:vip@consultingcollective.se"
              className={styles.forgotLink}
            >
              Glömt lösenord?
            </a>
          </div>
        </div>

        <p className={styles.copyright}>
          © 2026 Consulting Collective. Alla rättigheter förbehållna.
        </p>
      </div>
    </div>
  );
}
