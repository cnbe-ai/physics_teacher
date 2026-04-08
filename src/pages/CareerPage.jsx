import { useState } from 'react';
import { Card, CardBody } from '../components/ui/Card';
import { careerPaths, licensureInfo } from '../data/careerData';

function CareerCard({ path }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '1rem',
        backgroundColor: '#ffffff',
        border: `1.5px solid ${hovered ? path.color + '50' : '#e2e8f0'}`,
        borderTop: `4px solid ${path.color}`,
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 12px 28px ${path.color}20` : '0 1px 4px rgba(0,0,0,0.05)',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
        <span style={{ fontSize: '2.25rem' }}>{path.icon}</span>
        <span style={{
          fontSize: '0.75rem', fontWeight: 700,
          padding: '0.25rem 0.625rem', borderRadius: '2rem',
          backgroundColor: `${path.badgeColor}18`, color: path.badgeColor,
          border: `1px solid ${path.badgeColor}40`,
        }}>
          {path.badge}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', color: '#0f172a', marginBottom: '0.375rem' }}>
        {path.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.875rem', lineHeight: 1.5 }}>
        {path.subtitle}
      </p>
      <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.75 }}>
        {path.description}
      </p>

      {/* Expandable details */}
      {(hovered || expanded) && (
        <div style={{
          marginTop: '1.125rem',
          paddingTop: '1rem',
          borderTop: `1px solid ${path.color}25`,
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {path.details.map((detail, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', fontSize: '0.875rem', color: '#475569', lineHeight: 1.65 }}>
              <span style={{ color: path.color, flexShrink: 0, fontWeight: 700 }}>•</span>
              {detail}
            </div>
          ))}
          <div style={{
            marginTop: '0.5rem',
            display: 'inline-block', fontSize: '0.8125rem', fontWeight: 700,
            padding: '0.375rem 0.875rem', borderRadius: '0.5rem',
            backgroundColor: `${path.color}15`, color: path.color,
            border: `1px solid ${path.color}30`,
          }}>
            💡 {path.action}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerPage() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>🎯 졸업 후 6가지 경로</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          임용고시 합격만이 유일한 길이 아닙니다. 각 카드를 클릭하거나 마우스를 올려 상세 정보를 확인하세요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.125rem' }}>
          {careerPaths.map((path) => (
            <CareerCard key={path.id} path={path} />
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>⚖️ 임용고시, 균형 잡힌 시각으로 보기</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          임용고시를 포기하란 말이 아닙니다. 현실을 냉정하게 직시하고 전략적으로 준비하세요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {licensureInfo.map((item, idx) => (
            <Card key={idx} topColor="#1a3a6b">
              <CardBody>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{item.category}</h4>
                    <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.75 }}>{item.content}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <div style={{
        borderRadius: '1rem', padding: '1.75rem 2rem',
        background: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)',
        border: '1.5px solid #fed7aa',
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '2rem', flexShrink: 0 }}>🌟</span>
          <div>
            <h3 style={{ color: '#92400e', marginBottom: '0.625rem', fontSize: '1.0625rem', fontFamily: 'var(--font-serif)' }}>
              물리교육과 졸업생의 강점
            </h3>
            <p style={{ color: '#78350f', fontSize: '0.9375rem', lineHeight: 1.8 }}>
              물리교육과를 졸업한 사람은{' '}
              <strong>복잡한 개념을 단순하게 설명하는 능력</strong>,{' '}
              <strong>논리적 사고력</strong>,{' '}
              <strong>교육적 감수성</strong>을 동시에 갖춘 희귀한 인재입니다.
              이는 교육 현장 밖에서도 매우 가치 있는 역량입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
