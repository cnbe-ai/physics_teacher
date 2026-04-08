import { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';

// ===== 자기 동기 점검 데이터 =====
const motivationCheck = [
  {
    id: 'autonomy', label: '자율성', icon: '🧭', color: '#0ea5e9',
    questions: [
      '나는 지금 전공 공부를 "해야 해서"가 아니라 "하고 싶어서" 한다고 느낀다.',
      '이번 주 내가 스스로 선택한 학습 목표나 관심 주제가 있었다.',
      '수업이나 과제에서 나만의 방식으로 접근할 여지가 있다고 느낀다.',
    ],
    tips: [
      '매주 딱 한 가지, 내가 직접 선택한 물리 주제를 15분만 탐색해보세요.',
      '과제 방식을 바꿀 수 없어도, 왜 이걸 배우는지 나만의 이유를 적어보세요.',
      '"나는 왜 이 전공을 선택했는가?"를 다시 써보는 것만으로도 자율감이 회복됩니다.',
    ],
  },
  {
    id: 'competence', label: '유능감', icon: '🏆', color: '#f59e0b',
    questions: [
      '이번 주 공부하면서 "아, 이해됐다!"는 순간이 한 번이라도 있었다.',
      '지난달보다 내가 성장했다는 느낌을 받는다.',
      '어려운 문제를 포기하지 않고 끝까지 해결하려 노력했다.',
    ],
    tips: [
      '오늘 내가 이해한 개념 딱 하나만 노트에 적어두세요. 누적되면 포트폴리오가 됩니다.',
      '지금 어렵다면, 작년 시험 문제 한 문제만 다시 풀어보세요. 성장이 보입니다.',
      '친구에게 오늘 배운 내용을 1분 설명해보면 유능감이 즉시 올라갑니다.',
    ],
  },
  {
    id: 'relatedness', label: '관계성', icon: '🤝', color: '#10b981',
    questions: [
      '학과에 내 고민을 털어놓을 수 있는 사람이 한 명 이상 있다.',
      '이번 주 같은 전공 학생과 공부나 진로에 대한 대화를 나눴다.',
      '이 공동체(학과, 수업)의 일원이라는 소속감을 느낀다.',
    ],
    tips: [
      '카톡이나 문자로 "이번 주 공부 어때?" 한 마디만 먼저 건네보세요.',
      '혼자 도서관보다 카페에서 같은 과 친구와 나란히 공부해보세요.',
      '교수님 오피스아워를 한 번만 방문해보세요. 소속감이 달라집니다.',
    ],
  },
];

const RATINGS = [
  { value: 3, label: '그렇다',    emoji: '😊', color: '#10b981' },
  { value: 2, label: '보통이다',  emoji: '😐', color: '#f59e0b' },
  { value: 1, label: '아니다',    emoji: '😟', color: '#ef4444' },
];

const sdtCards = [
  {
    id: 'autonomy', label: '자율성 (Autonomy)', icon: '🧭', color: '#0ea5e9',
    feeling: '"내가 선택해서 공부한다는 느낌"',
    strategies: ['수업 내 선택권 부여 (주제, 방법, 발표 방식)', '개인 관심 주제로 탐구 보고서 작성', '임용 외 진로도 열린 마음으로 탐색하기', '나만의 학습 계획 수립 및 자기 평가'],
  },
  {
    id: 'competence', label: '유능감 (Competence)', icon: '🏆', color: '#f59e0b',
    feeling: '"내가 성장하고 있다는 느낌"',
    strategies: ['작은 성공 경험 설계 (주차별 목표 달성)', '포트폴리오 누적으로 성장 시각화', '스터디에서 설명하는 역할 담당', '이전보다 향상된 점수/이해도 기록하기'],
  },
  {
    id: 'relatedness', label: '관계성 (Relatedness)', icon: '🤝', color: '#10b981',
    feeling: '"나는 이 공동체에 속해 있다는 느낌"',
    strategies: ['동기 스터디 그룹 구성 (3~5명)', '선배 멘토링 프로그램 참여', '학과 행사, 세미나 적극 참여', '물리교육 관련 동아리·학회 활동'],
  },
];

const semesterTabs = [
  {
    label: '1학기',
    weeks: [
      { week: '1~2주', theme: '오리엔테이션',  activity: '전공 목표 설정, 선배 인터뷰, 학습법 점검' },
      { week: '3~4주', theme: '학업 적응',     activity: '수학·물리 기초 자기 진단, 학습 그룹 형성' },
      { week: '5~6주', theme: '관심 탐색',     activity: '물리 현상 발표, 교사 역할 탐색 영상 시청' },
      { week: '7~8주', theme: '중간 점검',     activity: 'SDT 자기 체크, 슬럼프 원인 분석' },
      { week: '9~10주', theme: '진로 탐색',    activity: '졸업생 특강, 진로 경로 지도 작성' },
      { week: '11~12주', theme: '통합 프로젝트', activity: '소주제 탐구 발표, 동료 피드백' },
      { week: '13~15주', theme: '성찰·계획',   activity: '학기 포트폴리오 작성, 2학기 목표 설정' },
    ],
  },
  {
    label: '2학기',
    weeks: [
      { week: '1~2주',  theme: '심화 진입',  activity: '1학기 회고, 학업·진로 목표 재정립' },
      { week: '3~4주',  theme: 'PCK 입문',   activity: '내가 아는 물리 개념을 어떻게 가르칠까 토론' },
      { week: '5~6주',  theme: '교사 탐색',  activity: '교사 일상 인터뷰, 교육실습 선배 경험 나누기' },
      { week: '7~8주',  theme: '중간 점검',  activity: '자기진단 재시행, 성장 비교 분석' },
      { week: '9~10주', theme: '진로 구체화', activity: '개인 진로 로드맵 초안 작성' },
      { week: '11~12주', theme: '역량 강화', activity: '선택 역량 집중 학습 (임용/대학원/취업 각각)' },
      { week: '13~15주', theme: '1년 성찰',  activity: '연간 성장 보고서, 2학년 목표 선언' },
    ],
  },
];

const slumps = [
  {
    emoji: '😰', title: '"물리가 너무 어려워요"', color: '#ef4444',
    prescription: [
      '지금 막히는 개념을 정확히 특정하세요. "물리 전체"가 어려운 게 아닙니다.',
      '교수님 오피스아워나 튜터링을 적극 활용하세요. 혼자 끙끙대지 마세요.',
      '물리 개념을 누군가에게 설명해보세요. 설명이 막히는 곳이 이해 부족 지점입니다.',
    ],
    reframe: '어려운 물리를 배우는 것이 곧 어려운 물리를 가르치는 사람이 되는 훈련입니다.',
    advice: '"나는 왜 이걸 어렵다고 느낄까?"를 분석하면, 학생도 같은 이유로 어려워한다는 걸 알게 됩니다.',
  },
  {
    emoji: '😟', title: '"임용이 너무 힘들 것 같아요"', color: '#f59e0b',
    prescription: [
      '임용 경쟁률 통계를 직접 확인해보세요 (지역별 차이가 큽니다).',
      '임용 외 6가지 경로를 이 앱의 진로 지도 섹션에서 탐색해보세요.',
      '3학년이 되기 전까지는 임용 준비에 100% 매몰되지 않아도 됩니다.',
    ],
    reframe: 'Plan B가 있으면 오히려 임용 준비를 더 여유롭게 할 수 있습니다.',
    activity: '이번 주: 졸업생 1명에게 연락해서 현재 무엇을 하는지 물어보세요.',
  },
  {
    emoji: '😕', title: '"교사가 제 적성이 아닌 것 같아요"', color: '#8b5cf6',
    prescription: [
      '"교사"의 이미지를 지금보다 훨씬 넓게 보세요. 강의, 멘토링, 연구, 콘텐츠 개발 모두 교육입니다.',
      '교육봉사나 과외를 단 1~2번이라도 경험해보세요. 실제 교수 경험이 판단 근거가 됩니다.',
      '내가 싫어하는 것이 "가르치는 것"인지, "학교 교사의 특정 역할"인지 구분하세요.',
    ],
    reframe: '교사 적성은 타고나는 게 아니라 개발하는 것입니다. PCK도 같은 원리입니다.',
    activity: '이번 달: 물리 유튜브 채널을 10분짜리 영상 하나만 기획해보세요.',
  },
  {
    emoji: '😣', title: '"학과 친구들과 안 맞아요"', color: '#10b981',
    prescription: [
      '모든 학과 친구와 친해져야 한다는 압박에서 벗어나세요.',
      'Tinto(1987)에 따르면 1~3명의 진심 어린 동료가 대학 적응에 충분합니다.',
      '학과 바깥(교양 수업, 동아리)에서 취미 친구를 만드는 것도 좋습니다.',
    ],
    reframe: '소속감은 "모든 사람과 친한 것"이 아니라 "나를 이해해주는 1명"이 있는 것입니다.',
  },
];


function MotivationCheckSection() {
  const totalQ = motivationCheck.reduce((acc, d) => acc + d.questions.length, 0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const answered = Object.keys(answers).length;
  const isComplete = answered === totalQ;

  const getScore = (dimId) => {
    const dim = motivationCheck.find(d => d.id === dimId);
    return dim.questions.reduce((sum, _, qi) => sum + (answers[`${dimId}-${qi}`] || 0), 0);
  };
  const maxPerDim = 9;

  const getLevel = (score) => {
    if (score >= 8) return { label: '양호', color: '#10b981', bg: '#ecfdf5' };
    if (score >= 5) return { label: '보통', color: '#f59e0b', bg: '#fffbeb' };
    return { label: '주의', color: '#ef4444', bg: '#fef2f2' };
  };

  const handleReset = () => { setAnswers({}); setDone(false); };

  return (
    <section>
      <h2 style={{ marginBottom: '0.5rem' }}>🔍 이번 주 나의 동기 점검</h2>
      <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
        SDT 세 가지 욕구가 지금 얼마나 충족되고 있는지 솔직하게 체크해보세요.
        점검 결과에 따라 맞춤 행동 제안을 드립니다.
      </p>

      {!done ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 진행률 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '999px', backgroundColor: '#1a3a6b',
                width: `${(answered / totalQ) * 100}%`, transition: 'width 0.4s ease',
              }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#475569', whiteSpace: 'nowrap' }}>
              {answered} / {totalQ}
            </span>
          </div>

          {/* 문항 카드 */}
          {motivationCheck.map((dim) => (
            <Card key={dim.id} topColor={dim.color}>
              <CardBody>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.375rem', backgroundColor: `${dim.color}15`,
                  }}>
                    {dim.icon}
                  </div>
                  <h3 style={{ fontSize: '1.0625rem', color: '#0f172a', margin: 0 }}>{dim.label}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {dim.questions.map((q, qi) => {
                    const key = `${dim.id}-${qi}`;
                    return (
                      <div key={key}>
                        <p style={{ fontSize: '0.9375rem', color: '#1e293b', lineHeight: 1.7, marginBottom: '0.75rem', fontWeight: 500 }}>
                          {q}
                        </p>
                        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                          {RATINGS.map((r) => {
                            const selected = answers[key] === r.value;
                            return (
                              <button
                                key={r.value}
                                onClick={() => setAnswers(prev => ({ ...prev, [key]: r.value }))}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '2rem',
                                  fontSize: '0.9rem', fontWeight: 600,
                                  border: `2px solid ${selected ? r.color : '#e2e8f0'}`,
                                  backgroundColor: selected ? r.color : '#ffffff',
                                  color: selected ? '#ffffff' : '#64748b',
                                  cursor: 'pointer',
                                  boxShadow: selected ? `0 3px 10px ${r.color}40` : 'none',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                <span style={{ fontSize: '1.05rem' }}>{r.emoji}</span>
                                {r.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          ))}

          <button
            onClick={() => isComplete && setDone(true)}
            disabled={!isComplete}
            style={{
              padding: '1rem 1.5rem', borderRadius: '0.75rem',
              fontWeight: 700, fontSize: '1.0625rem', color: '#ffffff',
              backgroundColor: isComplete ? '#1a3a6b' : '#94a3b8',
              border: 'none',
              boxShadow: isComplete ? '0 4px 14px rgba(26,58,107,0.35)' : 'none',
              cursor: isComplete ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {isComplete ? '📊 점검 결과 보기' : `아직 ${totalQ - answered}개 항목이 남았습니다`}
          </button>
        </div>
      ) : (
        <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {/* 요약 배너 */}
          <div style={{
            borderRadius: '1rem', padding: '1.5rem 2rem',
            background: 'linear-gradient(135deg, #1a3a6b, #0ea5e9)',
            color: '#ffffff',
          }}>
            <h3 style={{ color: '#ffffff', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', fontSize: '1.125rem' }}>
              이번 주 나의 동기 상태
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {motivationCheck.map((dim) => {
                const score = getScore(dim.id);
                const lv = getLevel(score);
                return (
                  <div key={dim.id} style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '0.75rem', padding: '0.625rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>{dim.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{dim.label}</p>
                      <p style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', margin: 0 }}>
                        {score}/{maxPerDim}
                        <span style={{
                          marginLeft: '0.5rem', fontSize: '0.75rem', fontWeight: 700,
                          padding: '0.1rem 0.5rem', borderRadius: '2rem',
                          backgroundColor: lv.color, color: '#ffffff',
                        }}>
                          {lv.label}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 영역별 피드백 */}
          {motivationCheck.map((dim) => {
            const score = getScore(dim.id);
            const lv = getLevel(score);
            const pct = Math.round((score / maxPerDim) * 100);
            const needsAttention = score < 5;
            return (
              <Card key={dim.id} topColor={dim.color}>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{dim.icon}</span>
                    <h3 style={{ flex: 1, margin: 0, fontSize: '1.0625rem' }}>{dim.label}</h3>
                    <span style={{
                      fontSize: '0.8125rem', fontWeight: 700,
                      padding: '0.25rem 0.75rem', borderRadius: '2rem',
                      backgroundColor: lv.bg, color: lv.color,
                      border: `1px solid ${lv.color}40`,
                    }}>
                      {lv.label}
                    </span>
                  </div>

                  {/* 점수 바 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1, height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '999px',
                        width: `${pct}%`, backgroundColor: lv.color,
                        transition: 'width 0.7s ease',
                      }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: lv.color, minWidth: '3.5rem', textAlign: 'right' }}>
                      {score}/{maxPerDim}
                    </span>
                  </div>

                  {/* 행동 제안 (주의 영역만 강조) */}
                  <div style={{
                    borderRadius: '0.625rem', padding: '0.875rem 1rem',
                    backgroundColor: needsAttention ? `${dim.color}10` : '#f8fafc',
                    border: `1px solid ${needsAttention ? dim.color + '30' : '#e2e8f0'}`,
                  }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#94a3b8',
                      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.625rem' }}>
                      {needsAttention ? '🎯 지금 바로 해볼 행동' : '✅ 잘 되고 있어요! 유지 팁'}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {dim.tips.map((tip, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.7 }}>
                          <span style={{ color: dim.color, flexShrink: 0, fontWeight: 700 }}>•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            );
          })}

          <button
            onClick={handleReset}
            style={{
              padding: '0.875rem 1.5rem', borderRadius: '0.75rem',
              fontWeight: 600, fontSize: '0.9375rem',
              color: '#475569', backgroundColor: '#ffffff',
              border: '2px solid #e2e8f0', cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            🔄 다시 점검하기
          </button>
        </div>
      )}
    </section>
  );
}

export default function MotivationPage() {
  const [activeSemester, setActiveSemester] = useState(0);

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* SDT */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>💪 자기결정이론(SDT)으로 동기 설계하기</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          Deci & Ryan(1985)의 SDT에 따르면, 세 가지 심리적 욕구가 충족될 때 내재 동기가 높아집니다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.125rem' }}>
          {sdtCards.map((card) => (
            <Card key={card.id} topColor={card.color} hover>
              <CardBody>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.875rem' }}>{card.icon}</div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.0625rem', color: '#0f172a' }}>{card.label}</h3>
                <p style={{ fontSize: '0.9375rem', fontStyle: 'italic', color: card.color, marginBottom: '1.125rem', lineHeight: 1.5 }}>
                  {card.feeling}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {card.strategies.map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.65 }}>
                      <span style={{ color: card.color, flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Semester Roadmap */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>📅 학기별 동기 로드맵</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          주차별로 어떤 활동에 집중해야 하는지 확인하세요.
        </p>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem' }}>
          {semesterTabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSemester(idx)}
              style={{
                padding: '0.625rem 1.5rem',
                borderRadius: '0.625rem',
                fontSize: '0.9375rem', fontWeight: 700,
                border: `2px solid ${activeSemester === idx ? '#1a3a6b' : '#e2e8f0'}`,
                backgroundColor: activeSemester === idx ? '#1a3a6b' : '#ffffff',
                color: activeSemester === idx ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: activeSemester === idx ? '0 3px 10px rgba(26,58,107,0.25)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '7rem' }}>주차</th>
                  <th>주제</th>
                  <th>핵심 활동</th>
                </tr>
              </thead>
              <tbody>
                {semesterTabs[activeSemester].weeks.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {row.week}
                    </td>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{row.theme}</td>
                    <td style={{ color: '#475569' }}>{row.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Slumps */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>💊 슬럼프 처방전</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
          지금 겪고 있는 어려움을 선택하세요.
        </p>
        <div>
          {slumps.map((slump, idx) => (
            <Accordion key={idx} title={`${slump.emoji} ${slump.title}`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
                    📋 처방
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {slump.prescription.map((p, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.625rem', fontSize: '0.9375rem', color: '#334155', lineHeight: 1.7 }}>
                        <span style={{ color: '#10b981', flexShrink: 0, marginTop: '0.125rem', fontWeight: 700 }}>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{
                  borderRadius: '0.625rem', padding: '0.875rem 1rem',
                  backgroundColor: '#eff6ff', border: '1px solid #bfdbfe',
                }}>
                  <p style={{ fontSize: '0.9375rem', color: '#1d4ed8', lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 700 }}>🔄 재프레이밍: </span>
                    {slump.reframe}
                  </p>
                </div>
                {(slump.advice || slump.activity) && (
                  <div style={{
                    borderRadius: '0.625rem', padding: '0.875rem 1rem',
                    backgroundColor: '#fffbeb', border: '1px solid #fde68a',
                  }}>
                    <p style={{ fontSize: '0.9375rem', color: '#92400e', lineHeight: 1.7 }}>
                      <span style={{ fontWeight: 700 }}>{slump.advice ? '💡 조언: ' : '🎯 활동 제안: '}</span>
                      {slump.advice || slump.activity}
                    </p>
                  </div>
                )}
              </div>
            </Accordion>
          ))}
        </div>
      </section>

      {/* 자기 동기 점검 */}
      <MotivationCheckSection />
    </div>
  );
}
