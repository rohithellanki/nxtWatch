import {Component} from 'react'

import Cookies from 'js-cookie'

import React from 'react'

import ReactPlayer from 'react-player/lazy'

import {AiOutlineLike} from 'react-icons/ai'

import './index.css'

class VideoItemDetail extends Component {
  state = {cards: []}

  componentDidMount() {
    this.getEachVideo()
  }

  getEachVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const newData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({cards: newData})
    }
  }

  render() {
    const {cards} = this.state
    const {
      title,
      videoUrl,
      thumbnailUrl,
      name,
      profileImageUrl,
      subscriberCount,
      viewCount,
      publishedAt,
      description,
    } = cards

    return (
      <div className="each-card-container">
        <ReactPlayer url={videoUrl} width="60" />
        <h1>{title}</h1>
        <div className="views-like-button container">
          <p className="views">{viewCount} Views</p>
          <p>{publishedAt}</p>
          <div className="likes-container">
            <AiOutlineLike />
            <p>Like</p>
            <p>Dislike</p>
            <p>Save</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="channel-comment-container">
          <img src={profileImageUrl} />
          <div className="channel-name-container">
            <p>{name}</p>
            <p>{subscriberCount} subscribers</p>
          </div>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

export default VideoItemDetail
