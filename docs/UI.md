# UI 클래스 레퍼런스

CSS는 미리 만들어져 있고 `src/main.jsx`에서 전역으로 import됩니다. 실습에 필요한 마크업은 `src/starters/`에 스타터 파일로 제공되므로 이 문서를 보고 직접 조립할 필요는 없습니다. 클래스가 무슨 뜻인지 궁금할 때 찾아보는 참고 자료입니다.

- `src/styles/base.css` — 리셋, 색/간격 변수, 다크모드
- `src/styles/ui.css` — 아래 컴포넌트 클래스

## 레이아웃

| 클래스 | 용도 |
|---|---|
| `container` | 페이지 가운데 정렬 래퍼 (max 880px) |
| `stack` / `stack-sm` | 세로 배치, 간격 16px / 8px |
| `row` | 가로 배치, 세로 가운데 정렬 |
| `row row-between` | 양 끝 정렬 |
| `row row-wrap` | 줄바꿈 허용 |
| `grid` | 반응형 카드 그리드 (220px 최소) |
| `divider` | `<hr className="divider" />` |

```jsx
<div className="container stack">
  <header className="row row-between">
    <h1>제목</h1>
    <button className="btn btn-primary">추가</button>
  </header>
  <div className="grid">{/* 카드들 */}</div>
</div>
```

## 헤더 / 네비게이션 (7단계 라우팅용)

```jsx
<header className="header">
  <span className="brand">MyApp</span>
  <nav className="nav">
    <a className="nav-link active" href="/">홈</a>
    <a className="nav-link" href="/about">소개</a>
  </nav>
</header>
```

## 카드

```jsx
<div className="card">            {/* 선택 상태: className="card selected" */}
  <div className="card-title">제목</div>
  <p className="card-desc">설명 텍스트</p>
  <div className="card-footer">
    <span className="badge badge-success">완료</span>
    <button className="btn btn-sm btn-ghost">편집</button>
  </div>
</div>
```

## 버튼

기본 `btn`에 변형을 조합합니다.

| 변형 | 용도 |
|---|---|
| `btn-primary` | 주요 동작 |
| `btn-danger` | 삭제 등 |
| `btn-ghost` | 배경 없는 보조 버튼 |
| `btn-sm` | 작은 크기 |
| `btn-block` | 가로 100% |

```jsx
<button className="btn btn-primary" disabled={saving}>저장</button>
<button className="btn btn-danger btn-sm">삭제</button>
```

## 폼

```jsx
<form className="stack">
  <div className="field">
    <label className="label" htmlFor="name">이름</label>
    <input id="name" className="input" />            {/* 오류: className="input invalid" */}
    <p className="help error">이름은 필수입니다</p>   {/* 안내: className="help" */}
  </div>
  <div className="field">
    <label className="label" htmlFor="role">역할</label>
    <select id="role" className="select"><option>선택</option></select>
  </div>
  <textarea className="textarea" />
  <label className="checkbox">
    <input type="checkbox" /> 완료
  </label>
  <button className="btn btn-primary" type="submit">제출</button>
</form>
```

## 리스트

```jsx
<ul className="list">
  <li className="list-item">                {/* 완료: "list-item done", 선택: "list-item active" */}
    <input type="checkbox" />
    <span className="list-item-grow">할 일 내용</span>
    <button className="btn btn-sm btn-ghost">삭제</button>
  </li>
</ul>
```

## 배지

`badge` + `badge-primary` / `badge-success` / `badge-warn` / `badge-danger`

색 변형 없이 `badge`만 쓰면 회색 기본 배지(태그용). 여러 개를 촘촘히 나열할 때는 `tag-list`로 감쌉니다.

```jsx
<div className="tag-list">
  <span className="badge">React</span>
  <span className="badge">CSS</span>
</div>
```

## 탭

```jsx
<div className="tabs">
  <button className="tab active">전체</button>
  <button className="tab">진행중</button>
</div>
```

## 칸반 보드 (6단계 Context용)

```jsx
<div className="board">
  <section className="column">
    <div className="column-title">
      <h3>할 일</h3>
      <span className="muted text-sm">3</span>
    </div>
    <div className="card stack-sm">{/* 카드 */}</div>
    <div className="empty">카드 없음</div>          {/* 열이 비었을 때 */}
  </section>
</div>

<select className="select select-auto">…</select>   {/* row 안에서 폭이 내용만큼만 */}
```

## 상태 표시 (4단계 데이터 페칭용)

```jsx
{loading && <div className="loading"><div className="spinner" /> 불러오는 중…</div>}
{error && <div className="alert alert-error">{error}</div>}
{items.length === 0 && <div className="empty">아직 항목이 없습니다</div>}
<div className="skeleton" style={{ width: '60%' }} />
```

텍스트 유틸: `muted`, `text-sm`, `text-danger`, `text-success`

## 기타

| 클래스 | 용도 |
|---|---|
| `avatar` / `avatar avatar-lg` / `avatar avatar-sm` | 원형 이미지 (40px / 72px / 28px) |
| `avatar-group` | 아바타 여러 개를 겹쳐서 나열 (`avatar avatar-sm`과 함께) |
| `push-right` | flex 컨테이너 안에서 오른쪽 끝으로 밀기 |
| `grow` | flex 컨테이너 안에서 남는 폭을 전부 차지 (`row` 안의 `input grow` + 버튼) |
| `qty` | +/- 버튼 사이의 수량 숫자 |
| `emoji-lg` | 카드 상단의 큰 이모지 아이콘 |
| `counter` | 큰 숫자 표시 |
| `modal-backdrop` > `modal` | 모달 |
| `sr-only` | 스크린리더 전용 텍스트 |
