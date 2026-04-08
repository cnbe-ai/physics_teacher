const tabs = [
  { id: 'home',       label: '홈',       icon: '🏠' },
  { id: 'roadmap',   label: '전공 로드맵', icon: '🗺️' },
  { id: 'career',    label: '진로 지도',  icon: '🎯' },
  { id: 'motivation',label: '동기 설계',  icon: '💪' },
  { id: 'diagnosis', label: '자기 진단',  icon: '📋' },
  { id: 'resources', label: '참고 자료',  icon: '📚' },
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="sticky top-0 z-30 bg-white border-b-2 border-slate-100 shadow-md">
      {/* Brand bar */}
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{ background: 'linear-gradient(90deg, #1a3a6b 0%, #0f2d5a 100%)' }}
      >
        <span className="text-2xl">⚛️</span>
        <div>
          <p className="text-white font-bold text-base leading-tight">물리교육과 진로 설계</p>
          <p className="text-blue-200 text-xs leading-tight mt-0.5">신입생을 위한 전공 탐색 안내서</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex overflow-x-auto scrollbar-hide bg-white">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 border-b-3 relative"
              style={{
                borderBottom: isActive
                  ? '3px solid #1a3a6b'
                  : '3px solid transparent',
                color: isActive ? '#1a3a6b' : '#64748b',
                backgroundColor: isActive ? '#eff6ff' : 'transparent',
              }}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
