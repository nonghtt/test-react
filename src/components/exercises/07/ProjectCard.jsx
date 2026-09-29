import AvatarGroup from "../../ui/AvatarGroup";
import Badge from "../../ui/Badge";

// 정적 버전. 「디자인 시스템 개편」 카드가 하드코딩되어 있다.
// 상태 배지 색 — 진행 중 primary · 지연 warn · 완료 success
export default function ProjectCard() {
  return (
    <div className="card">
      <div className="card-title">
        <a href="/projects/12">디자인 시스템 개편</a>
      </div>
      <p className="card-desc">버튼·폼·카드 컴포넌트를 새 토큰 기반으로 다시 만든다.</p>
      <div className="card-footer">
        <Badge tone="primary">진행 중</Badge>
        <AvatarGroup
          members={[
            { id: 1, name: "김하늘", avatar: "https://i.pravatar.cc/80?img=1" },
            { id: 3, name: "박서연", avatar: "https://i.pravatar.cc/80?img=5" },
          ]}
        />
        <span className="muted text-sm push-right">~ 2026-10-15</span>
      </div>
    </div>
  );
}
