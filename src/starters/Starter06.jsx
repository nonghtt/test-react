// 06 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
//
// 화면 구조 (실습 파일의 컴포넌트 트리와 1:1로 맞춰 두었습니다)
//   header      — 제목 · 담당자 필터(select select-auto) · 보이는 카드 수
//   board       — 열 3개를 가로로
//     column    — 제목 + 개수(column-title), 카드들 또는 empty
//       card    — 제목 + 펼치기/접기, (펼쳤을 때만) 설명, 담당자, 버튼 줄(card-footer)
//
// 시각 상태
//   접힌 카드 / 펼친 카드          — card-desc 가 있고 없고, 버튼 글자가 「펼치기」/「접기」
//   담당자 있음 / 없음             — avatar avatar-sm + 이름 / 「담당자 없음」
//   ← 비활성 (첫 열) / → 비활성 (끝 열) — disabled
//   「담당자 ▸」 버튼               — Part B에서 추가. Part A에서는 이 버튼을 빼고 시작
//   빈 열                          — empty
//
// 주의: 스타터는 "모양 샘플"입니다. 「완료」열에 카드와 empty 가 같이 그려져 있지만
// 실제 화면에는 둘 중 하나만 나옵니다.

export default function Starter06() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>팀 보드</h1>
        <div className="row">
          <label className="label" htmlFor="assignee">담당자</label>
          <select id="assignee" className="select select-auto" defaultValue="all">
            <option value="all">전체</option>
            <option value="1">김하늘</option>
            <option value="2">이준서</option>
            <option value="3">박서연</option>
            <option value="4">최민준</option>
            <option value="5">정유진</option>
          </select>
          <span className="muted text-sm">8장</span>
        </div>
      </header>

      <div className="board">
        {/* ── 할 일 (첫 열: ← 비활성) ── */}
        <section className="column">
          <div className="column-title">
            <h3>할 일</h3>
            <span className="muted text-sm">3</span>
          </div>

          {/* 펼친 카드 */}
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">로그인 페이지 리뉴얼</div>
              <button className="btn btn-sm btn-ghost" type="button">접기</button>
            </div>
            <p className="card-desc">소셜 로그인 버튼 추가, 비밀번호 찾기 흐름 정리</p>
            <div className="row">
              <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=1" alt="김하늘" />
              <span className="muted text-sm">김하늘</span>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm" type="button" disabled>←</button>
              <button className="btn btn-sm" type="button">→</button>
              <button className="btn btn-sm btn-ghost" type="button">담당자 ▸</button>
              <button className="btn btn-sm btn-danger push-right" type="button">삭제</button>
            </div>
          </div>

          {/* 접힌 카드 */}
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">결제 API 타임아웃 조사</div>
              <button className="btn btn-sm btn-ghost" type="button">펼치기</button>
            </div>
            <div className="row">
              <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=12" alt="이준서" />
              <span className="muted text-sm">이준서</span>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm" type="button" disabled>←</button>
              <button className="btn btn-sm" type="button">→</button>
              <button className="btn btn-sm btn-ghost" type="button">담당자 ▸</button>
              <button className="btn btn-sm btn-danger push-right" type="button">삭제</button>
            </div>
          </div>

          {/* 담당자 없는 카드 */}
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">온보딩 일러스트 시안</div>
              <button className="btn btn-sm btn-ghost" type="button">펼치기</button>
            </div>
            <div className="row">
              <span className="muted text-sm">담당자 없음</span>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm" type="button" disabled>←</button>
              <button className="btn btn-sm" type="button">→</button>
              <button className="btn btn-sm btn-ghost" type="button">담당자 ▸</button>
              <button className="btn btn-sm btn-danger push-right" type="button">삭제</button>
            </div>
          </div>
        </section>

        {/* ── 진행 중 (가운데 열: 양쪽 다 활성) ── */}
        <section className="column">
          <div className="column-title">
            <h3>진행 중</h3>
            <span className="muted text-sm">1</span>
          </div>
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">검색 디바운스 적용</div>
              <button className="btn btn-sm btn-ghost" type="button">펼치기</button>
            </div>
            <div className="row">
              <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=1" alt="김하늘" />
              <span className="muted text-sm">김하늘</span>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm" type="button">←</button>
              <button className="btn btn-sm" type="button">→</button>
              <button className="btn btn-sm btn-ghost" type="button">담당자 ▸</button>
              <button className="btn btn-sm btn-danger push-right" type="button">삭제</button>
            </div>
          </div>
        </section>

        {/* ── 완료 (끝 열: → 비활성) ── */}
        <section className="column">
          <div className="column-title">
            <h3>완료</h3>
            <span className="muted text-sm">1</span>
          </div>
          <div className="card stack-sm">
            <div className="row row-between">
              <div className="card-title">디자인 토큰 정리</div>
              <button className="btn btn-sm btn-ghost" type="button">펼치기</button>
            </div>
            <div className="row">
              <img className="avatar avatar-sm" src="https://i.pravatar.cc/80?img=5" alt="박서연" />
              <span className="muted text-sm">박서연</span>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm" type="button">←</button>
              <button className="btn btn-sm" type="button" disabled>→</button>
              <button className="btn btn-sm btn-ghost" type="button">담당자 ▸</button>
              <button className="btn btn-sm btn-danger push-right" type="button">삭제</button>
            </div>
          </div>

          {/* 열이 비었을 때: 카드 대신 이것만 */}
          <div className="empty">카드 없음</div>
        </section>
      </div>
    </div>
  )
}
