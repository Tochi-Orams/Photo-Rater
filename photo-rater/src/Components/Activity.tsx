import { FC, FormEvent, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faChecked, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import UserContext from "../Context/UserContext";
import { ref } from "yup";

interface activProps {
    viewAll: string,
    setViewAll(viewAll: string): any
}
interface rateDeets {
    title: string,
    user: string,
    img: string,
    rating: number
}
interface followDeets {
    img: string,
    user: string,
    time: string,
    following: string
}
interface commentDeets {
    img: string,
    title: string,
    user: string,
    time: string,
    comment: string
}


const Rplaceholder:rateDeets[] = [{
    title: "Placeholder",
    user: "Placehoder",
    img: require("../assets/ex1.jpg"),
    rating: 0
}]
const Fplaceholder:followDeets[] = [{
    img: require("../assets/User.jpg"),
    user: "placeholder",
    time: "1d",
    following: "notFollowing"
}]
const Cplaceholder:commentDeets[] = [{
    img: require("../assets/User.jpg"),
    title: "placeholder",
    user: "placeholder",
    time: "1d",
    comment: "placeholder"
}]



const Activity: FC<activProps> = ({ viewAll, setViewAll }) => {
    const { user, setUser } = useContext(UserContext)
    const [ratings, setRatings] = useState(Rplaceholder)
    const [followers, setFollowers] = useState(Fplaceholder)
    const [comments, setComments] = useState(Cplaceholder)

    // Ratings
    let temporaryR: rateDeets[] = [
        {
            title: "Misty Forest",
            user: "User_1253",
            img: require("../assets/ex1.jpg"),
            rating: 4
        },
        {
            title: "Beautiful Boat",
            user: "PixxMan-27",
            img: require("../assets/ex2.jpg"),
            rating: 3
        },
        {
            title: "Rainy Day",
            user: "PhotoNomad_",
            img: require("../assets/ex3.jpg"),
            rating: 5
        }
    ]

    useEffect(() => {
        if (temporaryR.length !== 0) {
            setRatings(temporaryR)
        } else {
            setRatings(Rplaceholder)
        }
    }, [])

    // Followers
    let temporaryF: followDeets[] = [
        {
            img: require("../assets/Kat.jpg"),
            user: "SuperKat_101",
            time: "3h",
            following: "notFollowing"
        },
        {
            img: require("../assets/Leslie.jpg"),
            user: "LeslieOfc",
            time: "2d",
            following: "notFollowing"
        },
        {
            img: require("../assets/User.jpg"),
            user: "TheRealBanksy",
            time: "1w",
            following: "Following"
        },
    ]

    useEffect(() => {
        if (temporaryF.length !== 0) {
            setFollowers(temporaryF)
        } else {
            setFollowers(Fplaceholder)
        }
        console.log(followers)
    }, [])

    const follow = (user: string, i: number) => {
        const tempF = [...followers]
        tempF[i].following  = "Following"
        setFollowers(tempF)
    }

    // Comments
    let temporaryC: commentDeets[] = [
        {
            img: require("../assets/ex1.jpg"),
            title: "Misty Forest",
            user: "User_1253",
            time: "36m",
            comment: "Wow... just Wow 😍",
        },
        {
            img: require("../assets/ex2.jpg"),
            title: "Beautiful Boat",
            user: "PixxMan-27",
            time: "2h",
            comment: "The mountains are such a beautfiul backgrop",
        },
        {
            img: require("../assets/ex3.jpg"),
            title: "Rainy Day",
            user: "PhtoNomad_",
            time: "3d",
            comment: "The yellow hilights here are something special. Great shot!",
        },
    ]

    useEffect(() => {
        if (temporaryC.length !== 0) {
            setComments(temporaryC)
        } else {
            setComments(Cplaceholder)
        }
    }, [])

    // Window to view all
    const vAll = (document.getElementById("VAll") as HTMLElement)
    useEffect(() => {
        if (viewAll !== "") {
            vAll?.classList.add("active")
        } else {
            vAll?.classList.remove("active")
        }
    }, [viewAll])

    return(
        <div id="tivity">
            <div id="actLeft">
                <section className="actSec prate">
                    <span className="acHead acHead1 cMarg">
                        <h2>Ratings</h2>
                        <span id="viewAll" onClick={() => setViewAll("ratings")}>
                            <p>View All</p>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </span>
                    </span>
                    {temporaryR.length ? <div id="prevRatings">
                        {ratings.map((item, i) => (
                            <div key={i} id="acRating">
                                <div>
                                    <h3>{item.title}</h3>
                                    <span>
                                        <p id="acBy">By:</p>
                                        <Link to="/user" onClick={() => setUser(item.user)}>
                                            <p>{item.user}</p>
                                        </Link>
                                    </span>
                                </div>
                                <img src={item.img} alt={item.title}/>
                                <div id="ratingBubble">
                                    <FontAwesomeIcon icon={faChecked} color="orange"/>
                                    <h4>{item.rating}/5</h4>
                                </div>
                            </div>))}
                    </div>
                    :
                    <div id="prevRatings" className="faintNotice">
                        <h3>It looks like you haven't rated any photos yet</h3>
                        <span>
                            <Link to="/rate"><h4>Click here</h4></Link>
                            <h4>to start rating!</h4>
                        </span>
                    </div>}
                </section>
                <section className="actSec">
                    <span className="acHead">
                        <h2>Follows</h2>
                        <span id="viewAll" onClick={() => setViewAll("followers")}>
                            <p>View All</p>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </span>
                    </span>
                    {temporaryF.length ? <div id="newFollows">
                        {followers.map((item, i) => (
                            <div key={i} id="followCard">
                                <Link to="/user" key={i} onClick={() => setUser(item.user)}>
                                    <img src={item.img} alt={item.user}/>
                                    <div>
                                        <h4>{item.user}</h4>
                                        <p>followed you {item.time} ago</p>
                                    </div>
                                </Link>
                                {item.following === "notFollowing" ?
                                <div className="Button Following" onClick={() => follow(item.user, i)}>
                                    Follow Back
                                </div>
                                :
                                <div className="Button notFollowing" >
                                    Following
                                </div>}
                            </div>
                        ))}
                    </div>
                    :
                    <div id="newFollowers" className="faintNotice">
                        <h3>You have no new followers</h3>
                    </div>}
                </section>
            </div>
            <section className="actSec actSec2">
                <span className="acHead acHead1 commHead">
                    <h2>Comments</h2>
                    <span id="viewAll" onClick={() => setViewAll("comments")}>
                        <p>View All</p>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </span>
                </span>
                {temporaryC.length ? <div id="acComm">
                    {comments.map((item, i) => (
                        <div key={i} id="commBox">
                            <img src={item.img} alt={item.title}/>
                            <span>
                                <p>On <b>{item.title}</b> by</p>
                                <Link to="/user" key={i} onClick={() => setUser(item.user)}>
                                    {item.user}
                                </Link>
                            </span>
                            <p id="commTxt">{item.comment}</p>
                            <p id="commtime">{item.time}</p>
                        </div>
                    ))}
                </div>
                :
                <div id="acComm" className="faintNotice">
                    <h3>It doesn't look like you've left any comments</h3>
                </div>}
            </section>
            <section id="VAll">

            </section>
        </div>
    )
}

export default Activity;