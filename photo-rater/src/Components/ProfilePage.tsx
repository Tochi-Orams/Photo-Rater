import { FC, useContext, useEffect } from 'react';
import ProfileContext from '../Context/ProfileContext';
import Settings from './Settings';

const ProfilePage: FC = () => {
    const { pSection, setPSection } = useContext(ProfileContext)

    const tabs = {
        ovv: document.getElementById("OV"),
        act: document.getElementById("AC"),
        set: document.getElementById("ST")
    }

    const activeSection = () => {
        tabs.ovv?.classList.remove("active")
        tabs.act?.classList.remove("active")
        tabs.set?.classList.remove("active")
        if (pSection === "overview") {
            console.log("overview")
            tabs.ovv?.classList.add("active")
        } else if (pSection === "activity") {
            tabs.act?.classList.add("active")
        } else {
            tabs.set?.classList.add("active")
        }
    }

    useEffect(() => {
        console.log(pSection)
        activeSection()
    }, [pSection])

    return (
        <article className="pageContents profileBox">
            <ul className="profSections">
                <li id="OV" onClick={() => setPSection("overview")}>Overview</li>
                <li id="AC" onClick={() => setPSection("activity")}>Activity</li>
                <li id="ST" onClick={() => setPSection("settings")}>Settings</li>
            </ul>
            <section className="settingsContents">
                {pSection === "overview" ?
                <div></div>
                : pSection === "activity" ?
                <div></div>
                :
                <Settings />}
            </section>

        </article>
    )
}

export default ProfilePage;