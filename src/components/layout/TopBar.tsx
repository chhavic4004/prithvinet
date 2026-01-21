import { Bell, Globe, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'];

export const TopBar = () => {
  const { user } = useAuth();
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [showNotifications, setShowNotifications] = useState(false);

  const roleLabels: Record<string, string> = {
    'government': 'Government Authority',
    'industry': 'Industry Manager',
    'urban-planner': 'Urban Planner',
    'citizen': 'Citizen',
    'recycler': 'Recycler',
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">PRITHVI-NET</h1>
        <p className="text-xs text-muted-foreground">Protecting Earth through Data & Intelligence</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-2 px-3 py-2 border border-border bg-background hover:bg-muted transition-colors"
          >
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{selectedLang}</span>
          </button>
          {showLang && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border shadow-lg z-50 min-w-[120px]">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setShowLang(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 border border-border bg-background hover:bg-muted transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border shadow-lg z-50 w-80">
              <div className="p-3 border-b border-border">
                <span className="font-medium text-sm">Notifications</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-border hover:bg-muted">
                  <p className="text-sm font-medium">High AQI Alert - Delhi</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
                <div className="p-3 border-b border-border hover:bg-muted">
                  <p className="text-sm font-medium">New compliance report available</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-muted">
                  <p className="text-sm font-medium">System maintenance scheduled</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-9 h-9 bg-primary flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{roleLabels[user?.role || 'citizen']}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
