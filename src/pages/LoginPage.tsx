import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Mail, ArrowRight, Building2, Factory, Map, Users, Recycle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

const roles: { id: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  { id: 'government', label: 'Government Authority', description: 'Access all monitoring and compliance tools', icon: Building2 },
  { id: 'industry', label: 'Industry Manager', description: 'Manage emissions and sustainability reports', icon: Factory },
  { id: 'urban-planner', label: 'Urban Planner', description: 'Simulate scenarios and plan developments', icon: Map },
  { id: 'citizen', label: 'Citizen', description: 'View public data and awareness content', icon: Users },
  { id: 'recycler', label: 'Recycler', description: 'Access circular economy marketplace', icon: Recycle },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    login(email, selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary-foreground/20 flex items-center justify-center">
              <Globe className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-primary-foreground">PRITHVI-NET</h1>
              <p className="text-xs text-primary-foreground/70">Environmental Intelligence Platform</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-primary-foreground mb-4">
              Protecting Earth through<br />Data & Intelligence
            </h2>
            <p className="text-primary-foreground/80 max-w-md">
              Access comprehensive environmental monitoring, AI-powered sustainability insights, 
              and circular economy tools designed for India's sustainable future.
            </p>
          </motion.div>
        </div>

        <div className="text-primary-foreground/60 text-sm">
          Government of India Initiative for Sustainable Development
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">PRITHVI-NET</h1>
              <p className="text-xs text-muted-foreground">Environmental Intelligence</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground mb-8">Sign in to access your dashboard</p>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Your Role</label>
              <div className="grid gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-center gap-3 p-4 border transition-all text-left ${
                      selectedRole === role.id
                        ? 'border-primary bg-primary/5'
                        : 'border-input hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      selectedRole === role.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <role.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{role.label}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New user? Contact your administrator for access.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
