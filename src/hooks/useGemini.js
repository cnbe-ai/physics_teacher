import { useState, useCallback } from 'react';

const SYSTEM_PROMPT = `당신은 물리교육과 신입생을 위한 진로 상담 AI입니다.
물리교육학 교수팀이 만든 안내서를 바탕으로 학생들에게 도움을 드립니다.

역할:
- 물리교육과에서의 4년 생활과 성장 방법에 대해 안내합니다.
- 임용고시 외의 다양한 진로 경로를 소개합니다.
- 학업 슬럼프, 진로 불안, 정체성 혼란에 공감하고 현실적인 조언을 드립니다.
- PCK(교수내용지식), SDT(자기결정이론), Tinto의 중퇴 모형 등 교육학 이론에 기반하여 답변합니다.
- 답변은 친근하고 따뜻하되 구체적이고 실질적이어야 합니다.
- 자기진단 결과가 주어지면 낮은 영역에 집중하여 맞춤 조언을 제공합니다.
- 한국어로만 답변합니다.
- 답변은 200자~400자 내외로 간결하게 작성합니다.`;

export function useGemini(apiKey) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (messages, onChunk, onDone) => {
    if (!apiKey) {
      setError('API 키가 설정되지 않았습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Build contents for Gemini API
    // First message is always system context + first user message combined
    const contents = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Prepend system prompt to first user message
    if (contents.length > 0 && contents[0].role === 'user') {
      contents[0].parts[0].text = `${SYSTEM_PROMPT}\n\n---\n\n${contents[0].parts[0].text}`;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                fullText += text;
                onChunk?.(text, fullText);
              }
            } catch {
              // skip malformed JSON
            }
          }
        }
      }

      onDone?.(fullText);
    } catch (err) {
      setError(err.message || '응답 생성 중 오류가 발생했습니다.');
      onDone?.('');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  return { sendMessage, isLoading, error };
}
