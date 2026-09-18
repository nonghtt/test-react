// 02 실습 시작 마크업 — 전부 하드코딩된 정적 화면입니다.
// 이 파일은 수정하지 말고 참고용으로 두세요. 필요한 마크업을 잘라서 가져가면 됩니다.
//
// 주의: 스타터는 "모양 샘플"입니다. 메뉴 카드 2장·장바구니 2줄만 있지만
// 실제 데이터(src/data/menu.js)는 메뉴 6개입니다. 무엇을 몇 개 보여줄지는 데이터와 요구사항이 기준입니다.
//
// 들어 있는 모양:
//   메뉴 카드   — 담기지 않은 카드 / 담긴 카드(배지 "2개 담김")
//   장바구니    — 항목 2줄(+/- 버튼, 수량, 소계) / 비어 있을 때(empty 상자)
//   요청사항    — 정상(글자 수 표시) / 50자 초과(textarea invalid + 빨간 안내문)
//   주문 버튼   — 활성 / 비활성(disabled)
//   주문 완료   — 초록 alert 상자
// 아래에는 "장바구니에 2개 담긴 상태"와 "비어 있는 상태"를 둘 다 그려 두었습니다. 실제 화면에는 둘 중 하나만 나옵니다.

export default function Starter02() {
  return (
    <div className="container stack">
      <header className="row row-between">
        <h1>카페 주문</h1>
      </header>

      {/* ── 주문 완료 알림: 주문 직후에만 표시 ── */}
      <div className="alert alert-success">주문 완료! 3개 항목, 15,000원</div>

      {/* ── 메뉴 ── */}
      <section className="stack">
        <h2>메뉴</h2>
        <div className="grid">
          {/* 담기지 않은 카드 */}
          <div className="card stack-sm">
            <div className="emoji-lg">☕</div>
            <div className="card-title">아메리카노</div>
            <p className="card-desc">진한 에스프레소에 물을 더한 기본 커피</p>
            <div className="card-footer">
              <span className="muted text-sm">4,500원</span>
              <button className="btn btn-sm push-right">담기</button>
            </div>
          </div>

          {/* 담긴 카드 — 제목 옆에 배지 */}
          <div className="card stack-sm">
            <div className="emoji-lg">🥛</div>
            <div className="row row-between">
              <div className="card-title">카페라떼</div>
              <span className="badge badge-primary">2개 담김</span>
            </div>
            <p className="card-desc">부드러운 우유 거품과 에스프레소</p>
            <div className="card-footer">
              <span className="muted text-sm">5,000원</span>
              <button className="btn btn-sm push-right">담기</button>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── 장바구니: 항목이 있을 때 ── */}
      <section className="stack">
        <div className="row">
          <h2>장바구니</h2>
          <span className="muted text-sm">3개</span>
        </div>

        <ul className="list">
          <li className="list-item">
            <span className="list-item-grow">카페라떼</span>
            <button className="btn btn-sm btn-ghost">−</button>
            <span className="qty">2</span>
            <button className="btn btn-sm btn-ghost">+</button>
            <span className="muted text-sm">10,000원</span>
          </li>
          <li className="list-item">
            <span className="list-item-grow">치즈케이크</span>
            <button className="btn btn-sm btn-ghost">−</button>
            <span className="qty">1</span>
            <button className="btn btn-sm btn-ghost">+</button>
            <span className="muted text-sm">6,500원</span>
          </li>
        </ul>

        <form className="stack">
          {/* 요청사항 — 정상 */}
          <div className="field">
            <label className="label" htmlFor="memo">요청사항</label>
            <textarea id="memo" className="textarea" defaultValue="얼음 적게 주세요" />
            <p className="help">9 / 50자</p>
          </div>

          {/* 요청사항 — 50자 초과: textarea에 invalid, help에 error */}
          <div className="field">
            <label className="label" htmlFor="memo2">요청사항 (초과 상태)</label>
            <textarea
              id="memo2"
              className="textarea invalid"
              defaultValue="얼음은 적게, 시럽은 두 번, 컵홀더 두 개, 빨대는 종이 말고 플라스틱으로, 영수증은 빼 주세요"
            />
            <p className="help error">53 / 50자 — 50자 이하로 줄여 주세요</p>
          </div>

          <div className="row row-between">
            <strong>합계 16,500원</strong>
            <button className="btn btn-primary" type="submit">주문하기</button>
          </div>
        </form>
      </section>

      <hr className="divider" />

      {/* ── 장바구니: 비어 있을 때 — 목록 대신 empty 상자, 주문 버튼은 disabled ── */}
      <section className="stack">
        <div className="row">
          <h2>장바구니</h2>
        </div>

        <div className="empty">아직 담은 메뉴가 없습니다</div>

        <form className="stack">
          <div className="field">
            <label className="label" htmlFor="memo3">요청사항</label>
            <textarea id="memo3" className="textarea" defaultValue="" />
            <p className="help">0 / 50자</p>
          </div>
          <div className="row row-between">
            <strong>합계 0원</strong>
            <button className="btn btn-primary" type="submit" disabled>주문하기</button>
          </div>
        </form>
      </section>
    </div>
  )
}
