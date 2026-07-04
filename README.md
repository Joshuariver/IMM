# IMM Research Explorer

Industrial Marketing Management (IMM) 학술 논문들을 효율적으로 검색, 탐색, 조회 및 인용할 수 있도록 지원하는 웹 기반 아카이브 브라우저 어플리케이션입니다.

---

## 📂 프로젝트 구조 (Project Structure)

```
02.IMM/app/
├── index.html       # 어플리케이션의 메인 HTML 웹 페이지 (UI/레이아웃 정의)
├── main.js         # 메인 프론트엔드 비즈니스 로직 (검색 하이라이팅, 필터링, 복사 기능 등)
├── styles.css       # 커스텀 컴포넌트 및 하이라이팅 스타일 정의
├── sync.py         # 볼륨 폴더별 HTML 파일을 수집하여 data.js로 컴파일하는 빌드/동기화 스크립트
├── data.js         # 동기화된 모든 논문의 메타데이터, 초록, 본문 HTML이 컴파일된 DB 파일
└── html/           # sync.py를 통해 각 볼륨 폴더에서 복사 및 분류된 HTML 파일들의 저장소
```

---

## 🛠️ 주요 기능 (Key Features)

1. **실시간 검색 (Real-time Search)**
   - 논문의 제목, 저자, 본문 키워드 전체를 대상으로 한 실시간 텍스트 검색을 지원합니다.
   - 본문 내 검색 키워드에 대해 실시간 **하이라이팅(Highlighting)** 기능이 제공되어 빠르게 정보를 찾을 수 있습니다.

2. **볼륨별 필터링 (Volume Filtering)**
   - 좌측 필터 패널에서 특정 볼륨(예: `V105`, `V107`, `V108` 등) 버튼을 클릭하여 볼륨 단위로 논문 목록을 필터링할 수 있습니다.

3. **인용구 및 링크 편의 기능 (Citation & DOI Tools)**
   - **APA7 복사**: 한 번의 클릭으로 클립보드에 정확한 APA 7th Edition 포맷의 인용 문구를 복사할 수 있습니다.
   - **DOI 검색**: 논문의 DOI가 존재하는 경우 다이렉트 링크로 이동하며, 없는 경우 Crossref API로 검색할 수 있는 링크를 제공합니다.

---

## 🚀 사용 및 실행 방법 (How to Run)

### 1. 서비스 실행
별도의 웹 서버 없이도 `index.html` 파일을 더블 클릭하여 웹 브라우저에서 즉시 실행할 수 있습니다.
- 로컬 웹 서버가 필요한 경우, 프로젝트 루트 폴더에서 다음과 같이 실행할 수 있습니다:
  ```bash
  # Python 3 이용 시
  python -m http.server 8000
  ```
  이후 브라우저에서 `http://localhost:8000/02.IMM/app/index.html`에 접속합니다.

---

## 🔄 새로운 논문 추가 및 동기화 방법 (How to Sync New Papers)

새로운 볼륨이나 새로운 논문 리포트를 아카이브 앱에 추가하려면 아래 절차를 따르십시오.

### STEP 1 — 논문 파일 배치
- 각 볼륨 폴더(예: `02.IMM/V109`) 아래에 논문 분석 지침(`paper_analysis.md`)에 따라 분석 완료된 `[논문 제목].md` 및 `[논문 제목].html` 파일들을 위치시킵니다.

### STEP 2 — sync.py 설정 변경
- [02.IMM/app/sync.py](file:///C:/Users/joshu/Documents/PhD/99.%EB%85%BC%EB%AC%B8%EC%9E%91%EC%84%B1%EC%A4%80%EB%B9%84/04.B2B%20Theme/21.Journals/02.IMM/app/sync.py) 파일을 열어 `SOURCES` 리스트 변수에 새로 추가하려는 볼륨의 폴더명을 숫자 순서에 맞게 추가합니다:
  ```python
  # 예시: V109 추가 시
  SOURCES = ["V01", "V73", ..., "V107", "V108", "V109"]
  ```

### STEP 3 — 동기화 스크립트 실행
- 프로젝트 루트 디렉토리(`C:\Users\joshu\Documents\PhD\99.논문작성준비\04.B2B Theme\21.Journals`)에서 아래 명령어를 실행하여 동기화를 진행합니다:
  ```bash
  # npm 스크립트 실행 (권장)
  npm run imm:sync
  
  # 또는 파이썬 스크립트 직접 실행
  py 02.IMM/app/sync.py
  ```
- 스크립트 실행이 완료되면 새로 추가된 HTML 파일들이 `02.IMM/app/html/` 경로로 자동 복사되며, 논문 메타데이터 및 검색 인덱스가 업데이트된 `data.js` 파일이 새로 생성됩니다.

### STEP 4 — 확인
- 브라우저에서 아카이브 페이지(`index.html`)를 새로고침하여 새로 추가된 볼륨 필터와 논문들이 목록에 올바르게 표시되는지 확인합니다.

---

## ⚙️ 적용된 스펙 (Tech Stack)
- **CSS Framework**: [DaisyUI 4.12.10](https://daisyui.com/) & [Tailwind CSS CDN](https://tailwindcss.com/)
- **Font**: [Pretendard Font](https://github.com/orioncactus/pretendard) (가변 본문 서체)
- **Javascript**: Vanilla JS
- **Automation Script**: Python 3 (`pypdf`, `html.parser` 패키지 등 활용)
