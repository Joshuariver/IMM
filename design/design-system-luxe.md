# 골드아워 (Gold Hour) 디자인 시스템

> 백화점 라이트박스 속 럭셔리 뷰티 광고(EVE LOM, YSL LIBRE)에서 영감을 받은
> 블랙·아이보리·골드 톤의 프리미엄 브랜드·포트폴리오 웹 디자인 시스템

---

## 1. 디자인 원칙 & 컨셉

어두운 매장 배경 속에서 은은히 빛나는 라이트박스 광고판—금빛 유리병과 각인된 세리프 로고, 절제된 여백—에서 출발했습니다.
화려함을 색으로 나열하지 않고, **깊은 블랙 배경 위 한 줄기 골드로 시선을 모으는 절제된 럭셔리**를 웹으로 옮겼습니다.

- **명암 대비(Contrast)** — 짙은 블랙/차콜 배경과 아이보리 화이트를 강하게 대비시켜 무대 조명 같은 몰입감을 만든다.
- **절제된 골드(Restraint)** — 골드는 전체 배경이 아닌 라인, 테두리, 포인트 텍스트에만 얇게 사용한다.
- **여백의 품격(Space)** — EVE LOM·YSL 광고판처럼 제품(콘텐츠) 하나를 넉넉한 여백 안에 두어 고급스러움을 강조한다.
- **세리프의 우아함(Elegance)** — YSL 로고의 손글씨 세리프에서 착안, 헤드라인에 클래식 세리프를 사용하고 본문은 정제된 산세리프로 대비를 준다.

---

## 2. 컬러 팔레트

### 2.1 브랜드 컬러

| 이름 | HEX | 참조 | 용도 |
|---|---|---|---|
| Onyx Black | `#111010` | 매장 배경, YSL 프레임 | 헤더, 다크 섹션 배경, 본문 텍스트 |
| Ivory White | `#FAF6EE` | YSL 포스터 화이트 | 라이트 섹션 배경 |
| Champagne Gold | `#C9A24B` | EVE LOM 보틀 금색 | 로고, 라인, 강조 텍스트, 테두리 |

### 2.2 서브 컬러

| 이름 | HEX | 용도 |
|---|---|---|
| Amber Glow | `#E4B96A` | 호버 상태, 그라디언트 하이라이트 |
| Honey Brown | `#8A5E2B` | 골드의 그림자/눌림 상태 |
| Warm Ivory 100 | `#F2ECDD` | 카드 배경 (다크 섹션 위 대비용) |
| Charcoal 700 | `#2A2724` | 서브 헤딩, 보조 텍스트(다크 배경) |

### 2.3 뉴트럴

| 이름 | HEX | 용도 |
|---|---|---|
| Pure White | `#FFFFFF` | 라이트 섹션 카드, 입력창 |
| Stone 300 | `#DED5C3` | 구분선, 카드 테두리(라이트) |
| Stone 500 | `#A69B87` | 플레이스홀더, 캡션 |
| Ink 900 | `#0A0908` | 최대 대비 텍스트 |

### 2.4 사용 가이드

- 섹션은 **Onyx Black**(다크)과 **Ivory White**(라이트)를 교차 배치해 광고판이 늘어선 듯한 리듬을 만든다.
- Champagne Gold는 배경으로 쓰지 않고 **선(1~2px), 텍스트, 아이콘, 테두리**로만 사용한다.
- 다크 섹션 텍스트: Ivory White / Gold. 라이트 섹션 텍스트: Onyx Black / Honey Brown.
- 그라디언트는 최소한으로, 골드 포인트에만 `Champagne Gold → Amber Glow` 45도 사용 가능.

---

## 3. 타이포그래피

**헤드라인 서체:** 클래식 세리프 (예: Playfair Display, "Noto Serif KR" 한글 병기)
**본문 서체:** 정제된 산세리프 (예: Pretendard, -apple-system)

| 스타일 | 서체 | 크기 | 굵기 | 자간 | 용도 |
|---|---|---|---|---|---|
| Display | Serif | 64px | 700 | -0.01em | 히어로 타이틀 |
| H1 | Serif | 44px | 600 | 0 | 섹션 타이틀 |
| H2 | Serif | 30px | 600 | 0 | 서브 섹션 타이틀 |
| H3 | Sans | 20px | 600 | 0 | 카드 타이틀 |
| Body Large | Sans | 18px | 400 | 0 | 인트로 문단 |
| Body | Sans | 16px | 400 | 0 | 기본 본문 |
| Small | Sans | 14px | 400 | 0.01em | 캡션, 메타 정보 |
| Overline | Sans | 13px | 600 | 0.16em (전체 대문자) | 카테고리 라벨, 로고형 텍스트(EVE LOM 스타일) |

---

## 4. 컴포넌트 스펙

### 4.1 버튼

| 종류 | 배경 | 텍스트 | 테두리 | 높이 | 라운드 |
|---|---|---|---|---|---|
| Primary (다크 위) | 투명 | Champagne Gold | Gold 1px | 52px | 0px (각짐) |
| Primary (라이트 위) | Onyx Black | Ivory White | 없음 | 52px | 0px |
| Ghost | 투명 | 현재 배경 대비색 | Gold 1px (hover 시만) | 48px | 0px |

**상태:**
- Hover: 텍스트/테두리 Amber Glow로 전환, 배경 살짝 채워짐(10% opacity)
- Active: 텍스트 Honey Brown
- 각진 모서리(radius 0)와 넓은 자간(0.05em)으로 광고판 각인 느낌 유지
- Padding: 좌우 32px

### 4.2 카드 / 포트폴리오 그리드

- 라이트박스 프레임처럼: 얇은 Gold 1px 테두리 + 넉넉한 내부 여백(패딩 32px)
- 배경: Ivory White 또는 Warm Ivory 100, 라운드: 0px
- 이미지: 세로 3:4 비율 (라이트박스 포스터 비율), object-fit cover
- 그림자: 다크 배경 위에서는 `0 12px 32px rgba(0,0,0,0.4)`, 라이트 배경 위에서는 `0 4px 16px rgba(17,16,16,0.08)`
- 그리드: 데스크톱 2~3열(포스터형이라 넉넉하게), gap 40px
- 호버 시 이미지 살짝 확대(scale 1.03, 0.4s ease)

### 4.3 내비게이션

- 높이: 88px, 배경: Onyx Black (반투명 92% + 블러)
- 로고: Overline 스타일 확장 적용, Serif, Gold, 자간 0.1em
- 메뉴 아이템: Overline 스타일(대문자, 자간 0.12em), Ivory White / 활성 시 Gold
- 메뉴 간격: 40px
- 모바일: 풀스크린 오버레이, 배경 Onyx Black, 메뉴 항목 Serif 32px 세로 나열

### 4.4 폼 / 입력 요소

| 요소 | 스펙 |
|---|---|
| Input | 높이 52px, 배경 투명, 하단 테두리만 Stone 300 1px, 라운드 0 |
| Input Focus | 하단 테두리 Champagne Gold 2px |
| Textarea | 최소 높이 140px, 하단 테두리만 유지 |
| Label | Overline 스타일 축소(11px, 자간 0.1em), Stone 500 |
| Error | 하단 테두리 `#B0473A`, 메시지 동일 색상 13px |

### 4.5 뱃지 / 태그

- 높이: 26px, 패딩 좌우 14px, 라운드: 0px, 테두리 1px
- 텍스트: Overline 스타일 축소(11px)
- 색상 세트:
  - Gold 뱃지 (다크 위): 테두리 Gold, 텍스트 Gold, 배경 투명
  - Ivory 뱃지 (라이트 위): 테두리 Onyx Black, 텍스트 Onyx Black, 배경 투명
  - Sale/New 뱃지: 배경 `#111010`, 텍스트 Gold, 테두리 없음

---

## 5. CSS 변수 (토큰)

```css
:root {
  /* Brand */
  --color-onyx-black: #111010;
  --color-ivory-white: #FAF6EE;
  --color-champagne-gold: #C9A24B;

  /* Sub */
  --color-amber-glow: #E4B96A;
  --color-honey-brown: #8A5E2B;
  --color-warm-ivory-100: #F2ECDD;
  --color-charcoal-700: #2A2724;

  /* Neutrals */
  --color-pure-white: #FFFFFF;
  --color-stone-300: #DED5C3;
  --color-stone-500: #A69B87;
  --color-ink-900: #0A0908;

  /* Typography */
  --font-family-serif: "Playfair Display", "Noto Serif KR", serif;
  --font-family-sans: "Pretendard", -apple-system, "Noto Sans KR", sans-serif;
  --font-size-display: 64px;
  --font-size-h1: 44px;
  --font-size-h2: 30px;
  --font-size-h3: 20px;
  --font-size-body-lg: 18px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-overline: 13px;
  --letter-spacing-overline: 0.16em;

  /* Radius (각진 럭셔리 톤 — 기본 0) */
  --radius-none: 0px;

  /* Shadow */
  --shadow-card-dark: 0 12px 32px rgba(0, 0, 0, 0.4);
  --shadow-card-light: 0 4px 16px rgba(17, 16, 16, 0.08);

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
}
```

---

## 6. 사용 예시

```css
.btn-primary-on-dark {
  background: transparent;
  color: var(--color-champagne-gold);
  border: 1px solid var(--color-champagne-gold);
  height: 52px;
  padding: 0 32px;
  border-radius: var(--radius-none);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-small);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.card-portfolio {
  background: var(--color-warm-ivory-100);
  border: 1px solid var(--color-champagne-gold);
  border-radius: var(--radius-none);
  padding: 32px;
  box-shadow: var(--shadow-card-light);
}

.overline-label {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-overline);
  letter-spacing: var(--letter-spacing-overline);
  text-transform: uppercase;
  color: var(--color-stone-500);
}
```
