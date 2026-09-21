export default function AvatarGroup({ members }) {
  if (members.length === 0) {
    return;
  } else {
    return (
      <div className="avatar-group">
        {members.map((member) => {
          return (
            <img
              className="avatar avatar-sm"
              src={member.avatar}
              alt={member.name}
              key={member.id}
            />
          );
        })}
      </div>
    );
  }
}
