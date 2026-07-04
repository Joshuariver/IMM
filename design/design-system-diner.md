# 네온다이너 (Neon Diner) 디자인 시스템

> 어두운 파사드에 걸린 네온 사인과 원목 마감, 스테인리스 카운터가 어우러진
> 아메리칸 다이너 간판에서 영감을 받은 캐주얼 다이닝·F&B 브랜드 웹 디자인 시스템

---

## 1. 디자인 원칙 & 컨셉

짙은 차콜 파사드 위로 빛나는 화이트 네온 로고, 그 아래 따뜻한 원목 패널과 스테인리스 카운터, 포인트로 켜진 라임 그린 네온 아이콘—활기차지만 신뢰감 있는 캐주얼 다이닝의 인상에서 출발했습니다.

- **다크 앤 브라이트(Dark & Bright)** — 짙은 차콜/블랙 배경 위에 화이트와 라임 그린이 강하게 빛나는 대비 구조.
- **크래프트한 따뜻함(Crafted Warmth)** — 원목 톤을 서브 배경/카드에 사용해 차가운 다크 톤을 중화한다.
- **캐주얼한 볼드함(Bold & Casual)** — 두껍고 큼직한 대문자 사인 서체로 메뉴판처럼 명확하고 읽기 쉬운 정보 위계.
- **한 가지 시그널 컬러(Single Signal)** — 라임 그린은 단 하나의 액션/브랜드 포인트로만 제한해 네온사인처럼 눈에 띄게 한다.

---

## 2. 컬러 팔레트

### 2.1 브랜드 컬러

| 이름 | HEX | 참조 | 용도 |
|---|---|---|---|
| Char Black | `#1B1B1B` | 매장 파사드 차콜 | 헤더/푸터, 다크 섹션 배경 |
| Signal Lime | `#7ED957` | 네온 버거 아이콘 그린 | 메인 CTA, 로고 포인트, 활성 상태 |
| Marquee White | `#FAFAF8` | SHAKE SHACK 채널 사인 화이트 | 다크 배경 위 헤드라인, 사인 텍스트 |

### 2.2 서브 컬러

| 이름 | HEX | 참조 | 용도 |
|---|---|---|---|
| Timber Oak | `#B98A54` | 카운터 원목 패널 | 라이트 섹션 배경, 카드 액센트 |
| Timber Deep | `#7A5230` | 원목 그림자 톤 | 보조 텍스트(라이트 배경), 테두리 |
| Steel Grey | `#9AA2A6` | 스테인리스 후드/카운터 | 아이콘, 구분선, 비활성 상태 |
| Lime Deep | `#4E9E32` | 그린 네온 그림자 | 호버/눌림 상태 |

### 2.3 뉴트럴

| 이름 | HEX | 용도 |
|---|---|---|
| Paper White | `#FFFFFF` | 카드 표면, 입력창 배경 |
| Warm Grey 100 | `#F1EEE8` | 라이트 섹션 기본 배경 |
| Warm Grey 300 | `#DCD5C8` | 카드 테두리, 구분선 |
| Ink 900 | `#111111` | 라이트 배경 위 본문 텍스트 |

### 2.4 사용 가이드

- 히어로/헤더 등 브랜드 임팩트가 필요한 곳은 **Char Black** 배경 + **Marquee White** 텍스트 + **Signal Lime** 포인트 조합을 사용한다.
- 메뉴, 카드, 본문 섹션은 **Warm Grey 100 / Timber Oak** 톤의 라이트 배경으로 전환해 가독성을 확보한다.
- Signal Lime은 화면당 **버튼 1개 또는 로고 포인트 1곳**에만 사용해 네온사인의 임팩트를 유지한다.
- 그린 위에는 항상 Char Black 텍스트만 사용(대비 확보).

---

## 3. 타이포그래피

**헤드라인 서체:** 굵은 컨덴스드 산세리프 (예: Anton, "Black Han Sans" 한글 병기) — 채널 사인 느낌의 볼드 대문자
**본문 서체:** Pretendard, -apple-system, "Noto Sans KR"

| 스타일 | 서체 | 크기 | 굵기 | 자간 | 용도 |
|---|---|---|---|---|---|
| Marquee Display | 컨덴스드 볼드 | 72px | 800 | 0.01em (전체 대문자) | 히어로 로고형 타이틀 |
| H1 | 컨덴스드 볼드 | 40px | 700 | 0 (대문자) | 섹션 타이틀 |
| H2 | Sans | 26px | 700 | 0 | 서브 섹션 타이틀 |
| H3 | Sans | 20px | 600 | 0 | 메뉴/카드 타이틀 |
| Body Large | Sans | 18px | 400 | 0 | 인트로 문단 |
| Body | Sans | 16px | 400 | 0 | 기본 본문 |
| Small | Sans | 14px | 400 | 0 | 캡션, 메타 정보 |
| Menu Label | Sans | 13px | 700 | 0.04em (대문자) | 메뉴 카테고리, 태그 (SIDES/WOOF 스타일) |

---

## 4. 컴포넌트 스펙

### 4.1 버튼

| 종류 | 배경 | 텍스트 | 테두리 | 높이 | 라운드 |
|---|---|---|---|---|---|
| Primary (Order) | Signal Lime | Char Black | 없음 | 52px | 10px |
| Secondary (다크 위) | 투명 | Marquee White | White 1.5px | 52px | 10px |
| Ghost | 투명 | Ink 900 | 없음 | 44px | 8px |

**상태:**
- Hover: Primary → 배경 Lime Deep, 그림자 `0 0 16px rgba(126,217,87,0.5)` (네온 글로우)
- Active: translateY(1px), 그림자 축소
- Disabled: 불투명도 40%
- Padding: 좌우 28px, 대문자 텍스트 + 자간 0.03em

### 4.2 카드 / 메뉴 그리드

- 배경: Paper White, 테두리: Warm Grey 300 1px, 라운드: 14px
- 상단 이미지 비율: 1:1 (메뉴/제품 사진), 하단 정보 영역 패딩 20px
- 그림자: `0 4px 14px rgba(17,17,17,0.08)` (기본), `0 10px 28px rgba(17,17,17,0.14)` (호버)
- 카테고리 뱃지(SIDES, WOOF 등)를 카드 상단에 Menu Label 스타일로 배치
- 그리드: 데스크톱 4열(메뉴형) / 3열(제품 쇼케이스), gap 20px

### 4.3 내비게이션

- 높이: 76px, 배경: Char Black (스크롤 시 그림자 `0 4px 16px rgba(0,0,0,0.3)` 추가)
- 로고: Marquee Display 축소 버전(28px), Marquee White + 아이콘은 Signal Lime
- 메뉴 아이템: Menu Label 스타일(대문자), Marquee White / 활성 시 Signal Lime 밑줄 2px
- 우측 CTA: Primary 버튼("ORDER HERE" 참조 문구 톤)
- 모바일: 햄버거 메뉴 → 풀스크린 Char Black 오버레이, 항목 Marquee Display 24px 세로 나열

### 4.4 폼 / 입력 요소

| 요소 | 스펙 |
|---|---|
| Input | 높이 50px, 배경 Paper White, 테두리 Warm Grey 300 1.5px, 라운드 10px, 패딩 좌우 16px |
| Input Focus | 테두리 Signal Lime 2px, 그림자 `0 0 0 3px rgba(126,217,87,0.2)` |
| Textarea | 최소 높이 120px, 그 외 Input과 동일 |
| Label | Menu Label 축소(12px), Timber Deep |
| Error | 테두리 `#D9483C`, 메시지 동일 색상 13px |

### 4.5 뱃지 / 태그

- 높이: 28px, 패딩 좌우 12px, 라운드: 6px (각진 메뉴판 느낌)
- 텍스트: Menu Label 스타일
- 색상 세트:
  - Lime 뱃지: 배경 Signal Lime, 텍스트 Char Black (NEW, BEST 등 강조)
  - Outline 뱃지: 배경 투명, 테두리 Timber Deep 1px, 텍스트 Timber Deep (카테고리 태그)
  - Dark 뱃지: 배경 Char Black, 텍스트 Marquee White (가격/정보 태그)

---

## 5. CSS 변수 (토큰)

```css
:root {
  /* Brand */
  --color-char-black: #1B1B1B;
  --color-signal-lime: #7ED957;
  --color-marquee-white: #FAFAF8;

  /* Sub */
  --color-timber-oak: #B98A54;
  --color-timber-deep: #7A5230;
  --color-steel-grey: #9AA2A6;
  --color-lime-deep: #4E9E32;

  /* Neutrals */
  --color-paper-white: #FFFFFF;
  --color-warm-grey-100: #F1EEE8;
  --color-warm-grey-300: #DCD5C8;
  --color-ink-900: #111111;

  /* Typography */
  --font-family-display: "Anton", "Black Han Sans", sans-serif;
  --font-family-sans: "Pretendard", -apple-system, "Noto Sans KR", sans-serif;
  --font-size-marquee: 72px;
  --font-size-h1: 40px;
  --font-size-h2: 26px;
  --font-size-h3: 20px;
  --font-size-body-lg: 18px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-menu-label: 13px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;

  /* Shadow */
  --shadow-card: 0 4px 14px rgba(17, 17, 17, 0.08);
  --shadow-card-hover: 0 10px 28px rgba(17, 17, 17, 0.14);
  --shadow-neon-glow: 0 0 16px rgba(126, 217, 87, 0.5);
  --shadow-focus-ring: 0 0 0 3px rgba(126, 217, 87, 0.2);

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
.btn-order {
  background: var(--color-signal-lime);
  color: var(--color-char-black);
  height: 52px;
  padding: 0 28px;
  border-radius: var(--radius-md);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-menu-label);
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.btn-order:hover {
  background: var(--color-lime-deep);
  box-shadow: var(--shadow-neon-glow);
}

.card-menu {
  background: var(--color-paper-white);
  border: 1px solid var(--color-warm-grey-300);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 20px;
}

.badge-lime {
  background: var(--color-signal-lime);
  color: var(--color-char-black);
  height: 28px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-menu-label);
  font-weight: 700;
  text-transform: uppercase;
}
```
