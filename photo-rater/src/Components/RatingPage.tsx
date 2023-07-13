import { FC, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import RatingForm from "./RatingForm";
import OrderContext from '../Context/OrderContext';

const temporaryP = [require("../assets/ex1.jpg"), require("../assets/ex2.jpg")]
const temporaryU = ["User_1253", "PixxMan-27"]
const temporaryD = ["Misty Forest", "Beautiful Boat"]

const RatingPage: FC = () => {
    // Change order of pictures
    const { order, setOrder} = useContext(OrderContext)

    useEffect(() => {
        const swtch = document.querySelectorAll(".switchLabel") as NodeList
        const nwst = (swtch[0] as HTMLElement)
        const shfl = (swtch[1] as HTMLElement)
        if (order === "newest") {
            nwst.classList.add("active")
            shfl.classList.remove("active")
        } else {
            nwst.classList.remove("active")
            shfl.classList.add("active")
        }
    }, [order])

    // Getting the current picture
    const [currentPic, setCurrentPic] = useState(0)
    const [photos, setPhotos] = useState(temporaryP)

    // Expand and collapse picture
    const FF = document.getElementById("overlay2") as HTMLElement

    const expand = () => {
        FF?.classList.add("active")
    }
    const collapse = () => {
        FF?.classList.remove("active")
    }


    useEffect(() => {

    }, [currentPic])

    return (
        <>
            <div id="overlay2" onClick={collapse}>
                <img className="bigPhoto" src={photos[currentPic]} alt={temporaryD[currentPic]}/>
                <FontAwesomeIcon icon={faX} id="ovlClose" />
            </div>
            <section className="pageContents order">
                <h2 className="switchLabel" onClick={() => setOrder("newest")}>Newest</h2>
                <h2 className="switchLabel" onClick={() => setOrder("shuffled")}>Shuffled</h2>
                <div className="switch">
                    <div className="toggle">
                        <h2>Newest</h2>
                        <h2>Shuffled</h2>
                    </div>
                </div>
            </section>
            <article className="pageContents ratingBox">
                <div className="picFrame">
                    <img className="ratePhoto" src={photos[currentPic]} alt="forest" onClick={expand}/>
                    <div id="uploader" onClick={expand}>
                        <span id="picUser">
                            <img id="userP" src={require("../assets/User.jpg")} alt="user" />
                            <h2>{temporaryU[currentPic]}</h2>
                        </span>
                        <h2>{temporaryD[currentPic]}</h2>
                    </div>
                </div>
                <RatingForm
                  currentPic={currentPic}
                  setCurrentPic={setCurrentPic}
                  photos={photos}
                  setPhotos={setPhotos}
                />
            </article>
        </>
    )
}

export default RatingPage