import {Link} from 'react-router-dom'

import './index.css'

const VideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, name, profileImage, viewCount} = videoDetails
  return (
    <li className="each-li">
      <Link to={`/videos/${id}`}>
        <img src={thumbnailUrl} className="thumbnail-image" />
      </Link>
      <div className="profile-image-container">
        <img src={profileImage} className="profile-image" />
        <p>{title}</p>
      </div>
      <p>{name}</p>
      <p className="views">{viewCount}</p>
    </li>
  )
}
export default VideoCard
