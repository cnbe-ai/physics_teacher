const tabs = [
  { id: 'home', label: '홈', icon: '🏠' },
  { id: 'roadmap', label: '전공 로드맵', icon: '🗺️' },
  { id: 'career', label: '진로 지도', icon: '🎯' },
  { id: 'motivation', label: '동기 설계', icon: '💪' },
  { id: 'diagnosis', label: '자기 진단', icon: '📋' },
  { id: 'resources', label: '참고 자료', icon: '📚' },
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
      {/* Brand */}
      <div className="px-4 md:px-6 py-3 border-b border-slate-50 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: '#1a3a6b' }}
        >
          ⚛️
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-800 leading-tight truncate">물리교육과 진로설계</p>
          <p className="text-xs text-slate-400 leading-tight hidden sm:block">신입생을 위한 안내서</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide px-2 md:px-4 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0"
              style={{
                borderBottomColor: isActive ? '#1a3a6b' : 'transparent',
                color: isActive ? '#1a3a6b' : '#94a3b8',
              }}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
