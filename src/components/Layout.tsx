import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Search } from 'lucide-react';
interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({
  children
}: LayoutProps) => {
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
  return <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          

          <nav className="flex gap-2 justify-center">
            {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return <Link key={tab.path} to={tab.path} className={`
                    flex items-center gap-2 px-4 py-2.5 font-medium transition-all
                    ${isActive ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                  `}>
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Link>;
          })}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>;
};