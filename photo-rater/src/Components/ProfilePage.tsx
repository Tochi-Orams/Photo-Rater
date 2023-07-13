import { FC, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import ProfileContext from '../Context/ProfileContext';
import Settings from './Settings';
import Activity from './Activity';
import Overview from './Overview';

const ProfilePage: FC = () => {
    const { pSection, setPSection } = useContext(ProfileContext)
    const [inf, setInf] = useState(false)
    const [viewAll, setViewAll] = useState("")

    const activeSection = () => {
        const tabs = {
            ovv: document.getElementById("OV"),
            act: document.getElementById("AC"),
            set: document.getElementById("ST")
        }
        console.log(pSection)
        tabs.ovv?.classList.remove("active")
        tabs.act?.classList.remove("active")
        tabs.set?.classList.remove("active")
        if (pSection === "overview") {
            tabs.ovv?.classList.add("active")
        } else if (pSection === "activity") {
            tabs.act?.classList.add("active")
        } else {
            tabs.set?.classList.add("active")
        }
    }

    useEffect(() => {
        activeSection()
    }, [pSection])

    // closing popups
    const win = document.querySelector(".profileBox") as HTMLElement
    useEffect(() => {
        win?.addEventListener("click", () => setInf(false))
        return () => win?.removeEventListener("click", () => setInf(false))
    })

    // Overlay
    const ovl = (document.getElementById("overlay2") as HTMLElement)
    useEffect(() => {
        if (viewAll !== "") {
            ovl?.classList.add("active")
        } else {
            ovl?.classList.remove("active")
        }
    }, [viewAll])

    return (
        <>
            <div id="overlay2" onClick={() => setViewAll("")}>
                <FontAwesomeIcon icon={faX} id="ovlClose" onClick={() => setViewAll("")}/>
            </div>
            <article className="pageContents profileBox">
                <ul className="profSections">
                    <li id="OV" onClick={() => setPSection("overview")}>Overview</li>
                    <li id="AC" onClick={() => setPSection("activity")}>Activity</li>
                    <li id="ST" onClick={() => setPSection("settings")}>Settings</li>
                </ul>
                <section className="settingsContents">
                    {pSection === "overview" ?
                    <Overview />
                    : pSection === "activity" ?
                    <Activity viewAll={viewAll} setViewAll={setViewAll} />
                    :
                    <Settings inf={inf} setInf={setInf} />}
                </section>
            </article>
        </>
    )
}

export default ProfilePage;