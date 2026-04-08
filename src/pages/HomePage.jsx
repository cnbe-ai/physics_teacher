import { AlertTriangle, TrendingDown, HelpCircle, Users, BookOpen } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';

const crisisTimeline = [
  { time: '입학 → 1학기 초', crisis: '"생각보다 물리가 어렵다"', type: '학업 위기', color: '#ef4444', icon: '📚', desc: '고교 물리와 대학 물리의 수준 차이에서 오는 충격' },
  { time: '1학기 중',        crisis: '"임용 경쟁률이 너무 높다"', type: '진로 불안', color: '#f59e0b', icon: '😰', desc: '임용고시의 높은 경쟁률에 대한 정보가 들어오기 시작' },
  { time: '1학기 말',        crisis: '"내가 교사가 맞나?"',        type: '정체성 혼란', color: '#8b5cf6', icon: '🤔', desc: '교사 적성에 대한 의문과 전공 정체성 흔들림' },
  { time: '2학기',           crisis: '"다른 과 친구들은 취업 준비 잘 하던데"', type: '비교 불안', color: '#0ea5e9', icon: '😟', desc: '타 전공 대비 상대적 박탈감과 불확실성' },
  { time: '1학년 말',        crisis: '전과·편입 고민 본격화',     type: '이탈 위기', color: '#1a3a6b', icon: '🚨', desc: '이탈을 구체적으로 행동으로 옮기려는 단계' },
];

const exitTypes = [
  { type: '학업 위기형',   complaint: '물리를 못하겠어요',             root: '고교-대학 학습법 전환 실패',        icon: <BookOpen size={16} />, color: '#ef4444' },
  { type: '진로 불안형',   complaint: '임용고시 합격이 너무 어려워요', root: '임용 외 경로에 대한 정보 부족',     icon: <TrendingDown size={16} />, color: '#f59e0b' },
  { type: '정체성 혼란형', complaint: '저는 교사 체질이 아닌 것 같아요', root: '교사 역할에 대한 편협한 이해',    icon: <HelpCircle size={16} />, color: '#8b5cf6' },
  { type: '비교 불안형',   complaint: '친구들은 다 취업 준비하는데…', root: '전공의 가치에 대한 확신 부족',      icon: <AlertTriangle size={16} />, color: '#0ea5e9' },
  { type: '소속감 결여형', complaint: '학과에 친한 사람이 없어요',     root: '학습 공동체 경험 부재',             icon: <Users size={16} />, color: '#10b981' },
];

export default function HomePage() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* Hero */}
      <section
        style={{
          borderRadius: '1.25rem',
          background: 'linear-gradient(135deg, #1a3a6b 0%, #0ea5e9 100%)',
          padding: '3rem 2.5rem',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '2rem',
            padding: '0.375rem 1rem',
            marginBottom: '1.25rem',
          }}
        >
          물리교육학 교수팀 제공
        </div>
        <h1 style={{ color: '#ffffff', fontSize: '1.875rem', lineHeight: 1.35, marginBottom: '0.875rem' }}>
          물리교육과에서 살아남는 법이 아니라,<br />
          <span style={{ color: '#fcd34d' }}>성장하는 법</span>
        </h1>
        <p style={{ color: '#bfdbfe', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
          전공 탐색 및 진로 설계 | 물리교육과 신입생을 위한 안내서
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
          {['PCK 기반 전공 교육', 'SDT 동기 설계', '다양한 진로 경로', 'AI 진로 상담'].map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '2rem',
                padding: '0.375rem 0.875rem',
                fontSize: '0.875rem',
                color: '#ffffff',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Crisis Timeline */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>🚨 1학년이 겪는 위기 타임라인</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
          많은 물리교육과 신입생이 비슷한 경로로 위기를 경험합니다. 당신만 겪는 일이 아닙니다.
        </p>

        <div style={{ position: 'relative' }}>
          {/* 세로선 */}
          <div style={{
            position: 'absolute', left: '1.4rem', top: '2rem', bottom: '2rem',
            width: '2px', backgroundColor: '#e2e8f0',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {crisisTimeline.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                {/* 타임라인 아이콘 */}
                <div style={{
                  position: 'relative', zIndex: 1, flexShrink: 0,
                  width: '2.875rem', height: '2.875rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem',
                  backgroundColor: `${item.color}18`,
                  border: `2px solid ${item.color}`,
                  boxShadow: `0 2px 8px ${item.color}30`,
                }}>
                  {item.icon}
                </div>

                {/* 카드 */}
                <div style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                  borderRadius: '0.875rem',
                  border: `1px solid #e8edf3`,
                  borderLeft: `4px solid ${item.color}`,
                  padding: '1rem 1.25rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 500 }}>{item.time}</span>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 700,
                      padding: '0.2rem 0.625rem', borderRadius: '2rem',
                      backgroundColor: `${item.color}15`, color: item.color,
                    }}>
                      {item.type}
                    </span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b', marginBottom: '0.375rem' }}>
                    {item.crisis}
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exit Types */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>🔍 이탈 원인 유형 분석</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
          호소하는 내용의 표면 아래에는 다른 근원적 원인이 있습니다.
        </p>

        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>유형</th>
                  <th>주요 호소 내용</th>
                  <th>실제 근원</th>
                </tr>
              </thead>
              <tbody>
                {exitTypes.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: row.color }}>{row.icon}</span>
                        <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9375rem' }}>{row.type}</span>
                      </div>
                    </td>
                    <td style={{ fontStyle: 'italic', color: '#475569' }}>"{row.complaint}"</td>
                    <td>
                      <span style={{
                        display: 'inline-block', fontSize: '0.8125rem', fontWeight: 600,
                        padding: '0.25rem 0.625rem', borderRadius: '0.375rem',
                        backgroundColor: `${row.color}12`, color: row.color,
                      }}>
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
        <div style={{
          marginTop: '1.5rem', borderRadius: '0.875rem',
          borderLeft: '4px solid #0ea5e9',
          backgroundColor: '#eff6ff', padding: '1.25rem 1.5rem',
        }}>
          <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>💬</span>
            <div>
              <p style={{ color: '#1e40af', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.75, fontSize: '1rem' }}>
                "이탈의 핵심 원인은 학문적 통합(academic integration)과 사회적 통합(social integration)의 동시 실패입니다."
              </p>
              <p style={{ color: '#93c5fd', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                — Tinto, V. (1987). <em>Leaving College</em>. University of Chicago Press.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section>
        <h2 style={{ marginBottom: '1.5rem' }}>✅ 이 앱으로 할 수 있는 것</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { icon: '🗺️', title: '전공 로드맵 탐색', desc: '4년 커리큘럼과 PCK 개념을 시각적으로 이해합니다' },
            { icon: '🎯', title: '다양한 진로 발견', desc: '임용 너머의 6가지 현실적 경로를 탐색합니다' },
            { icon: '📋', title: '자기 진단 실시',  desc: '5개 영역 체크리스트로 현재 상태를 파악합니다' },
          ].map((item) => (
            <Card key={item.title} topColor="#0ea5e9" hover>
              <CardBody>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.875rem' }}>{item.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.0625rem' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.7 }}>{item.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
