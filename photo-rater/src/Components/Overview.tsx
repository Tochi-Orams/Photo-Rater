import { FC, useState, useContext, useEffect, FormEvent, useRef, RefObject } from "react"
import { Link } from 'react-router-dom';
import { faLink, faStar, faComment, faCommentSlash, faX, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faInstagram, faFacebook, faTiktok, faLinkedin, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmojiPicker, {Theme, EmojiStyle} from 'emoji-picker-react';

import ProfileContext from "../Context/ProfileContext";
import AccentContext from "../Context/AccentContext";
import ThemeContext from "../Context/ThemeContext";
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
                        to: {name: "n00b_pics", com: -1},
                        comment: "F-stop f/5.6, Exposure time 1/1600 sec, ISO 320, Focal Length 420mm",
                        time: "37m"
                    }
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
    const [del, setDel] = useState({pic: -1, comment: -1, reply: -1, conf: 0})
    const [view, setView] = useState(false)
    const [emoji, setEmoji] = useState(false)
    const [repTxt, setRepTxt] = useState<string>("")
    const [replying, setReplying] = useState({c: -1, r: -1})

    const RepRef = useRef() as RefObject<HTMLDivElement>
    const reftext = document.querySelector(".HTInput") as HTMLElement

    const { pSection, setPSection } = useContext(ProfileContext)
    const { accent, setAccent } = useContext(AccentContext)
    const { theme, setTheme } = useContext(ThemeContext)
    const [pics, setPics] = useState(pictures)

    // Viewing the posts (on click)
    const overlay = document.getElementById("overlay3") as HTMLElement
    const postView = document.getElementById("postView") as HTMLElement

    useEffect(() => {
        if (view) {
            overlay?.classList.add("active")
            postView?.classList.add("active")
        } else {
            overlay?.classList.remove("active")
            postView?.classList.remove("active")
        }
    }, [view])

    const enlarge = (i: number) => {
        if (i > -1) {
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
                            <div id="starComm">
                                <div>
                                    <span>
                                        <FontAwesomeIcon id="postIcon" icon={faStar} color="orange" />
                                        <p>{pics[i].rating[0]}</p>
                                        <p>({pics[i].rating[1]} ratings)</p>
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <FontAwesomeIcon id="postIcon" icon={faComment} color="#b4b4b4" />
                                        <p>{getComNum(i)}</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id="postComments">
                            {pics[i].comms.length ?
                            pics[i].comms.map((item, x) => (
                                <div key={x}>
                                    <div className="postComment" id={`p${i}_Com${x}`}>
                                        <img src={item.pic} alt={item.name} />
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>{item.comment}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    </div>
                                    <div className="commReply" id={`p${i}_RepBox${x}`} onClick={() => foc(`p${i}_RepBox${x}`)}>
                                        <div id="emoji" style={{color: theme === "dark" ? "white" : ""}}>
                                            <FontAwesomeIcon icon={faFaceSmile} onClick={() => setEmoji(!emoji)}/>
                                            {emoji && <div id="emojiPicker"><EmojiPicker/></div>}
                                        </div>
                                        <div
                                            contentEditable={true}
                                            ref={RepRef}
                                            id={`p${i}_RepTxt${x}`}
                                            placeholder="Add a comment..."
                                            className="replyTxt"
                                            onInput={() => handleChange(`p${i}_RepTxt${x}`)}
                                        />
                                        <button className="Button" onClick={() => submitReply(repTxt, i, x, -1)}>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </button>
                                    </div>
                                    <div id="postActions" style={{color: theme === "dark" && accent === "blk" ? "white" : ""}}>
                                        {replying.c !== x ?
                                        <>
                                            <p onClick={() => reply(i, x, -1)}>Reply</p>
                                            <p onClick={() => {removal()
                                            setDel({pic: i, comment: x, reply: -1, conf: 0})}}>
                                                Remove
                                            </p>
                                        </>
                                        :
                                        <p
                                          onClick={() => cancelReply(i, x, -1)}
                                          style={{margin: "0 0 0 auto"}}
                                        >Cancel</p>}
                                    </div>
                                    {item.replies.length > 0 && <div id="replies">
                                        {item.replies.map((rep, idx) => (
                                            <div key={idx}>
                                                <div className="postComment pc2" id={`p${i}_c${x}_Rep${idx}`}>
                                                    <img src={rep.pic} alt={rep.name} />
                                                    <div>
                                                        <h3>{rep.name}</h3>
                                                        <p>
                                                            <em
                                                              onClick={() => goToComment(i, x, rep.to.com)}
                                                              style={{color: theme === "dark" ? "white" : ""}}
                                                            >
                                                                {`@${rep.to.name}`}
                                                            </em>
                                                            {rep.comment}
                                                        </p>
                                                        <p>{rep.time}</p>
                                                    </div>
                                                </div>
                                                <div className="commReply" id={`p${i}_c${x}_RepBox${idx}`} onClick={() => foc(`p${i}_c${x}_RepBox${idx}`)}>
                                                    <div id="emoji" style={{color: theme === "dark" ? "white" : ""}}>
                                                        <FontAwesomeIcon icon={faFaceSmile} onClick={() => setEmoji(!emoji)}/>
                                                        {emoji && <div id="emojiPicker"><EmojiPicker/></div>}
                                                    </div>
                                                    <div
                                                      contentEditable={true}
                                                      ref={RepRef}
                                                      id={`p${i}_c${x}_RepTxt${idx}`}
                                                      placeholder="Add a comment..."
                                                      className="replyTxt"
                                                      onInput={() => handleChange(`p${i}_c${x}_RepTxt${idx}`)}
                                                    />
                                                    <button className="Button" onClick={() => submitReply(repTxt, i, x, idx)}>
                                                        <FontAwesomeIcon icon={faPaperPlane} />
                                                    </button>
                                                </div>
                                                <div id="postActions" style={{color: theme === "dark" && accent === "blk" ? "white" : ""}}>
                                                    {replying.r !== idx ?
                                                    <>
                                                        <p onClick={() => reply(i, x, idx)}>Reply</p>
                                                        <p onClick={() => {removal()
                                                        setDel({pic: i, comment: x, reply: idx, conf: 0})}}>
                                                            Remove
                                                        </p>
                                                    </>
                                                    :
                                                    <p
                                                      onClick={() => cancelReply(i, x, idx)}
                                                      style={{margin: "0 0 0 auto"}}
                                                    >Cancel</p>}
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

    // handle comment box focus
    const foc = (id: string) => {
        (document.getElementById(id) as HTMLElement).classList.add("foc")
    }

    // Comment actions
    const reply = (i: number, x: number, idx: number) => {
        (document.querySelectorAll(".commReply") as NodeList).forEach((rep) => {
            (rep as HTMLElement).classList.remove("active")
        })
        if (idx !== -1) {
            setReplying({c: -1, r: idx})
            const rBox = document.getElementById(`p${i}_c${x}_RepBox${idx}`) as HTMLElement
            rBox?.classList.add("active")
            rBox?.scrollIntoView({behavior: "smooth", inline: "nearest", block: "nearest"})
        } else {
            setReplying({c: x, r: -1})
            const rBox = document.getElementById(`p${i}_RepBox${x}`) as HTMLElement
            rBox?.classList.add("active")
            rBox?.scrollIntoView({behavior: "smooth", inline: "nearest", block: "nearest"})
        }
    }

    const cancelReply = (i: number, x: number, idx: number) => {
        if (idx !== -1) {
            (document.getElementById(`p${i}_c${x}_RepBox${idx}`) as HTMLElement).classList.remove("active")
        } else {
            (document.getElementById(`p${i}_RepBox${x}`) as HTMLElement).classList.remove("active")
        }
        setReplying({c: -1, r: -1})
    }

    // ask to remove comment
    const confirm = document.getElementById("removeComment") as HTMLElement
    const removal = () => {
        confirm?.classList.add("active")
    }

    // confirm comment removal
    useEffect(() => {
        confirm?.classList.remove("active")
        if (del.conf === 2) {
            if (del.reply === -1) {
                const copy = [...pics]
                copy[del.pic].comms.splice(del.comment, 1)
                setPics(copy)
            } else {
                const copy = [...pics]
                copy[del.pic].comms[del.comment].replies.splice(del.reply, 1)
                setPics(copy)
            }
        }
        setDel({pic: -1, comment: -1, reply: -1, conf: 0})
    }, [del.conf])

    // Keep track of reply text
    const handleChange = (id: string) => {
        const elem = document.getElementById(id) as HTMLElement
        setRepTxt(elem?.innerHTML)
    }

    // Get number of comments
    const getComNum = (i: number) => {
        let comNum = 0
        comNum += pics[i].comms.length
        pics[i].comms.forEach(rep => {
            comNum += rep.replies.length
        })
        return comNum
    }

    // Highlight replied comment
    const goToComment = (pic: number, idx: number, com: number) => {
        if (com > -1) {
            let rRep = document.getElementById(`p${pic}_c${idx}_Rep${com}`) as HTMLElement
            rRep?.scrollIntoView({behavior: "smooth", inline: "nearest", block: "nearest"})
            rRep?.classList.add("active")
            setTimeout(() => {
                rRep?.classList.remove("active")
            }, 2000);
        } else {
            let rComm = document.getElementById(`p${pic}_Com${idx}`) as HTMLElement
            rComm?.scrollIntoView({behavior: "smooth", inline: "nearest", block: "nearest"})
            rComm?.classList.add("active")
            setTimeout(() => {
                rComm?.classList.remove("active")
            }, 2000);
        }
    }

    // submit reply
    const submitReply = (text: string, pic: number, comment: number, rep: number) => {
        let newReply
        if (rep !== -1) {
            (document.getElementById(`p${pic}_c${comment}_RepBox${rep}`) as HTMLElement).classList.remove("active")
            const nRep = document.getElementById(`p${pic}_c${comment}_RepBox${rep}`) as HTMLElement
            nRep?.scrollIntoView({behavior: "smooth", inline: "nearest", block: "nearest"})

            newReply = {
                name: user[0],
                pic: user[1],
                to: {name: pics[pic].comms[comment].replies[rep].name, com: rep},
                comment: text,
                time: "now" // need to change
            }
        } else {
            (document.getElementById(`p${pic}_RepBox${comment}`) as HTMLElement).classList.remove("active")
            const nRep = document.getElementById(`p${pic}_RepBox${comment}`) as HTMLElement
            nRep?.scrollIntoView({behavior: "smooth", inline: "nearest", block: "nearest"})

            newReply = {
                name: user[0],
                pic: user[1],
                to: {
                    name: pics[pic].comms[comment].name,
                    com: -1
                },
                comment: text,
                time: "now" // need to change
            }
        }

        (document.querySelectorAll(".replyTxt") as NodeList).forEach(text => {
            (text as HTMLElement).innerHTML = ""
        })

        const repCopy = [...pics]
        repCopy[pic].comms[comment].replies.push(newReply)
        setPics(repCopy)

        setReplying({c: -1, r: -1})
        setRepTxt("")
    }

    // submit changed post data to backend
    useEffect(() => {

    })

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
                        <div key={i} id="post" onClick={() => setView(true)}>
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
                                        <p>{getComNum(i)}</p>
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
                <h2>Remove comment permanently?</h2>
                <span>
                    <button className="Button medButton" onClick={() => setDel({...del, conf: 2})}>
                        Yes
                    </button>
                    <button className="Button medButton" onClick={() => setDel({...del, conf: 1})}>
                        No
                    </button>
                </span>
            </div>
            <div id="overlay3" onClick={() => setView(false)}>
                <FontAwesomeIcon icon={faX} onClick={() => setView(false)} />
            </div>
        </div>
    )
}

export default Overview;