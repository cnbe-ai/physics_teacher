import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { careerPaths, licensureInfo } from '../data/careerData';

function CareerCard({ path }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer transition-all duration-300"
      style={{
        borderTopWidth: '3px',
        borderTopColor: path.color,
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 12px 30px -5px ${path.color}30` : '0 1px 3px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-white p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{path.icon}</div>
          <Badge color={path.badgeColor}>{path.badge}</Badge>
        </div>
        <h3 className="font-bold text-slate-800 mb-1">{path.title}</h3>
        <p className="text-sm text-slate-500 mb-3">{path.subtitle}</p>
        <p className="text-sm text-slate-600 leading-relaxed">{path.description}</p>

        {/* Details on hover */}
        <div
          className="mt-4 space-y-1.5 overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? '200px' : '0', opacity: hovered ? 1 : 0 }}
        >
          {path.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
              <span style={{ color: path.color }} className="mt-0.5">•</span>
              {detail}
            </div>
          ))}
          <div
            className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-lg inline-block"
            style={{ backgroundColor: `${path.color}15`, color: path.color }}
          >
            💡 {path.action}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareerPage() {
  return (
    <div className="page-enter space-y-10">
      {/* Header */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          🎯 졸업 후 6가지 경로
        </h2>
        <p className="text-slate-500 mb-6">임용고시 합격만이 유일한 길이 아닙니다. 각 카드에 마우스를 올려 상세 정보를 확인하세요.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {careerPaths.map((path) => (
            <CareerCard key={path.id} path={path} />
          ))}
        </div>
      </section>

      {/* Licensure Balance */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          ⚖️ 임용고시, 균형 잡힌 시각으로 보기
        </h2>
        <p className="text-slate-500 mb-6">임용고시를 포기하란 말이 아닙니다. 다만 현실을 냉정하게 직시하고 전략적으로 준비하세요.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {licensureInfo.map((item, idx) => (
            <Card key={idx} topColor="#1a3a6b">
              <CardBody>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">{item.category}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Inspiration Quote */}
      <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-6">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🌟</span>
          <div>
            <h3 className="font-bold text-amber-800 mb-2">물리교육과 졸업생의 강점</h3>
            <p className="text-amber-700 leading-relaxed text-sm">
              물리교육과를 졸업한 사람은 <strong>복잡한 개념을 단순하게 설명하는 능력</strong>,
              <strong> 논리적 사고력</strong>, <strong>교육적 감수성</strong>을 동시에 갖춘 희귀한 인재입니다.
              이는 교육 현장 밖에서도 매우 가치 있는 역량입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
