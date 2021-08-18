import React from 'react'
import './css/UserAvatar.css'

function UserAvatar({ image }) {
  return (
    <li className="send-user">
      <img src={image} className="send-avatar" />
    </li>
  )
}

export default UserAvatar;
