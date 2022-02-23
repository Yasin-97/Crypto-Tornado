import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Avatar() {
  const { displayName, email } = useSelector(
    (state) => state.authApi.currentUser
  );
  const user = displayName || email;
  const displayUser = () => (user.length > 15 ? `${user.substring(0, 15)}...` : user);

  return (
    <div className="avatar">
      <UserOutlined />
      <p role='avatar-name'>{displayUser()}</p>
    </div>
  );
}
