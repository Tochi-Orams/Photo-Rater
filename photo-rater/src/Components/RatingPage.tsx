import { FC, useContext, useEffect } from 'react'
import RatingForm from "./RatingForm";
import OrderContext from '../Context/OrderContext';

const RatingPage: FC = () => {

    // const [picSource, setPicSource] = useState<number>(0)
    const { order, setOrder} = useContext(OrderContext)

    const nwst = document.getElementById("newest") as HTMLInputElement
    const shfl = document.getElementById("shuffle") as HTMLInputElement
    useEffect(() => {
        if (nwst && shfl) {
            if (order === "newest") {
                nwst.checked = true
                shfl.checked = false
            } else {
                shfl.checked = true
                nwst.checked = false
            }
        }
        }, [order])

    return (
        <>
            <section className="pageContents order">
                <input type="radio" id="newest" name="newestSwitch" value="newest" checked />
                <input type="radio" id="shuffle" name="shuffleSwitch" value="shuffled" />
                <label htmlFor="newest" onClick={() => setOrder("newest")}><h2>Newest</h2></label>
                <label htmlFor="shuffle" onClick={() => setOrder("shuffled")}><h2>Shuffled</h2></label >
                <div className="switch">
                    <div className="toggle">
                        <h2>Newest</h2>
                        <h2>Shuffled</h2>
                    </div>
                </div>
            </section>
            <article className="pageContents ratingBox">
                <div className="picFrame">
                    
                </div>
                <RatingForm />
            </article>
        </>
    )
}

export default RatingPage