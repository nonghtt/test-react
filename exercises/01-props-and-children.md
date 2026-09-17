# 01 · 컴포넌트와 props

예상 시간: 45~60분 · 개념: props 설계, 기본값, `children`, 조건부 렌더링(`&&` · early return), 중첩 리스트와 `key`, 컴포넌트 분리

이번 실습에는 **state가 없습니다.** 데이터를 받아서 화면으로 바꾸는 것만 합니다. 그 대신 컴포넌트를 어떻게 쪼개고, 각 컴포넌트가 어떤 props를 받게 할지를 직접 설계합니다.

## 목표

하드코딩된 "프로젝트 현황" 화면을 `teams` 데이터로 그립니다. 마크업과 CSS는 이미 있습니다.

## 시작 마크업

- `src/starters/Starter01.jsx` — 정적 화면. **http://localhost:5173/?starter=01**
- `src/data/teams.js` — 팀 3개, 프로젝트 6개. 파일 위 주석에 데이터 모양이 적혀 있습니다.

> **스타터는 "어떻게 생겼는지"만 알려줍니다.** 스타터에는 팀 2개·카드 3장뿐이지만 데이터는 팀 3개·프로젝트 6개입니다. 무엇을 몇 개 보여줄지는 아래 요구사항과 데이터가 기준입니다.

`App.jsx`의 내용은 이번 실습 화면으로 교체합니다. 00 코드는 git 히스토리에 남아 있으니 지워도 됩니다 (`MemberCard.jsx`는 그대로 둬도 됩니다).

## 요구사항

### 만들 컴포넌트

전부 `src/components/`에 둡니다. 아래 두 개는 **사용하는 쪽의 모양이 정해져 있습니다.** 이 모양 그대로 쓸 수 있게 만드세요.

```jsx
<Badge tone="success">완료</Badge>
<Badge>React</Badge>

<Section title="웹 팀" count={3}>
  …이 안에 들어가는 건 Section이 모릅니다…
</Section>
```

1. **`Badge`** — `tone`은 `primary` / `success` / `warn` / `danger` 중 하나. `tone`을 안 넘기면 스타터의 태그처럼 색 없는 기본 배지가 됩니다. 상태 배지와 태그 **둘 다 이 컴포넌트 하나로** 그립니다.
2. **`Section`** — 제목 줄과 그 아래 내용을 감싸는 틀. 내용으로 무엇이 들어올지 `Section`은 알지 못합니다 (카드 그리드일 수도, 빈 상태 상자일 수도).
3. **`ProjectCard`**, **`AvatarGroup`** — 어떤 props를 받을지는 직접 정합니다.

### 동작

4. 모든 팀을 섹션으로, 각 팀의 프로젝트를 카드로 렌더링합니다.
5. 상단 `총 N개`는 **전체 프로젝트 수**입니다.
6. 섹션 제목 옆 `N개`는 그 팀의 프로젝트 수입니다. **프로젝트가 0개인 팀은 개수 표시가 없어야 합니다.** 화면에 `0`이라는 글자가 보여도 안 됩니다.
7. 프로젝트가 없는 팀은 카드 그리드 대신 스타터의 빈 상태 상자를 보여줍니다.
8. `status` 값(`active` / `delayed` / `done`)에 따라 배지의 글자와 색이 스타터처럼 바뀝니다.
9. 설명 · 태그 · 마감일은 데이터에 있을 때만 그립니다. 없으면 그 엘리먼트가 DOM에 없어야 합니다 (빈 `<p>`나 빈 `tag-list`가 남으면 안 됨).
10. `AvatarGroup`은 담당자가 없으면 **아무것도 렌더링하지 않습니다.** 이 판단은 `AvatarGroup`을 쓰는 쪽이 아니라 `AvatarGroup` 안에서 합니다.

## 완성 조건

- [ ] `Badge`, `Section`, `ProjectCard`, `AvatarGroup`이 `src/components/`에 있다
- [ ] `Badge`와 `Section`을 위 예시와 똑같은 모양으로 사용한다
- [ ] 상태 배지와 태그가 모두 `Badge`로 그려진다 (`className="badge …"`가 `Badge.jsx` 밖에 없다)
- [ ] 팀 3개 · 프로젝트 6개가 모두 보이고, 상단에 `총 6개`가 데이터에서 계산되어 나온다
- [ ] 데이터 팀: 개수 표시 없음(`0`도 안 보임) + 빈 상태 상자
- [ ] "결제 페이지 리뉴얼" 카드: 설명 · `tag-list` · `avatar-group` 엘리먼트가 DOM에 없다 (개발자 도구로 확인)
- [ ] 모든 `map`에 적절한 `key`가 있고 콘솔에 경고가 없다
- [ ] state를 쓰지 않았다 (`useState` 없음)
- [ ] `npm run lint` 경고 없음, 브라우저 콘솔 에러 없음
- [ ] 스타터에 없는 태그 · className · CSS를 새로 만들지 않았다
- [ ] `App.jsx`에 하드코딩된 팀 · 프로젝트 정보가 없고 `Starter01`을 import하지 않는다

## 생각해볼 질문 (완료 보고 때 답변)

1. `Section`이 내용을 `children`으로 받는 것과, `projects` 배열을 props로 받아서 안에서 직접 카드를 그리는 것. 어떤 차이가 있나요? 어느 쪽이 "다른 화면에서도 다시 쓰기" 쉬운가요?
2. 요구사항 6번을 처음에 어떻게 썼고, 화면에 무엇이 나왔나요? `{count && <span>…</span>}`에서 `count`가 `0`이면 무슨 일이 생기고, 왜 그럴까요?
3. `status` → 배지 글자 · 색 변환을 어디에(어느 파일, 컴포넌트 안/밖) 어떤 형태로 두었나요? `status` 종류가 10개로 늘어난다면 지금 방식은 어떻게 되나요?
4. (00에서 이어지는 숙제) 00의 팀원 카드에서 `key`를 배열 index로 바꿨다고 합시다. 두 번째 카드를 "선택"한 상태에서 목록 **맨 앞에** 새 팀원이 추가되면, 선택 표시는 누구 카드에 붙어 있을까요? 왜 그럴까요?

## 힌트

<details>
<summary>정말 막혔을 때만 펼치세요</summary>

- children: https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
- props 기본값: https://react.dev/learn/passing-props-to-a-component#specifying-a-default-value-for-a-prop
- 조건부 렌더링 (`&&`의 함정, `null` 반환 포함): https://react.dev/learn/conditional-rendering
- key가 하는 일: https://react.dev/learn/rendering-lists#why-does-react-need-keys

</details>

## 완료 방법

```
git add -A
git commit -m "feat(01): props와 children 구현"
```

그리고 Claude에게 "01 완료" + 위 질문 4개 답변.
