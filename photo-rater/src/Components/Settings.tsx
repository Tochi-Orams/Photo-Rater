import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCirclePlus, faX, faCircleCheck, faCircleXmark, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTiktok, faLinkedin, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";

var isEqual = require('lodash.isequal');

library.add(faInstagram, faFacebook, faTiktok, faLinkedin, faTwitter, faPinterest)

const prof: {Pic?: string, FN: string, LN: string, Bio: string, Web: string} = {
    Pic: "https://icons-for-free.com/iconfiles/png/512/person+user+icon-1320166085409390336.png",
    FN: "Firstname",
    LN: "Lastname",
    Bio: "",
    Web: ""
}

const tempsoc = [
    {
        icon: <FontAwesomeIcon icon={faInstagram} />,
        plat: "instagram",
        url: "https://instagram.com"
    },
    {
        icon: <FontAwesomeIcon icon={faFacebook} />,
        plat: "facebook",
        url: "https://facebook.com"
    },
    {
        icon: <FontAwesomeIcon icon={faTiktok} />,
        plat: "tiktok",
        url: "https://tiktok.com",
    },
]

interface ProfileProps {
    setPChange(value: boolean): void
}

const Profile: FC<ProfileProps> = ({setPChange}) => {
    const [socials, setSocials] = useState(tempsoc)
    const [socEdit, setSocEdit] = useState([false, 0])
    const [socOp, setSocOp] = useState("select one")
    const [edits, setEdits] = useState(false)

    const URL = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

    const profFormik = useFormik({
        initialValues: {
            FN: prof.FN,
            LN: prof.LN,
            Bio: prof.Bio,
            Web: prof.Web
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            pic: Yup.string(),
            FN: Yup.string().required(),
            LN: Yup.string(),
            Bio: Yup.string().max(500),
            Web: Yup.string().matches(URL, "Enter a valid URL")
        })
    })

    const comp = {...prof}
    delete comp.Pic
    useEffect(() => {
        if (!isEqual(profFormik.values, comp)) {
            setPChange(true)
        } else {
            setPChange(false)
        }
    }, [profFormik.values])

    const socFormik = useFormik({
        initialValues: {
            site: "",
            url: ""
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            site: Yup.string().required(),
            url: Yup.string().required().matches(URL, "Enter a valid URL")
        })
    })

    useEffect(() => {
        const window = document.querySelector(".socWindow") as HTMLDivElement
        const overlay = document.querySelector(".socOver") as HTMLDivElement
        if (socEdit[0] === true) {
            window?.classList.add("active")
            overlay?.classList.add("active")
        } else {
            window?.classList.remove("active")
            overlay?.classList.remove("active")
        }
    }, [socEdit])

    const openWindow = (plat: string, link: string) => {
        setSocOp(plat)
        socFormik.values.url = link
    }

    const editable = () => {
        const edt = document.getElementById("profEdit") as HTMLDivElement
        const plus = document.getElementById("addSoc") as HTMLDivElement
        edt?.classList.toggle("active")
        plus?.classList.toggle("active")
    }

    // Changing to socials
    const saveSM = (i: any) => {
        let symbol = socOp as IconName
        let entry = {
            icon: <FontAwesomeIcon icon={["fab", symbol]} />,
            plat: socOp,
            url: socFormik.values.url
        }

        if (i === socials.length - 1) {
            setSocials([...socials.slice(0, i), entry])
        } else {
            setSocials([...socials.slice(0, i), entry, ...socials.slice(3 - i)])
        }
        setSocEdit([false, 0])
    }

    const removeSM = (i: any) => {
        setSocials(socials.filter(entry => entry !== socials[i]))
        setSocEdit([false, 0])
    }

    return (
        <>
            <div>
                <img className="DP" src={prof.Pic} />
                <div id="changeDP" onClick={() => {}}>
                    <FontAwesomeIcon icon={faCamera} size="1x" id="camIcon" color="white"/>
                    <h4>Change Photo</h4>
                </div>
            </div>
            <div className="socWindow">
                <form id="addSM">
                    <div className="closeSearch" onClick={() => setSocEdit([false, 0])}>
                        <FontAwesomeIcon id="smX" icon={faX} size="1x"/>
                    </div>
                    <h2 id="socWinHead">Social Media Profile</h2>
                    <div id="logoDiv">
                        {socOp === "instagram" ?
                        <span className="socIcon2"><FontAwesomeIcon icon={faInstagram} /></span>
                        : socOp === "facebook" ?
                        <span className="socIcon2"><FontAwesomeIcon icon={faFacebook} /></span>
                        : socOp === "tiktok" ?
                        <span className="socIcon2"><FontAwesomeIcon icon={faTiktok} /></span>
                        : socOp === "twitter" ?
                        <span className="socIcon2"><FontAwesomeIcon icon={faTwitter} /></span>
                        : socOp === "linkedin" ?
                        <span className="socIcon2"><FontAwesomeIcon icon={faLinkedin} /></span>
                        : socOp === "pinterest" ?
                        <span className="socIcon2"><FontAwesomeIcon icon={faPinterest} /></span>
                        :
                        <span></span>
                        }
                    </div>
                    <FormControl>
                        <FormLabel htmlFor="site" className="profLabel2">Platform</FormLabel>
                        <select
                          id="site"
                          value={socOp}
                          onChange={(e) => setSocOp(e.target.value)}
                        >
                            <option value="select one">Select one</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="tiktok">TikTok</option>
                            <option value="twitter">Twitter</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="pinterest">Pinterest</option>
                        </select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="url" className="profLabel2">Profile URL</FormLabel>
                        <Input
                          id="url"
                          value={socFormik.values.url}
                          onChange={socFormik.handleChange}
                        />
                    </FormControl>
                </form>
                <div id="winButs">
                    <button className="Button medButton" onClick={() => saveSM(socEdit[1])}>
                        OK
                    </button>
                    <button className="Button trashButton" onClick={() => removeSM(socEdit[1])}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
            <div className="socOver" onClick={() => setSocEdit([false, 0])}></div>
            <form className="profDetails">
                <div id="names">
                    <FormControl>
                        <FormLabel htmlFor="FN" className="profLabel">First name</FormLabel>
                        <Input
                          id="FN"
                          value={profFormik.values.FN}
                          onChange={profFormik.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="LN" className="profLabel">Last name</FormLabel>
                        <Input
                          id="LN"
                          value={profFormik.values.LN}
                          onChange={profFormik.handleChange}
                        />
                    </FormControl>
                </div>
                <FormControl>
                    <FormLabel htmlFor="Bio" className="profLabel">About</FormLabel>
                    <Textarea
                        id="Bio"
                        resize="none"
                        maxLength={500}
                        value={profFormik.values.Bio}
                        onChange={profFormik.handleChange}
                    />
                    <p className="profChars">{500-profFormik.values.Bio.length} characters remaining</p>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="Web" className="profLabel">Website</FormLabel>
                    <Input
                        id="Web"
                        value={profFormik.values.Web}
                        onChange={profFormik.handleChange}
                    />
                </FormControl>
                <div id="profSocials">
                    <h3>Socials</h3>
                    <div id="socIcons">
                        {socials.map((item, i) => (
                            <div key={i} className="SmIcon" onClick={() => {setSocEdit([true, i])
                            openWindow(item.plat, item.url)}}>
                                <span className="socIcon">{item.icon}</span>
                            </div>
                        ))}
                        {socials.map((item, i) => (
                            <div key={i} className={`deleteSM delete${i}`} onClick={() => removeSM(i)}>
                                -
                            </div>
                        ))}
                        <div id="profEdit" onClick={() => {setEdits(!edits)
                        editable()}}>
                            {edits === false ?
                            <FontAwesomeIcon icon={faPen} size="1x" />
                            :
                            <FontAwesomeIcon icon={faX} size="1x" />
                            }
                        </div>
                        <div id="addSoc" onClick={editable}>
                            <FontAwesomeIcon icon={faCirclePlus} size="1x" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

const Security: FC = () => {
    return (
        <>

        </>
    )
}

const Settings: FC = () => {
    const [setSec, setSetSec] = useState("profile")
    const [pChange, setPChange] = useState(false)

    const acceptChange = (sec: string) => {
    }
    const cancelChange = (sec: string) => {
    }

    const acc = document.querySelector(".saveSet") as HTMLElement
    const rev = document.querySelector(".revertSet") as HTMLElement

    useEffect(() => {
        if (setSec === "profile") {
            if (pChange) {
                acc?.classList?.add("active")
                rev?.classList?.add("active")
            } else {
                acc?.classList?.remove("active")
                rev?.classList?.remove("active")
            }
        }
    })

    return (
        <article id="stngs">
            <ul id="settingsList">
                <li onClick={() => setSetSec("profile")}>Profile</li>
                <li onClick={() => setSetSec("account")}>Account</li>
                <li onClick={() => setSetSec("appearance")}>Appearance</li>
            </ul>
            <div className="accSet">
                {setSec === "profile" ?
                <Profile setPChange={setPChange} />
                :
                <div></div>}
            </div>
            <div id="setCon">
                <div className="canAccept" onClick={() => acceptChange(setSec)}>
                    <FontAwesomeIcon icon={faCircleCheck} size="3x" className="setConf saveSet" />
                </div>
                <div className="canAccept" onClick={() => cancelChange(setSec)}>
                    <FontAwesomeIcon icon={faCircleXmark} size="3x" className="setConf revertSet" />
                </div>
            </div>
        </article>
    )
}

export default Settings;