import { FC, useState } from 'react';


const Home: FC = () => {
    const [picGal, setPicGal] = useState("trending")
    const [page, setPage] = useState(1)

    const toggleGal = (state: string) => {
        const trnd = document.getElementById("trend") as HTMLInputElement
        const rcnt = document.getElementById("recent") as HTMLInputElement
        const trndng = state === "trending"
        if (trnd && rcnt) {
            if (!trndng) {
                setPicGal("trending")
                trnd.checked = true
                rcnt.checked = false
            } else {
                setPicGal("recent")
                trnd.checked = true
                rcnt.checked = false
            }
        }
    }

    return (
        <>
             <section className="pageContents order">
                <input type="radio" id="trend" name="newestSwitch" value="trend" />
                <input type="radio" id="recent" name="shuffleSwitch" value="recent" />
                <label htmlFor="trend" onClick={() => toggleGal("trending")}><h2>Trending</h2></label>
                <label htmlFor="recent" onClick={() => toggleGal("recent")}><h2>Newest</h2></label >
                <div className="switch">
                    <div className="toggle">
                        <h2>Trending</h2>
                        <h2>Newest</h2>
                    </div>
                </div>
            </section>
            <article className=" pageContents galleryBox">
                <div className="pages">

                </div>
            </article>
        </>
    )
}

export default Home;