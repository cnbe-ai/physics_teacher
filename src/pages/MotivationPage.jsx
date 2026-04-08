import { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';

const sdtCards = [
  {
    id: 'autonomy',
    label: '자율성 (Autonomy)',
    icon: '🧭',
    color: '#0ea5e9',
    feeling: '"내가 선택해서 공부한다는 느낌"',
    strategies: [
      '수업 내 선택권 부여 (주제, 방법, 발표 방식)',
      '개인 관심 주제로 탐구 보고서 작성',
      '임용 외 진로도 열린 마음으로 탐색하기',
      '나만의 학습 계획 수립 및 자기 평가',
    ],
  },
  {
    id: 'competence',
    label: '유능감 (Competence)',
    icon: '🏆',
    color: '#f59e0b',
    feeling: '"내가 성장하고 있다는 느낌"',
    strategies: [
      '작은 성공 경험 설계 (주차별 목표 달성)',
      '포트폴리오 누적으로 성장 시각화',
      '스터디에서 설명하는 역할 담당',
      '이전보다 향상된 점수/이해도 기록하기',
    ],
  },
  {
    id: 'relatedness',
    label: '관계성 (Relatedness)',
    icon: '🤝',
    color: '#10b981',
    feeling: '"나는 이 공동체에 속해 있다는 느낌"',
    strategies: [
      '동기 스터디 그룹 구성 (3~5명)',
      '선배 멘토링 프로그램 참여',
      '학과 행사, 세미나 적극 참여',
      '물리교육 관련 동아리·학회 활동',
    ],
  },
];

const semesterTabs = [
  {
    label: '1학기',
    weeks: [
      { week: '1~2주', theme: '오리엔테이션', activity: '전공 목표 설정, 선배 인터뷰, 학습법 점검' },
      { week: '3~4주', theme: '학업 적응', activity: '수학·물리 기초 자기 진단, 학습 그룹 형성' },
      { week: '5~6주', theme: '관심 탐색', activity: '물리 현상 발표, 교사 역할 탐색 영상 시청' },
      { week: '7~8주', theme: '중간 점검', activity: 'SDT 자기 체크, 슬럼프 원인 분석' },
      { week: '9~10주', theme: '진로 탐색', activity: '졸업생 특강, 진로 경로 지도 작성' },
      { week: '11~12주', theme: '통합 프로젝트', activity: '소주제 탐구 발표, 동료 피드백' },
      { week: '13~15주', theme: '성찰·계획', activity: '학기 포트폴리오 작성, 2학기 목표 설정' },
    ],
  },
  {
    label: '2학기',
    weeks: [
      { week: '1~2주', theme: '심화 진입', activity: '1학기 회고, 학업·진로 목표 재정립' },
      { week: '3~4주', theme: 'PCK 입문', activity: '내가 아는 물리 개념을 어떻게 가르칠까 토론' },
      { week: '5~6주', theme: '교사 탐색', activity: '교사 일상 인터뷰, 교육실습 선배 경험 나누기' },
      { week: '7~8주', theme: '중간 점검', activity: '자기진단 재시행, 성장 비교 분석' },
      { week: '9~10주', theme: '진로 구체화', activity: '개인 진로 로드맵 초안 작성' },
      { week: '11~12주', theme: '역량 강화', activity: '선택 역량 집중 학습 (임용/대학원/취업 각각)' },
      { week: '13~15주', theme: '1년 성찰', activity: '연간 성장 보고서, 2학년 목표 선언' },
    ],
  },
];

const slumps = [
  {
    emoji: '😰',
    title: '"물리가 너무 어려워요"',
    color: '#ef4444',
    prescription: [
      '지금 막히는 개념을 정확히 특정하세요. "물리 전체"가 어려운 게 아닙니다.',
      '교수님 오피스아워나 튜터링을 적극 활용하세요. 혼자 끙끙대지 마세요.',
      '물리 개념을 누군가에게 설명해보세요. 설명이 막히는 곳이 이해 부족 지점입니다.',
    ],
    reframe: '어려운 물리를 배우는 것이 곧 어려운 물리를 가르치는 사람이 되는 훈련입니다.',
    advice: '"나는 왜 이걸 어렵다고 느낄까?"를 분석하면, 학생도 같은 이유로 어려워한다는 걸 알게 됩니다.',
  },
  {
    emoji: '😟',
    title: '"임용이 너무 힘들 것 같아요"',
    color: '#f59e0b',
    prescription: [
      '임용 경쟁률 통계를 직접 확인해보세요 (지역별 차이가 큽니다).',
      '임용 외 6가지 경로를 이 앱의 진로 지도 섹션에서 탐색해보세요.',
      '3학년이 되기 전까지는 임용 준비에 100% 매몰되지 않아도 됩니다.',
    ],
    reframe: 'Plan B가 있으면 오히려 임용 준비를 더 여유롭게 할 수 있습니다.',
    activity: '이번 주: 졸업생 1명에게 연락해서 현재 무엇을 하는지 물어보세요.',
  },
  {
    emoji: '😕',
    title: '"교사가 제 적성이 아닌 것 같아요"',
    color: '#8b5cf6',
    prescription: [
      '"교사"의 이미지를 지금보다 훨씬 넓게 보세요. 강의, 멘토링, 연구, 콘텐츠 개발 모두 교육입니다.',
      '교육봉사나 과외를 단 1~2번이라도 경험해보세요. 실제 교수 경험이 판단 근거가 됩니다.',
      '내가 싫어하는 것이 "가르치는 것"인지, "학교 교사의 특정 역할"인지 구분하세요.',
    ],
    reframe: '교사 적성은 타고나는 게 아니라 개발하는 것입니다. PCK도 같은 원리입니다.',
    activity: '이번 달: 물리 유튜브 채널을 10분짜리 영상 하나만 기획해보세요.',
  },
  {
    emoji: '😣',
    title: '"학과 친구들과 안 맞아요"',
    color: '#10b981',
    prescription: [
      '모든 학과 친구와 친해져야 한다는 압박에서 벗어나세요.',
      'Tinto(1987)에 따르면 1~3명의 진심 어린 동료가 대학 적응에 충분합니다.',
      '학과 바깥(교양 수업, 동아리)에서 취미 친구를 만드는 것도 좋습니다.',
    ],
    reframe: '소속감은 "모든 사람과 친한 것"이 아니라 "나를 이해해주는 1명"이 있는 것입니다.',
  },
];

const courseRoadmap = [
  { session: '1', theme: '나는 왜 물리교육과인가', activity: '자기 소개 + 진로 기대 나누기' },
  { session: '2', theme: '대학 물리, 고교 물리와 뭐가 다른가', activity: '학습법 전환 워크숍' },
  { session: '3', theme: 'Tinto 모형으로 보는 대학 적응', activity: '위기 타임라인 자기 분석' },
  { session: '4', theme: 'PCK란 무엇인가', activity: 'Shulman 논문 핵심 읽기 + 토론' },
  { session: '5', theme: '임용 이외의 진로 탐색', activity: '진로 경로 맵 작성' },
  { session: '6', theme: 'SDT와 내재 동기', activity: '나의 동기 유형 진단' },
  { session: '7', theme: '슬럼프 처방전', activity: '개인 슬럼프 분석 및 처방 작성' },
  { session: '8', theme: '중간 자기진단', activity: '5개 영역 자기진단 실시 + 분석' },
  { session: '9', theme: '물리교사의 전문성', activity: '물리 수업 관찰 + PCK 분석' },
  { session: '10', theme: '교육 연구 맛보기', activity: '물리교육 논문 1편 읽기 + 발표' },
  { session: '11', theme: '졸업생 특강', activity: '다양한 진로의 선배 패널 토크' },
  { session: '12', theme: '커뮤니티 만들기', activity: '스터디 그룹 구성 + 학습 계약' },
  { session: '13', theme: '나의 교육 철학 초안', activity: '교육 철학 서술 워크숍' },
  { session: '14', theme: '진로 로드맵 발표', activity: '개인 진로 계획 발표 및 피드백' },
  { session: '15', theme: '성찰과 다짐', activity: '포트폴리오 제출 + 2학기 목표 선언' },
];

export default function MotivationPage() {
  const [activeSemester, setActiveSemester] = useState(0);

  return (
    <div className="page-enter space-y-10">
      {/* SDT Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          💪 자기결정이론(SDT)으로 동기 설계하기
        </h2>
        <p className="text-slate-500 mb-6">Deci & Ryan(1985)의 SDT에 따르면, 세 가지 심리적 욕구가 충족될 때 내재 동기가 높아집니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sdtCards.map((card) => (
            <Card key={card.id} topColor={card.color} className="card-hover">
              <CardBody>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-slate-800 mb-1">{card.label}</h3>
                <p className="text-sm italic mb-4" style={{ color: card.color }}>{card.feeling}</p>
                <ul className="space-y-2">
                  {card.strategies.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span style={{ color: card.color }} className="mt-0.5 flex-shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Semester Motivation Roadmap */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          📅 학기별 동기 로드맵
        </h2>
        <p className="text-slate-500 mb-5">주차별로 어떤 활동에 집중해야 하는지 확인하세요.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {semesterTabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSemester(idx)}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: activeSemester === idx ? '#1a3a6b' : '#f1f5f9',
                color: activeSemester === idx ? '#ffffff' : '#64748b',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-24">주차</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">주제</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">핵심 활동</th>
                </tr>
              </thead>
              <tbody>
                {semesterTabs[activeSemester].weeks.map((row, idx) => (
                  <tr key={idx} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${idx === semesterTabs[activeSemester].weeks.length - 1 ? 'border-0' : ''}`}>
                    <td className="p-4 font-mono text-xs text-slate-400 whitespace-nowrap">{row.week}</td>
                    <td className="p-4 font-semibold text-slate-700">{row.theme}</td>
                    <td className="p-4 text-slate-500">{row.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Slump Prescriptions */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          💊 슬럼프 처방전
        </h2>
        <p className="text-slate-500 mb-5">지금 겪고 있는 어려움을 선택하세요.</p>

        <div className="space-y-3">
          {slumps.map((slump, idx) => (
            <Accordion
              key={idx}
              title={`${slump.emoji} ${slump.title}`}
              icon={null}
            >
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-slate-700 mb-2 text-sm">📋 처방</h5>
                  <ul className="space-y-2">
                    {slump.prescription.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg p-3 bg-blue-50 border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">🔄 재프레이밍: </span>
                    {slump.reframe}
                  </p>
                </div>
                {(slump.advice || slump.activity) && (
                  <div className="rounded-lg p-3 bg-amber-50 border border-amber-100">
                    <p className="text-sm text-amber-700">
                      <span className="font-bold">{slump.advice ? '💡 조언: ' : '🎯 활동 제안: '}</span>
                      {slump.advice || slump.activity}
                    </p>
                  </div>
                )}
              </div>
            </Accordion>
          ))}
        </div>
      </section>

      {/* 15-Week Course Roadmap */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          📆 수업 15주 로드맵
        </h2>
        <p className="text-slate-500 mb-5">전공 탐색 및 진로 설계 수업 전체 구성입니다.</p>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-center p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide w-16">회차</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">주제</th>
                  <th className="text-left p-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">핵심 활동</th>
                </tr>
              </thead>
              <tbody>
                {courseRoadmap.map((row, idx) => (
                  <tr key={idx} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${idx === courseRoadmap.length - 1 ? 'border-0' : ''}`}>
                    <td className="p-4 text-center">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: '#1a3a6b' }}
                      >
                        {row.session}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">{row.theme}</td>
                    <td className="p-4 text-slate-500">{row.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
