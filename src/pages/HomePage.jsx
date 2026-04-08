import { AlertTriangle, TrendingDown, HelpCircle, Users, LogOut, BookOpen } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';

const crisisTimeline = [
  {
    time: '입학 → 1학기 초',
    crisis: '"생각보다 물리가 어렵다"',
    type: '학업 위기',
    color: '#ef4444',
    icon: '📚',
    desc: '고교 물리와 대학 물리의 수준 차이에서 오는 충격',
  },
  {
    time: '1학기 중',
    crisis: '"임용 경쟁률이 너무 높다"',
    type: '진로 불안',
    color: '#f59e0b',
    icon: '😰',
    desc: '임용고시의 높은 경쟁률에 대한 정보가 들어오기 시작',
  },
  {
    time: '1학기 말',
    crisis: '"내가 교사가 맞나?"',
    type: '정체성 혼란',
    color: '#8b5cf6',
    icon: '🤔',
    desc: '교사 적성에 대한 의문과 전공 정체성 흔들림',
  },
  {
    time: '2학기',
    crisis: '"다른 과 친구들은 취업 준비 잘 하던데"',
    type: '비교 불안',
    color: '#0ea5e9',
    icon: '😟',
    desc: '타 전공 대비 상대적 박탈감과 불확실성',
  },
  {
    time: '1학년 말',
    crisis: '전과·편입 고민 본격화',
    type: '이탈 위기',
    color: '#1a3a6b',
    icon: '🚨',
    desc: '이탈을 구체적으로 행동으로 옮기려는 단계',
  },
];

const exitTypes = [
  {
    type: '학업 위기형',
    complaint: '"물리를 못하겠어요"',
    root: '고교-대학 학습법 전환 실패',
    icon: <BookOpen size={18} />,
    color: '#ef4444',
  },
  {
    type: '진로 불안형',
    complaint: '"임용고시 합격이 너무 어려워요"',
    root: '임용 외 경로에 대한 정보 부족',
    icon: <TrendingDown size={18} />,
    color: '#f59e0b',
  },
  {
    type: '정체성 혼란형',
    complaint: '"저는 교사 체질이 아닌 것 같아요"',
    root: '교사 역할에 대한 편협한 이해',
    icon: <HelpCircle size={18} />,
    color: '#8b5cf6',
  },
  {
    type: '비교 불안형',
    complaint: '"친구들은 다 취업 준비하는데…"',
    root: '전공의 가치에 대한 확신 부족',
    icon: <AlertTriangle size={18} />,
    color: '#0ea5e9',
  },
  {
    type: '소속감 결여형',
    complaint: '"학과에 친한 사람이 없어요"',
    root: '학습 공동체 경험 부재',
    icon: <Users size={18} />,
    color: '#10b981',
  },
];

export default function HomePage() {
  return (
    <div className="page-enter space-y-10">
      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #0ea5e9 100%)' }}>
        <div className="px-8 py-14 text-white">
          <div className="inline-block text-xs font-semibold tracking-widest bg-white/20 rounded-full px-4 py-1 mb-6 uppercase">
            물리교육학 교수팀 제공
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Noto Serif KR, serif' }}>
            물리교육과에서 살아남는 법이 아니라,<br />
            <span className="text-yellow-300">성장하는 법</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            전공 탐색 및 진로 설계 | 물리교육과 신입생을 위한 안내서
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {['PCK 기반 전공 교육', 'SDT 동기 설계', '다양한 진로 경로', 'AI 진로 상담'].map((tag) => (
              <span key={tag} className="bg-white/15 text-white text-sm px-4 py-1.5 rounded-full border border-white/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Timeline */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          🚨 1학년이 겪는 위기 타임라인
        </h2>
        <p className="text-slate-500 mb-6">많은 물리교육과 신입생이 비슷한 경로로 위기를 경험합니다. 당신만 겪는 일이 아닙니다.</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block" />

          <div className="space-y-4">
            {crisisTimeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div
                  className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md"
                  style={{ backgroundColor: `${item.color}15`, border: `2px solid ${item.color}` }}
                >
                  {item.icon}
                </div>
                <Card className="flex-1" topColor={item.color}>
                  <CardBody className="py-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs text-slate-500 font-medium">{item.time}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800 mb-1">{item.crisis}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exit Types Table */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          🔍 이탈 원인 유형 분석
        </h2>
        <p className="text-slate-500 mb-6">호소하는 내용의 표면 아래에는 다른 근원적 원인이 있습니다.</p>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left p-4 font-semibold text-slate-500 uppercase text-xs tracking-wide">유형</th>
                  <th className="text-left p-4 font-semibold text-slate-500 uppercase text-xs tracking-wide">주요 호소 내용</th>
                  <th className="text-left p-4 font-semibold text-slate-500 uppercase text-xs tracking-wide">실제 근원</th>
                </tr>
              </thead>
              <tbody>
                {exitTypes.map((row, idx) => (
                  <tr key={idx} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${idx === exitTypes.length - 1 ? 'border-0' : ''}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span style={{ color: row.color }}>{row.icon}</span>
                        <span className="font-semibold text-slate-700">{row.type}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 italic">"{row.complaint.replace(/"/g, '')}"</td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{ backgroundColor: `${row.color}10`, color: row.color }}
                      >
                        {row.root}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tinto Quote */}
        <div className="mt-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-slate-700 font-medium italic leading-relaxed">
                "이탈의 핵심 원인은 학문적 통합(academic integration)과 사회적 통합(social integration)의 동시 실패입니다."
              </p>
              <p className="text-slate-400 text-sm mt-2">— Tinto, V. (1987). <em>Leaving College</em>. University of Chicago Press.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          ✅ 이 앱으로 할 수 있는 것
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🗺️', title: '전공 로드맵 탐색', desc: '4년 커리큘럼과 PCK 개념을 시각적으로 이해합니다', tab: '로드맵' },
            { icon: '🎯', title: '다양한 진로 발견', desc: '임용 너머의 6가지 현실적 경로를 탐색합니다', tab: '진로' },
            { icon: '📋', title: '자기 진단 실시', desc: '5개 영역 체크리스트로 현재 상태를 파악합니다', tab: '진단' },
          ].map((item) => (
            <Card key={item.title} className="card-hover" topColor="#0ea5e9">
              <CardBody>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
