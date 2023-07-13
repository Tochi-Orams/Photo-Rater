import { FC, useEffect, useState } from 'react';


const Home: FC = () => {
    const [picGal, setPicGal] = useState("trending")
    const [page, setPage] = useState(1)

    useEffect(() => {
        const swtch = document.querySelectorAll(".switchLabel") as NodeList
        const trnd = (swtch[0] as HTMLElement)
        const rcnt = (swtch[1] as HTMLElement)
        if (picGal === "recent") {
            trnd.classList.add("active")
            rcnt.classList.remove("active")
        } else {
            trnd.classList.remove("active")
            rcnt.classList.add("active")
        }
    }, [picGal])

    return (
        <>
            <section className="pageContents order">
                <h2 className="switchLabel" onClick={() => setPicGal("recent")}>Newest</h2>
                <h2 className="switchLabel" onClick={() => setPicGal("trending")}>Trending</h2>
                <div className="switch">
                    <div className="toggle">
                        <h2>Newest</h2>
                        <h2>Trending</h2>
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