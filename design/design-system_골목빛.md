# 골목빛 (Golmokbit) 디자인 시스템

> 활기찬 골목 상권 간판 거리에서 영감을 받은, 따뜻하고 친근한 브랜드·포트폴리오 웹 디자인 시스템

---

## 1. 디자인 원칙 & 컨셉

빽빽하게 겹쳐진 간판들, 저마다 다른 색과 글씨체로 자신을 알리는 골목 상점가의 풍경에서 출발했습니다.
그 안의 원색적인 에너지와 정보 밀도를 그대로 가져오는 대신, **핵심이 되는 색감과 활기만 추출해 웹에서 편안하게 읽히도록 정제**했습니다.

- **따뜻함(Warm)** — 차갑고 사무적인 블루/그레이 톤 대신, 크림빛 배경과 웜톤 액센트로 친근한 인상을 준다.
- **활기(Lively)** — 5가지 액센트 컬러를 태그, 뱃지, 포인트 요소에 리듬감 있게 사용해 골목의 생동감을 재현한다.
- **정돈(Curated)** — 색은 다채롭지만 배치는 정갈하게. 넓은 여백과 일관된 그리드로 과함을 절제한다.
- **친근한 타이포그래피** — 딱딱한 고딕 대신 둥글고 부드러운 인상의 한글 서체를 기본으로 사용한다.

---

## 2. 컬러 팔레트

### 2.1 브랜드 컬러

| 이름 | HEX | 용도 |
|---|---|---|
| Navy Ink (Primary) | `#1F3357` | 로고, 헤더 텍스트, 메인 버튼, 내비게이션 배경 |
| Warm Cream (Base) | `#FBF5EA` | 페이지 배경, 카드 배경 |
| Charcoal (Text) | `#2B2420` | 본문 텍스트 |

### 2.2 액센트 컬러 (간판 거리에서 추출)

| 이름 | HEX | 참조 | 용도 |
|---|---|---|---|
| Signal Coral | `#E85C41` | 헤비스테이크·세븐일레븐 레드 간판 | 강조 버튼, 알림, 중요 CTA |
| Marigold | `#F2B238` | GRAND OPEN·헤어더뷰 옐로우 간판 | 하이라이트, 뱃지, 호버 상태 |
| Blossom Pink | `#E85C8A` | 과자킹 핑크 간판 | 태그, 보조 강조, 일러스트 포인트 |
| Grove Green | `#3E9B6E` | 세븐일레븐·컴퍼스 에듀케이션 그린 | 성공 상태, 포인트 라인, 태그 |
| Plum Night | `#5B3A73` | 보스턴 위스키 퍼플 간판 | 다크 섹션, 프리미엄 포인트 |

### 2.3 뉴트럴

| 이름 | HEX | 용도 |
|---|---|---|
| Paper | `#FFFFFF` | 카드 표면, 입력창 배경 |
| Sand 100 | `#F3EBDD` | 섹션 구분 배경 |
| Sand 300 | `#E4D9C6` | 구분선, 카드 테두리 |
| Stone 500 | `#8B8177` | 보조 텍스트, 플레이스홀더 |
| Ink 700 | `#4A4238` | 서브 헤딩 |

### 2.4 사용 가이드

- 배경은 항상 **Warm Cream** 또는 **Paper**를 기본으로 하고, Navy Ink를 헤더/푸터 등 구조적 요소에 한정해 사용한다.
- 액센트 5색은 **한 화면에 2~3개 이하**로 제한해 골목의 활기는 살리되 산만함은 피한다.
- 텍스트 대비: 본문은 항상 Charcoal 또는 Navy Ink 위에서만 사용, 액센트 컬러 위에는 White 텍스트만 사용한다.

---

## 3. 타이포그래피

**기본 서체:** Pretendard (한글 위주, 둥글고 부드러운 인상의 가변 서체)
**대체 서체:** -apple-system, "Noto Sans KR", sans-serif

| 스타일 | 크기 | 굵기 | 행간 | 용도 |
|---|---|---|---|---|
| Display | 56px | 700 | 1.15 | 히어로 타이틀 |
| H1 | 40px | 700 | 1.2 | 섹션 타이틀 |
| H2 | 28px | 600 | 1.3 | 서브 섹션 타이틀 |
| H3 | 20px | 600 | 1.4 | 카드 타이틀 |
| Body Large | 18px | 400 | 1.6 | 인트로 문단 |
| Body | 16px | 400 | 1.6 | 기본 본문 |
| Small | 14px | 400 | 1.5 | 캡션, 메타 정보 |
| Label | 13px | 600 | 1.2 | 뱃지, 버튼 텍스트 (letter-spacing 0.02em) |

---

## 4. 컴포넌트 스펙

### 4.1 버튼

| 종류 | 배경 | 텍스트 | 테두리 | 높이 | 라운드 |
|---|---|---|---|---|---|
| Primary | Navy Ink `#1F3357` | White | 없음 | 48px | 12px |
| Accent (CTA) | Signal Coral `#E85C41` | White | 없음 | 48px | 12px |
| Secondary | Paper `#FFFFFF` | Navy Ink | Sand 300 1px | 48px | 12px |
| Ghost | 투명 | Navy Ink | 없음 | 44px | 8px |

**상태:**
- Hover: 배경색 8% 어둡게, 그림자 `0 4px 12px rgba(31,51,87,0.15)`
- Active: 배경색 12% 어둡게, translateY(1px)
- Disabled: 불투명도 40%, 커서 not-allowed
- Padding: 좌우 24px (Primary/Accent/Secondary), 16px (Ghost)

### 4.2 카드 / 포트폴리오 그리드

- 배경: Paper, 테두리: Sand 300 1px, 라운드: 16px
- 그림자: `0 2px 8px rgba(43,36,32,0.06)` (기본), `0 8px 24px rgba(43,36,32,0.12)` (호버)
- 이미지 비율: 4:3, 상단 라운드만 적용
- 그리드: 데스크톱 3열, 태블릿 2열, 모바일 1열 / gap 24px
- 카드 내부 패딩: 20px

### 4.3 내비게이션

- 높이: 72px, 배경: Warm Cream (스크롤 시 Paper + 하단 그림자)
- 로고: H3 크기, Navy Ink
- 메뉴 아이템: Body 크기, 16px, Ink 700 / 활성 상태는 Signal Coral 밑줄 2px
- 메뉴 간격: 32px
- 모바일: 햄버거 메뉴, 슬라이드 오버레이 (배경 Navy Ink 95% + Paper 텍스트)

### 4.4 폼 / 입력 요소

| 요소 | 스펙 |
|---|---|
| Input | 높이 48px, 배경 Paper, 테두리 Sand 300 1px, 라운드 10px, 패딩 좌우 16px |
| Input Focus | 테두리 Navy Ink 2px, 그림자 없음 |
| Textarea | 최소 높이 120px, 그 외 Input과 동일 |
| Label | Small 크기, Ink 700, 하단 마진 6px |
| Error | 테두리 Signal Coral, 하단 메시지 Signal Coral 13px |

### 4.5 뱃지 / 태그

- 높이: 28px, 패딩 좌우 12px, 라운드: 999px (필 형태)
- 텍스트: Label 스타일
- 색상 세트 (배경 10% 톤 + 텍스트 진한 톤):
  - Coral 뱃지: 배경 `#FCE4DE`, 텍스트 `#B8402A`
  - Marigold 뱃지: 배경 `#FBEACB`, 텍스트 `#9A6E12`
  - Pink 뱃지: 배경 `#FBE1EA`, 텍스트 `#B8406A`
  - Green 뱃지: 배경 `#DFF0E6`, 텍스트 `#276B4A`
  - Navy 뱃지: 배경 `#E4E9F1`, 텍스트 `#1F3357`

---

## 5. CSS 변수 (토큰)

```css
:root {
  /* Brand */
  --color-navy-ink: #1F3357;
  --color-warm-cream: #FBF5EA;
  --color-charcoal: #2B2420;

  /* Accents */
  --color-signal-coral: #E85C41;
  --color-marigold: #F2B238;
  --color-blossom-pink: #E85C8A;
  --color-grove-green: #3E9B6E;
  --color-plum-night: #5B3A73;

  /* Neutrals */
  --color-paper: #FFFFFF;
  --color-sand-100: #F3EBDD;
  --color-sand-300: #E4D9C6;
  --color-stone-500: #8B8177;
  --color-ink-700: #4A4238;

  /* Typography */
  --font-family-base: "Pretendard", -apple-system, "Noto Sans KR", sans-serif;
  --font-size-display: 56px;
  --font-size-h1: 40px;
  --font-size-h2: 28px;
  --font-size-h3: 20px;
  --font-size-body-lg: 18px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-label: 13px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Shadow */
  --shadow-card: 0 2px 8px rgba(43, 36, 32, 0.06);
  --shadow-card-hover: 0 8px 24px rgba(43, 36, 32, 0.12);
  --shadow-button-hover: 0 4px 12px rgba(31, 51, 87, 0.15);

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}
```

---

## 6. 사용 예시

```css
.btn-primary {
  background: var(--color-navy-ink);
  color: var(--color-paper);
  height: 48px;
  padding: 0 24px;
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-label);
  font-weight: 600;
}

.card {
  background: var(--color-paper);
  border: 1px solid var(--color-sand-300);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 20px;
}

.badge-coral {
  background: #FCE4DE;
  color: #B8402A;
  height: 28px;
  padding: 0 12px;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-label);
  font-weight: 600;
}
```
