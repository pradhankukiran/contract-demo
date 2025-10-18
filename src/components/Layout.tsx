import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const tabs = [{
    path: '/',
    label: 'Draft Contract',
    icon: FileText
  }, {
    path: '/review',
    label: 'Review Contract',
    icon: Search
  }];

  const activeIndex = tabs.findIndex(tab => tab.path === location.pathname);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <nav className="relative flex gap-2 justify-center">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`
                    relative z-10 flex items-center gap-2 px-4 py-2.5 font-medium transition-colors rounded-lg
                    ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary shadow-md rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};