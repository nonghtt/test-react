# 00 · 첫 컴포넌트 (진단)

예상 시간: 30~45분 · 개념: 컴포넌트, props, 리스트 렌더링, 조건부 렌더링, useState 맛보기

이 실습은 현재 수준을 파악하는 용도입니다. 모르는 게 있어도 검색해서 진행하고, 어디서 막혔는지 완료 보고 때 알려주세요.

## 목표

하드코딩된 정적 화면을 **데이터로 움직이는 React 화면**으로 바꿉니다. 마크업과 CSS는 이미 있습니다. 새 태그나 className을 만들 필요가 없습니다.

## 시작 마크업

- `src/starters/Starter00.jsx` — 완성된 모양의 정적 화면 (카드 3장: 온라인 / 오프라인 / 선택됨)
- `src/data/members.js` — 실제 팀원 데이터 5명

먼저 브라우저에서 **http://localhost:5173/?starter=00** 을 열어 목표 화면을 확인하세요 (`App.jsx`를 건드리지 않고 스타터만 보여줍니다). 이 탭을 열어둔 채 다른 탭(`http://localhost:5173/`)에서 내 작업물과 비교하면 됩니다. 그다음 스타터의 마크업을 **잘라서 가져와** 아래 요구사항대로 바꿉니다. `Starter00.jsx` 자체는 참고용으로 그대로 둡니다.

## 요구사항

1. 카드 한 장의 마크업을 **`MemberCard` 컴포넌트**로 분리합니다 (별도 파일). 하드코딩된 이름·역할·아바타는 props로 받습니다.
2. `App.jsx`는 `members` 데이터로 카드 목록을 렌더링합니다. 최종 결과물에 `Starter00`은 쓰이지 않아야 합니다.
3. 온라인인 팀원에게만 `온라인` 배지를 보여줍니다. 오프라인이면 배지 자체가 없어야 합니다.
4. 상단의 `총 3명`을 데이터에서 계산한 값으로 바꿉니다.
5. `선택` 버튼을 누르면 그 카드가 스타터의 세 번째 카드 모양(선택됨)이 되고, 다시 누르면 원래대로 돌아옵니다. **카드마다 독립적으로** 동작해야 합니다.

## 완성 조건

- [ ] `MemberCard`가 별도 파일(`src/components/MemberCard.jsx`)에 있고 props로 데이터를 받는다
- [ ] 목록은 `map`으로 렌더링하고 콘솔에 `key` 관련 경고가 없다
- [ ] 오프라인 팀원 카드에는 배지 엘리먼트가 DOM에 존재하지 않는다 (숨기는 게 아니라 없어야 함)
- [ ] 인원 수가 데이터 길이에서 계산된다
- [ ] 카드 선택이 카드별로 독립적으로 토글된다
- [ ] `npm run lint` 경고 없음, 브라우저 콘솔 에러 없음
- [ ] 스타터에 없는 태그·className·CSS를 새로 만들지 않았다
- [ ] 최종 `App.jsx`에 하드코딩된 팀원 정보가 없고 `Starter00`을 import하지 않는다

## 생각해볼 질문 (완료 보고 때 답변)

1. 선택 상태(state)를 `MemberCard` 안에 두었나요, `App`에 두었나요? 왜 그렇게 했나요?
2. `key`에 무엇을 썼나요? 배열 index를 쓰면 안 되는 경우는 언제일까요?
3. `MemberCard`에 팀원 객체를 통째로 넘겼나요, 필드를 하나씩 넘겼나요? 각각의 장단점은?

## 힌트

<details>
<summary>정말 막혔을 때만 펼치세요</summary>

- 리스트: https://react.dev/learn/rendering-lists
- 조건부 렌더링: https://react.dev/learn/conditional-rendering
- 컴포넌트마다 독립적인 state: https://react.dev/learn/state-a-components-memory#state-is-isolated-and-private

</details>

## 완료 방법

```
git add -A
git commit -m "feat(00): 첫 컴포넌트 구현"
```

그리고 Claude에게 "00 완료" + 위 질문 3개 답변.
