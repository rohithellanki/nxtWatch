import Cookies from 'js-cookie'

import {Component} from 'react'

import {IoHomeOutline} from 'react-icons/io5'

import {FaFire} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import {MdPlaylistAdd} from 'react-icons/md'

import VideoCard from '../VideoCard'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {videos: [], searchInput: ''}

  componentDidMount() {
    this.gettingData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  gettingData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const newData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        name: eachVideo.channel.name,
        profileImage: eachVideo.channel.profile_image_url,
        viewCount: eachVideo.view_count,
        pubslished: eachVideo.published_at,
      }))
      this.setState({videos: newData})
    }
  }

  onSearching = () => {
    const {videos, searchInput} = this.state
    const searchFilter = videos.filter(eachVideo => {
      return eachVideo.title
        .toLowerCase()
        .includes(searchInput.toLocaleLowerCase())
    })
    return searchFilter
  }

  render() {
    const searching = this.onSearching()
    return (
      <div className="home-container">
        <div className="left-side-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="home-logo"
            />
            <div className="side-bar-heading">
              <IoHomeOutline />
              <p className="name">Home</p>
            </div>

            <div className="side-bar-heading">
              <FaFire />
              <p className="name">Trending</p>
            </div>

            <div className="side-bar-heading">
              <SiYoutubegaming />
              <p className="name">Gaming</p>
            </div>

            <div className="side-bar-heading">
              <MdPlaylistAdd />
              <p className="name">Saved videos</p>
            </div>
          </div>
          <div>
            <h1>CONTACT US</h1>
            <div className="social-media-logos-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                className="social-logo"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                className="social-logo"
                alt=" twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                className="social-logo"
                alt=" linked in logo"
              />
            </div>
            <p className="last-line">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>

        <div className="right-side-container">
          <Header />

          <input
            type="search"
            onChange={this.onChangeSearchInput}
            placeholder="Search"
          />
          <div className="down-container">
            <ul className="ul">
              {searching.map(eachVideo => {
                return <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
