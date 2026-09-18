export default function MenuAlert({ alertMenus }) {
  return (
    <div className="alert alert-success">
      주문 완료! {alertMenus.qty}개 항목, {alertMenus.pay.toLocaleString()}원
    </div>
  );
}
