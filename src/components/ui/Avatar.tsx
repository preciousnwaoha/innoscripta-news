import { useMemo } from "react";
import "./Avatar.css"

const Avatar = () => {
  // Generate a random seed once per mount for a consistent avatar
  const seed = useMemo(() => Math.random().toString(36).substring(2, 10), []);
  const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;

  return (
    <div
     className="avatar"
    >
      <img
      key={seed}
        src={avatarUrl}
        alt="User Avatar"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
