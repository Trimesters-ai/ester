import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { WhoopConnect } from './components/WhoopConnect';
import { UserProfile } from './components/UserProfile';
import { useStore } from './store/useStore';
import { MessageCircle, User } from 'lucide-react';

function App() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Temporary setup for demo purposes
  React.useEffect(() => {
    if (!user) {
      useStore.getState().setUser({
        id: '1',
        email: 'demo@example.com'
      });
    }
  }, [user]);

  // Tab configuration
  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="h-[600px]">
              <ChatInterface />
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="grid grid-cols-1 gap-6">
            <UserProfile />
            <WhoopConnect />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Floating Header with Logo and Tabs */}
        <div className="fixed top-0 left-0 right-0 bg-white z-30 shadow-sm py-2 px-2 sm:py-3 sm:px-4">
          {/* Mobile Hamburger & Drawer */}
          <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 relative">
            {/* Hamburger icon for mobile */}
            <button
              className="sm:hidden absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md hover:bg-green-50 focus:outline-none z-40"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-7 h-7 text-green-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Drawer overlay */}
            {mobileMenuOpen && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden" onClick={() => setMobileMenuOpen(false)}></div>
                <div className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 py-4 border-b border-green-100">
                      <span className="font-semibold text-green-900 text-lg">Menu</span>
                      <button className="p-2 rounded-md hover:bg-green-50" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                        <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-6">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors w-full text-left mb-1 whitespace-nowrap ${
                              activeTab === tab.id
                                ? 'bg-[#e8f5e9] text-[#2d8059]'
                                : 'text-gray-700 hover:text-[#2d8059] hover:bg-[#f1f8e9]'
                            }`}
                          >
                            <Icon size={18} className="mr-3" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Logo on the left */}
            <a href="#" className="flex items-center justify-center sm:justify-start min-w-0 mx-auto sm:mx-0 h-10">
              <img 
                src="/assets/images/ester-logo.png" 
                alt="Ester Logo" 
                className="h-full w-auto object-contain"
              />
            </a>
            {/* Tabs row for desktop */}
            <div className="hidden sm:flex flex-1 justify-center">
              <div className="bg-white rounded-full shadow-md p-1 flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-[#e8f5e9] text-[#2d8059]'
                          : 'text-gray-600 hover:text-[#2d8059] hover:bg-[#f1f8e9]'
                      }`}
                    >
                      <Icon size={18} className="mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Spacer to account for fixed header */}
        <div className="h-20 mb-4"></div>
        
        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default App;