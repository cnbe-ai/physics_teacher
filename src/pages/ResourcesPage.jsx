import { ExternalLink } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { theoreticalReferences, usefulLinks } from '../data/resourceData';

export default function ResourcesPage() {
  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* References */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>📚 핵심 이론 문헌</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          이 앱의 콘텐츠는 검증된 교육학 이론과 연구를 바탕으로 합니다.
        </p>
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '8.5rem' }}>분류</th>
                  <th style={{ width: '11rem' }}>저자 / 연도</th>
                  <th>자료</th>
                  <th style={{ width: '14rem' }}>설명</th>
                </tr>
              </thead>
              <tbody>
                {theoreticalReferences.map((ref, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '1.25rem' }}>{ref.icon}</span>
                        <span style={{
                          fontSize: '0.8125rem', fontWeight: 700,
                          padding: '0.2rem 0.5rem', borderRadius: '0.375rem',
                          whiteSpace: 'nowrap',
                          backgroundColor: '#eef2ff', color: '#1a3a6b',
                        }}>
                          {ref.category}
                        </span>
                      </div>
                    </td>
                    <td style={{ color: '#64748b', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                      {ref.author}<br />
                      <span style={{ color: '#94a3b8' }}>({ref.year})</span>
                    </td>
                    <td>
                      <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>
                        {ref.title}
                      </p>
                      <p style={{ fontSize: '0.8125rem', color: '#94a3b8', fontStyle: 'italic' }}>{ref.journal}</p>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#64748b' }}>{ref.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Links */}
      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>🔗 유용한 링크</h2>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
          물리교육 관련 필수 웹사이트를 북마크해두세요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {usefulLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: `1.5px solid #e2e8f0`,
                borderTop: `4px solid ${link.color}`,
                padding: '1.375rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${link.color}25`;
                e.currentTarget.style.borderColor = link.color + '60';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                <div style={{
                  width: '3rem', height: '3rem', borderRadius: '0.75rem', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', backgroundColor: `${link.color}15`,
                }}>
                  {link.icon}
                </div>
                <ExternalLink size={15} style={{ color: '#cbd5e1', marginTop: '0.25rem' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '1rem',
                color: '#0f172a', marginBottom: '0.375rem',
              }}>
                {link.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65, marginBottom: '0.625rem' }}>
                {link.description}
              </p>
              <p style={{
                fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
                color: link.color, opacity: 0.85,
              }}>
                {link.url.replace('https://', '')}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Citation */}
      <Card topColor="#f59e0b">
        <CardBody>
          <div style={{ display: 'flex', gap: '1.125rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>📌</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.0625rem' }}>이 자료를 인용할 때</h3>
              <div style={{
                borderRadius: '0.625rem', backgroundColor: '#f8fafc',
                padding: '1rem 1.125rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
                color: '#475569', lineHeight: 1.75,
                border: '1px solid #e2e8f0',
              }}>
                <p>물리교육학 교수팀. (2024). <em>물리교육과 신입생을 위한 전공 탐색 및 진로 설계 안내서</em>.</p>
                <p style={{ marginTop: '0.25rem', color: '#94a3b8' }}>※ 본 자료는 교육 목적으로 제작되었습니다.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                {[
                  { ok: true,  text: '수업 자료로 활용 가능' },
                  { ok: true,  text: '학생 배포 가능' },
                  { ok: false, text: '상업적 이용 불가' },
                  { ok: false, text: '무단 수정 배포 불가' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem', color: '#475569' }}>
                    <span style={{ color: item.ok ? '#10b981' : '#ef4444', fontWeight: 700, flexShrink: 0 }}>
                      {item.ok ? '✓' : '✗'}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
