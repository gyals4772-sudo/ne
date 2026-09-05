// 영지 상태창 SVG 생성 Cloudflare Worker
// 배포 방법: Cloudflare Workers 대시보드에 이 코드를 붙여넣고 배포
// 사용 예시:
// https://your-worker.workers.dev/?name=남양&pop=600&gold=80&food=45&foodRate=55&industry=80&wall=목책&wallHp=200&income=420&buildings=대농장,병영,대장간,영주관&schedule=없음&decree=없음

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const p = url.searchParams;

    // 파라미터 읽기 (기본값 포함)
    const name = p.get("name") || "이름없음";
    const pop = p.get("pop") || "0";
    const gold = p.get("gold") || "0";
    const food = p.get("food") || "0";
    const foodRate = p.get("foodRate") || "0";
    const industry = p.get("industry") || "0";
    const wall = p.get("wall") || "목책";
    const wallHp = p.get("wallHp") || "0";
    const income = p.get("income") || "0";
    const buildingsRaw = p.get("buildings") || "대농장,병영,대장간,영주관";
    const schedule = p.get("schedule") || "없음";
    const decree = p.get("decree") || "없음";

    // 건축물 문자열을 콤마 기준으로 나눠서 최대 2줄로 배치 (숫자/개수 표기 없이 이름만)
    const buildingItems = buildingsRaw ? buildingsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
    const line1 = buildingItems.slice(0, 3).join("   ·   ");
    const line2 = buildingItems.slice(3, 6).join("   ·   ");

    // XML 이스케이프
    const esc = (s) => String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    const svg = `
<svg width="560" height="480" viewBox="0 0 560 480" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; }
    .th { font-size: 20px; font-weight: 700; }
    .t  { font-size: 17px; font-weight: 600; }
    .ts { font-size: 14px; font-weight: 500; }
  </style>

  <rect x="0" y="0" width="560" height="480" rx="6" fill="#4A3423"/>
  <rect x="14" y="14" width="532" height="452" rx="4" fill="#F1E6C6" stroke="#2C2016" stroke-width="2"/>

  <!-- 철제 리벳 -->
  <circle cx="14" cy="14" r="5" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="546" cy="14" r="5" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="14" cy="466" r="5" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="546" cy="466" r="5" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="280" cy="14" r="4" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="280" cy="466" r="4" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="14" cy="240" r="4" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>
  <circle cx="546" cy="240" r="4" fill="#6B6259" stroke="#2C2016" stroke-width="1"/>

  <!-- 방패 문장 (영지명 플레이트) -->
  <path d="M230,0 L330,0 L330,58 Q330,78 280,90 Q230,78 230,58 Z" fill="#5C4A12" stroke="#2C2016" stroke-width="2"/>
  <path d="M238,6 L322,6 L322,56 Q322,70 280,80 Q238,70 238,56 Z" fill="none" stroke="#C9A94E" stroke-width="1"/>
  <text x="280" y="42" text-anchor="middle" class="th" fill="#F1E6C6">&#127984;</text>
  <text x="280" y="66" text-anchor="middle" class="t" fill="#F1E6C6">${esc(name)}</text>

  <!-- Row 1: 기본 정보 -->
  <rect x="30" y="106" width="160" height="46" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="110" y="135" text-anchor="middle" class="t" fill="#2C2016">&#128101; ${esc(pop)}</text>

  <rect x="200" y="106" width="160" height="46" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="280" y="135" text-anchor="middle" class="t" fill="#2C2016">&#128176; ${esc(gold)}</text>

  <rect x="370" y="106" width="160" height="46" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="450" y="135" text-anchor="middle" class="t" fill="#2C2016">&#127829; ${esc(food)}</text>

  <!-- Row 2: 수치 -->
  <rect x="30" y="160" width="160" height="46" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="110" y="189" text-anchor="middle" class="t" fill="#2C2016">&#127793; ${esc(foodRate)}</text>

  <rect x="200" y="160" width="160" height="46" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="280" y="189" text-anchor="middle" class="t" fill="#2C2016">&#9881;&#65039; ${esc(industry)}</text>

  <rect x="370" y="160" width="160" height="46" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="450" y="189" text-anchor="middle" class="t" fill="#2C2016">&#129703; ${esc(wall)} (${esc(wallHp)})</text>

  <!-- 순수입 -->
  <rect x="30" y="214" width="500" height="40" rx="4" fill="#E7D9A8" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="280" y="240" text-anchor="middle" class="t" fill="#2C4A0C">&#128184; 순수입 +${esc(income)}G</text>

  <!-- 구분선: 건축물 -->
  <line x1="30" y1="270" x2="230" y2="270" stroke="#8A6D1F" stroke-width="1" stroke-dasharray="3 3"/>
  <polygon points="280,264 288,270 280,276 272,270" fill="#5C4A12"/>
  <line x1="330" y1="270" x2="530" y2="270" stroke="#8A6D1F" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="30" y="292" class="ts" fill="#5C4A12">&#127959; 건축물</text>

  <!-- 건축물 자유 기입란 -->
  <rect x="30" y="300" width="500" height="58" rx="4" fill="#FFFDF6" stroke="#8A6D1F" stroke-width="1.2"/>
  <line x1="42" y1="320" x2="518" y2="320" stroke="#E4D9B8" stroke-width="1"/>
  <line x1="42" y1="342" x2="518" y2="342" stroke="#E4D9B8" stroke-width="1"/>
  <text x="42" y="316" class="ts" fill="#5C4A12">${esc(line1)}</text>
  <text x="42" y="338" class="ts" fill="#5C4A12">${esc(line2)}</text>

  <!-- 구분선: 일정 / 포고령 -->
  <line x1="30" y1="374" x2="230" y2="374" stroke="#8A6D1F" stroke-width="1" stroke-dasharray="3 3"/>
  <polygon points="280,368 288,374 280,380 272,374" fill="#5C4A12"/>
  <line x1="330" y1="374" x2="530" y2="374" stroke="#8A6D1F" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- 일정 -->
  <rect x="30" y="384" width="500" height="40" rx="4" fill="#EFE6C8" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="45" y="410" class="t" fill="#5C4A12">&#128197; 일정: ${esc(schedule)}</text>

  <!-- 포고령 -->
  <rect x="30" y="430" width="500" height="40" rx="4" fill="#E8DCC0" stroke="#8A6D1F" stroke-width="1.2"/>
  <text x="45" y="456" class="t" fill="#5C4A12">&#128220; 포고령: ${esc(decree)}</text>
</svg>`.trim();

    return new Response(svg, {
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control": "no-cache"
      }
    });
  }
};
