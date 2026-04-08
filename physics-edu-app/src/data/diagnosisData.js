export const diagnosisAreas = [
  {
    id: 'A',
    label: '물리에 대한 지적 호기심',
    icon: '⚛️',
    color: '#0ea5e9',
    questions: [
      { id: 'A1', text: '물리 현상을 보면 왜 그런지 궁금하다' },
      { id: 'A2', text: '어려운 물리 문제를 풀었을 때 성취감을 느낀다' },
      { id: 'A3', text: '물리 뉴스나 유튜브 영상을 찾아보는 편이다' },
    ],
  },
  {
    id: 'B',
    label: '가르침에 대한 관심',
    icon: '🎓',
    color: '#1a3a6b',
    questions: [
      { id: 'B1', text: '친구나 동생에게 무언가를 설명해줄 때 즐겁다' },
      { id: 'B2', text: '상대방이 이해했을 때 보람을 느낀다' },
      { id: 'B3', text: '어떻게 설명하면 더 잘 이해할까 고민해본 적 있다' },
    ],
  },
  {
    id: 'C',
    label: '교직에 대한 이해',
    icon: '🏫',
    color: '#7c3aed',
    questions: [
      { id: 'C1', text: '교사의 일상과 역할에 대해 현실적으로 알고 있다' },
      { id: 'C2', text: '교사 외 교육 관련 직업군에 대해 알고 있다' },
      { id: 'C3', text: '임용 외의 진로 경로에 대해 생각해본 적 있다' },
    ],
  },
  {
    id: 'D',
    label: '학습 탄력성',
    icon: '💪',
    color: '#f59e0b',
    questions: [
      { id: 'D1', text: '어려운 과목도 방법을 바꿔가며 끝까지 공부한다' },
      { id: 'D2', text: '실패 후 원인을 분석하고 재시도하는 편이다' },
      { id: 'D3', text: '도움을 요청하는 것을 부끄럽게 여기지 않는다' },
    ],
  },
  {
    id: 'E',
    label: '공동체 참여 의지',
    icon: '🤝',
    color: '#10b981',
    questions: [
      { id: 'E1', text: '팀 프로젝트나 스터디에 적극 참여하는 편이다' },
      { id: 'E2', text: '학과 행사나 모임에 참여할 의향이 있다' },
      { id: 'E3', text: '선배나 교수에게 먼저 다가갈 수 있다' },
    ],
  },
];

export const scoreInterpretations = [
  {
    range: '60~75점',
    min: 60,
    max: 75,
    label: '준비된 탐험가',
    color: '#10b981',
    message: '물리교육과에서 성장할 훌륭한 잠재력을 갖추고 있습니다! 낮은 영역에 집중하여 균형 잡힌 성장을 이루세요.',
  },
  {
    range: '45~59점',
    min: 45,
    max: 59,
    label: '성장 중인 탐험가',
    color: '#f59e0b',
    message: '충분히 성장할 수 있는 기반이 있습니다. 점수가 낮은 영역부터 하나씩 집중적으로 개발해 나가세요.',
  },
  {
    range: '15~44점',
    min: 15,
    max: 44,
    label: '탐색이 필요한 탐험가',
    color: '#ef4444',
    message: '물리교육과에 대한 탐색이 더 필요합니다. AI 상담을 통해 구체적인 방향을 함께 찾아보세요.',
  },
];
