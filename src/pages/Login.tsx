import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <span className="text-primary-foreground font-bold text-2xl">CC</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Consulting Collective</h1>
          <p className="text-sm text-muted-foreground mt-1">Kundportal</p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-6 text-center">Logga in</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">E-post</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="din@email.se"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Lösenord</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Logga in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <a
              href="mailto:vip@consultingcollective.se"
              className="text-sm text-primary hover:underline"
            >
              Glömt lösenord?
            </a>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          © 2026 Consulting Collective. Alla rättigheter förbehållna.
        </p>
      </div>
    </div>
  );
}
