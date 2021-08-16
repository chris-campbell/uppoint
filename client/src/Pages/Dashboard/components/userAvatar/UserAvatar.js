import React from 'react'

function UserAvatar({ image }) {
  return (
    <li className="send-user">
      <img src={image} className="send-avatar" />
    </li>
  )
}

export default UserAvatar;
