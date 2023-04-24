import { FC, useContext, useEffect } from 'react'
import RatingForm from "./RatingForm";
import OrderContext from '../Context/OrderContext';

const RatingPage: FC = () => {

    // const [picSource, setPicSource] = useState<number>(0)
    const { order, setOrder} = useContext(OrderContext)

    const changeOrder = (state: string) => {
        const nwst = document.getElementById("newest") as HTMLInputElement
        const shfl = document.getElementById("shuffle") as HTMLInputElement
        const shuffled = state === "shuffled"
        if (nwst && shfl) {
            if (!shuffled) {
                setOrder("newest")
                nwst.checked = true
                shfl.checked = false
            } else {
                setOrder("shuffled")
                shfl.checked = true
                nwst.checked = false
            }
        }
    }

    useEffect(() => {
        changeOrder(order)
    // eslint-disable-next-line
    })

    return (
        <>
            <section className="pageContents order">
                <input type="radio" id="newest" name="newestSwitch" value="newest" />
                <input type="radio" id="shuffle" name="shuffleSwitch" value="shuffled" />
                <label htmlFor="newest" onClick={() => changeOrder("newest")}><h2>Newest</h2></label>
                <label htmlFor="shuffle" onClick={() => changeOrder("shuffled")}><h2>Shuffled</h2></label >
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