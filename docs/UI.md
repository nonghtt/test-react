# UI 클래스 레퍼런스

CSS는 미리 만들어져 있고 `src/main.tsx`에서 전역으로 import됩니다. 실습에서는 **CSS를 쓰지 말고** 아래 클래스를 `className`으로 붙이기만 하세요. 필요한 클래스가 없으면 요청하면 추가합니다.

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

```tsx
<div className="container stack">
  <header className="row row-between">
    <h1>제목</h1>
    <button className="btn btn-primary">추가</button>
  </header>
  <div className="grid">{/* 카드들 */}</div>
</div>
```

## 헤더 / 네비게이션 (7단계 라우팅용)

```tsx
<header className="header">
  <span className="brand">MyApp</span>
  <nav className="nav">
    <a className="nav-link active" href="/">홈</a>
    <a className="nav-link" href="/about">소개</a>
  </nav>
</header>
```

## 카드

```tsx
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

```tsx
<button className="btn btn-primary" disabled={saving}>저장</button>
<button className="btn btn-danger btn-sm">삭제</button>
```

## 폼

```tsx
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

```tsx
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

## 탭

```tsx
<div className="tabs">
  <button className="tab active">전체</button>
  <button className="tab">진행중</button>
</div>
```

## 상태 표시 (4단계 데이터 페칭용)

```tsx
{loading && <div className="loading"><div className="spinner" /> 불러오는 중…</div>}
{error && <div className="alert alert-error">{error}</div>}
{items.length === 0 && <div className="empty">아직 항목이 없습니다</div>}
<div className="skeleton" style={{ width: '60%' }} />
```

텍스트 유틸: `muted`, `text-sm`, `text-danger`, `text-success`

## 기타

| 클래스 | 용도 |
|---|---|
| `avatar` / `avatar avatar-lg` | 원형 이미지 |
| `counter` | 큰 숫자 표시 |
| `modal-backdrop` > `modal` | 모달 |
| `sr-only` | 스크린리더 전용 텍스트 |
