import { FC, useEffect, useState } from 'react';


const Home: FC = () => {
    const [picGal, setPicGal] = useState("trending")
    const [page, setPage] = useState(1)

    const trnd = document.getElementById("trend") as HTMLInputElement
    const rcnt = document.getElementById("recent") as HTMLInputElement
    useEffect(() => {
        if (trnd && rcnt) {
            if (picGal === "trending") {
                trnd.checked = true
                rcnt.checked = false
            } else {
                rcnt.checked = true
                trnd.checked = false
            }
        }
    }, [picGal])

    return (
        <>
             <section className="pageContents order">
                <input type="radio" id="trend" name="newestSwitch" value="trend" checked />
                <input type="radio" id="recent" name="shuffleSwitch" value="recent" />
                <label htmlFor="trend" onClick={() => setPicGal("trending")}><h2>Trending</h2></label>
                <label htmlFor="recent" onClick={() => setPicGal("recent")}><h2>Newest</h2></label >
                <div className="switch">
                    <div className="toggle">
                        <h2>Trending</h2>
                        <h2>Newest</h2>
                    </div>
                </div>
            </section>
            <article className="pageContents galleryBox">
                <div className="pages">

                </div>
            </article>
        </>
    )
}

export default Home;