import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, User, Bell, LogOut } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';

const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Gujarati'];

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('English');
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        {/* Profile */}
        <div className="card-elevated">
          <div className="flex items-center gap-4 mb-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Profile Information</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email</label>
              <p className="font-medium">{user?.email || 'user@example.com'}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Role</label>
              <p className="font-medium capitalize">{user?.role?.replace('-', ' ') || 'Citizen'}</p>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="card-elevated">
          <div className="flex items-center gap-4 mb-4">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Language</h2>
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full px-4 py-2 border border-input bg-background"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <div className="card-elevated">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">Receive alerts and updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 flex items-center px-1 transition-colors ${notifications ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`w-4 h-4 bg-white transition-transform ${notifications ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="btn-outline w-full flex items-center justify-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
