export default function AvatarGroup({ member }) {
  return (
    <>
      <div className="avatar-group">
        <img
          className="avatar avatar-sm"
          src={member.avatar}
          alt={member.name}
        />
      </div>
    </>
  );
}
