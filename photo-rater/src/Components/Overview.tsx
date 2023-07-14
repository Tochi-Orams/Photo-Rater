import { FC, useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom';
import { faLink, faStar, faComment, faCommentSlash, faX} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTiktok, faLinkedin, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileContext from "../Context/ProfileContext";
// import PicData from "./PicData"

const user = ["PhotoNomad_", require("../assets/chloe.jpg")]

const temporaryP = [
    {
        pic: user[1],
        name: user[0],
        followers: 37,
        following: 52,
        about: "My pictures take you on a journey. Join me and let's explore together",
        website: "https://google.com"
    }
]
const temporaryS = [
    {
        plat: "instagram",
        link: "https://instagram.com"
    },
    {
        plat: "tiktok",
        link: "https://tiktok.com"
    }
]

// const { pics } = PicData()
// console.log(pics)

const pictures = [
    {
        pic: require("../assets/pic0.jpg"),
        title: "Majestic Clouds",
        time: "2d",
        rating: [4.9, 36],
        comms: [
            {
                name: "pixGenius",
                pic: require("../assets/genius.jpg"),
                comment: "This doesnt even look real! what an amazing shot!",
                time: "11m",
                replies: []
            },
            {
                name: "wendy123",
                pic: require("../assets/wendy.jpg"),
                comment: "I'm so jealous that you got to see this irl 😍",
                time: "6h",
                replies: []
            },
            {
                name: "n00b_pics",
                pic: require("../assets/User.jpg"),
                comment: "What camera settings did you use to get this effect?",
                time: "1d",
                replies: [
                    {
                        name: user[0],
                        pic: user[1],
                        comment: "F-stop f/5.6, Exposure time 1/1600 sec, ISO 320, Focal Length 420mm",
                        time: "37m",}
                ]
            }
        ]
    },
    {
        pic: require("../assets/pic1.jpg"),
        title: "Midnight Mass",
        time: "5d",
        rating: [4.7, 19],
        comms: [
            {
                name: "_thatguy_",
                pic: require("../assets/thatguy.jpg"),
                comment: "Long exposure photography is my favourite!",
                time: "11m",
                replies: []
            }
        ]
    },
    {
        pic: require("../assets/pic3.jpg"),
        title: "Dawn Beach",
        time: "6d",
        rating: [4.3, 22],
        comms: []
    },
]

const Overview: FC = () => {
    const [post, setPost] = useState(-1)
    const [del, setDel] = useState(false)

    const { pSection, setPSection } = useContext(ProfileContext)
    const [pics, setPics] = useState(pictures)

    // Viewing the posts (on click)
    const overlay = document.getElementById("overlay3") as HTMLElement
    const postView = document.getElementById("postView") as HTMLElement

    const enlarge = (i: number) => {
        if (i > -1) {
            overlay?.classList.add("active")
            postView?.classList.add("active")
            return (
                <div id="postViewing">
                    <img id="postImg" src={pics[i].pic} alt={pics[i].title} />
                    <div id="postComms">
                        <div id="postHeader">
                            <div>
                                <img src={user[1]} alt={user[0]}/>
                                <span id="poster">
                                    <h2>{pics[i].title}</h2>
                                    <p>{user[0]}</p>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <FontAwesomeIcon id="postIcon" icon={faStar} color="orange" />
                                    <p>{pics[i].rating[0]}</p>
                                </span>
                                <p>({pics[i].rating[1]} ratings)</p>
                            </div>
                        </div>
                        <div id="postComments">
                            {pics[i].comms.length ?
                            pics[i].comms.map((item, x) => (
                                <div key={x}>
                                    <div className="postComment">
                                        <img src={item.pic} alt={item.name} />
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>{item.comment}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    </div>
                                    <div id="postActions">
                                        <p onClick={() => reply(i, x)}>Reply</p>
                                        <p onClick={() => removing(i, x)}>Remove</p>
                                    </div>
                                    {item.replies.length > 0 && <div id="replies">
                                        {item.replies.map((rep, idx) => (
                                            <div key={idx} className="postComment pc2">
                                                <img src={rep.pic} alt={rep.name} />
                                                <div>
                                                    <h3>{rep.name}</h3>
                                                    <p>{rep.comment}</p>
                                                    <p>{rep.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>}
                                </div>
                            ))
                            :
                            <div id="nothingYet">
                                <FontAwesomeIcon icon={faCommentSlash} size="5x" />
                                <h2>Nothing here yet</h2>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    const unlarge = () => {
        overlay?.classList.remove("active")
        postView?.classList.remove("active")
    }

    // Comment actions
    const reply = (i: number, x: number) => {

    }

    // ask to remove comment
    const confirm = document.getElementById("removeComment") as HTMLElement
    const removal = (i: number, x: number) {
        confirm?.classList.add("active")
    }

    // confirm comment removal
    const remove = (i: number, x: number, conf: boolean) => {
        confirm?.classList.remove("active")
        if (conf) {
            const copy = [...pics]
            copy[i].comms.splice(x, 1)
            setPics(copy)
        }
    }

    return (
        <div id="overview">
            <div id="PFO">
                {temporaryP.map((item, i) => (
                    <div key={i} className="you">
                        <img src={item.pic} alt={item.name} />
                        <h2>{item.name}</h2>
                        <span>
                            <div>
                                <p>{item.followers}</p>
                                <p>Followers</p>
                            </div>
                            <div>
                                <p>{item.following}</p>
                                <p>Following</p>
                            </div>
                        </span>
                        <p>{item.about}</p>
                        <div id="ovLink">
                            <FontAwesomeIcon icon={faLink} />
                            <a href={item.website} target="_blank">
                                {item.website}
                            </a>
                        </div>
                    </div>
                ))}
                <div id="ovSoc">
                    {temporaryS.map((social, x: number) => (
                        <a key={x} href={social.link} target="_blank">
                            {social.plat === "instagram" ?
                            <span className="socIcon3"><FontAwesomeIcon icon={faInstagram} /></span>
                            : social.plat === "facebook" ?
                            <span className="socIcon3"><FontAwesomeIcon icon={faFacebook} /></span>
                            : social.plat === "tiktok" ?
                            <span className="socIcon3"><FontAwesomeIcon icon={faTiktok} /></span>
                            : social.plat === "twitter" ?
                            <span className="socIcon3"><FontAwesomeIcon icon={faTwitter} /></span>
                            : social.plat === "linkedin" ?
                            <span className="socIcon3"><FontAwesomeIcon icon={faLinkedin} /></span>
                            : social.plat === "pinterest" ?
                            <span className="socIcon3"><FontAwesomeIcon icon={faPinterest} /></span>
                            :
                            <span></span>}
                        </a>
                    ))}
                </div>
                <Link to="/profile">
                    <button className="Button medButton" onClick={() => setPSection("settings")}>
                        Edit Profile
                    </button>
                </Link>
            </div>
            <div id="ovContents">
                <h2>Posts ({pics.length})</h2>
                <div id="allPics">
                    {pics.map((item, i) => (
                        <div key={i} id="post">
                            <img src={item.pic} alt={item.title} />
                            <div id="pDeets" onClick={() => setPost(i)}>
                                <span id="postNums">
                                    <span id="postRate">
                                        <span>
                                            <FontAwesomeIcon id="postIcon" icon={faStar} color="orange" />
                                            <p>{item.rating[0]}</p>
                                        </span>
                                        <p id="rateNum">({item.rating[1]} ratings)</p>
                                    </span>
                                    <span>
                                        <FontAwesomeIcon id="postIcon" icon={faComment} color="#b4b4b4" />
                                        <p>{item.comms.length}</p>
                                    </span>
                                </span>
                                <h3>{item.title}</h3>
                                <p id="posted">Posted {item.time} days ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id="postView">
                {enlarge(post)}
            </div>
            <div id="removeComment">
                <h2>Remove this comment permanently?</h2>
                <span>
                    <button className="Button medButton" onClick={() => setDel(true)}>
                        Yes
                    </button>
                    <button className="Button medButton" onClick={() => setDel(true)}>
                        No
                    </button>
                </span>
            </div>
            <div id="overlay3" onClick={unlarge}>
                <FontAwesomeIcon icon={faX} onClick={unlarge} />
            </div>
        </div>
    )
}

export default Overview;