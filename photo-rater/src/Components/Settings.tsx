import { FC, useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCirclePlus, faX, faCircleCheck, faCircleXmark, faPen, faTrash, faCircleQuestion, faEye, faCircleInfo, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTiktok, faLinkedin, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import ThemeContext from "../Context/ThemeContext";
import AccentContext from "../Context/AccentContext";
import LoginContext from "../Context/LoginContext";

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
    const [newie, setNewie] = useState(false)
    const [foc, setFoc] = useState(false)

    const URL = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

    // Initializing the form for editing the profile
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
            Bio: Yup.string().max(250),
            Web: Yup.string().matches(URL, "Enter a valid URL")
        })
    })

    // Checking if any changes have been made on the profile section
    const comp = {...prof}
    delete comp.Pic
    useEffect(() => {
        if (!isEqual(profFormik.values, comp) || !isEqual(socials, tempsoc)) {
            setPChange(true)
        } else {
            setPChange(false)
        }
        // eslint-disable-next-line
    }, [profFormik.values, socials])

    // Initializing the form for editing socials
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

    // opening the social media page editing window
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

    // Editing socials
    const ok = document.querySelector(".okay") as HTMLElement
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
        setNewie(false)
    }

    useEffect(() => {
        if (socOp === "Select one" || !URL.test(socFormik.values.url)) {
            ok?.classList.add("disabled")
        } else {
            ok?.classList.remove("disabled")
        }
        // eslint-disable-next-line
    }, [socOp, socFormik.values.url])

    const removeSM = (i: any) => {
        setSocials(socials.filter(entry => entry !== socials[i]))
        setSocEdit([false, 0])
        setNewie(false)
    }

    const edEl = {
        icos: document.querySelectorAll(".socIcon") as NodeList,
        dsm: document.querySelectorAll(".deleteSM") as NodeList,
        edt: document.getElementById("profEdit") as HTMLDivElement,
        plus: document.getElementById("addSoc") as HTMLDivElement,
        cont: document.getElementById("editContainer") as HTMLElement
    }
    useEffect(() => {
        if (edits) {
            edEl.icos?.forEach(node => {(node as HTMLElement).classList.add("active")})
            edEl.dsm?.forEach(node => {(node as HTMLElement).classList.add("active")})
            edEl.edt?.classList.add("active")
            edEl.plus?.classList.add("active")
            edEl.cont?.classList.add("active")
        } else {
            edEl.icos?.forEach(node => {(node as HTMLElement).classList.remove("active")})
            edEl.dsm?.forEach(node => {(node as HTMLElement).classList.remove("active")})
            edEl.edt?.classList.remove("active")
            edEl.plus?.classList.remove("active")
            edEl.cont?.classList.remove("active")
        }
        // eslint-disable-next-line
    }, [edits])

    useEffect(() => {
        if (socials.length === 0) {
            edEl.plus?.classList.add("active")
            edEl.cont?.classList.remove("active")
        } else {
            edEl.plus?.classList.remove("active")
            setEdits(false)
        }
        // eslint-disable-next-line
    }, [socials])

    const exitWindow = () => {
        if (newie) {
            removeSM(socials.length - 1)
            setNewie(false)
        } else {
            setSocEdit([false, 0])
        }
    }

    // Adding Socials
    const notice = document.getElementById("SMAlert") as HTMLElement
    const newSM = () => {
        if (socials.length < 3) {
            setNewie(true)
            openWindow("Select one", "")
            setSocials([...socials, {
                icon: <FontAwesomeIcon icon={faCircleQuestion} />,
                plat: "Select one",
                url: "",
            }])
            setSocEdit([true, socials.length])
        } else {
            notice?.classList.add("active")
            setTimeout(() => {
                notice?.classList.remove("active")
            }, 5000);
        }
    }

    const PC = document.querySelector(".profChars") as HTMLElement
    useEffect(() => {
        if (foc) {
            PC?.classList.add("active")
        } else {
            PC?.classList.remove("active")
        }
    }, [foc])

    return (
        <>
            <div>
                <img className="DP" src={prof.Pic} alt="Profile Pic" />
                <div id="changeDP" onClick={() => {}}>
                    <FontAwesomeIcon icon={faCamera} size="1x" id="camIcon" color="white"/>
                    <h4>Change Photo</h4>
                </div>
            </div>

            <div className="socWindow">
                <form id="addSM">
                    <div onClick={() => exitWindow()}>
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
                        <FormLabel htmlFor="site" className="profLabel3">Platform</FormLabel>
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
                        <FormLabel htmlFor="url" className="profLabel3">Profile URL</FormLabel>
                        <Input
                          id="url"
                          value={socFormik.values.url}
                          onChange={socFormik.handleChange}
                        />
                    </FormControl>
                </form>
                <div id="winButs">
                    <button className="Button medButton okay" onClick={() => saveSM(socEdit[1])}>
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
                        maxLength={250}
                        value={profFormik.values.Bio}
                        onChange={profFormik.handleChange}
                        onFocus={() => setFoc(true)}
                        onBlur={() => setFoc(false)}
                    />
                    <p className="profChars">{250-profFormik.values.Bio.length} characters remaining</p>
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
                            <div key={i} className="SmIcon" onClick={() => openWindow(item.plat, item.url)}>
                                <span className="socIcon" onClick={()=> setSocEdit([true, i])}>{item.icon}</span>
                                <div className="deleteSM" onClick={() => removeSM(i)}>
                                    <h3>-</h3>
                                </div>
                            </div>
                        ))}
                        <div id="editContainer">
                            {socials.length > 0 ?
                            <>
                                <div id="addSoc" onClick={() => newSM()}>
                                    <FontAwesomeIcon icon={faCirclePlus} size="1x" />
                                </div>
                                <div id="profEdit" onClick={() => setEdits(!edits)}>
                                    {!edits ?
                                    <FontAwesomeIcon icon={faPen} size="1x" />
                                    :
                                    <FontAwesomeIcon icon={faX} size="1x" />
                                    }
                                </div>
                            </>
                            :
                            <div id="addSoc" onClick={() => newSM()}>
                                <FontAwesomeIcon icon={faCirclePlus} size="1x" />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </form>
            <div id="SMAlert">
                <p>You can only have 3 social media profiles linked to your profile</p>
            </div>
        </>
    )
}

interface AccountProps {
    inf: boolean
    setInf(value: boolean): void
}

const Account: FC<AccountProps> = ({inf, setInf}) => {
    const { status, setStatus } = useContext(LoginContext)

    const [cPwd, setCPwd] = useState(false)
    const [tog1, setTog1] = useState(false)
    const [tog2, setTog2] = useState(false)
    const [tch, setTch] = useState({
        usn: false,
        pwd: false,
        pwd2: false
    })
    const [focii, setfocii] = useState({
        usn: false,
        pwd: false,
        pwd2: false
    })
    const [valids, setValids] = useState({
        usn: false,
        pwd: false,
        pwd2: false
    })

    const pwdRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const pwd2Ref = useRef() as React.MutableRefObject<HTMLInputElement>;

    const pwdFormik = useFormik({
        initialValues: {
            USN: status[1],
            OGP: "",
            NP: "",
            CNP: "",
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            OGP: Yup.string().required("Required"),
            NP: Yup.string().required("Required"),
            CNP: Yup.string().required("Required"),
        })
    })

    const cpForm = document.getElementById("cPwd") as HTMLElement
    useEffect(() => {
        if (cPwd) {
            cpForm?.classList.add("active")
        } else {
            cpForm?.classList.remove("active")
        }
    }, [cPwd])

    const pop = document.getElementById("pwdPop") as HTMLElement
    useEffect(() => {
        if (inf) {
            pop?.classList.add("active")
        } else {
            pop?.classList.remove("active")
        }
    })

    // field validity
    const names = ["username", "karl", "test"] // update with backend (holds existing usernames)

    // const usV = document.getElementById("usV") as HTMLElement
    // const pwV = document.getElementById("pwV") as HTMLElement
    // const pw2V = document.getElementById("pw2V") as HTMLElement
    useEffect(() => {
        if (pwdFormik.values.USN === status[1]) {
            setValids({...valids, usn: true})
        } else if (pwdFormik.values.USN.length > 3 && !names.includes(pwdFormik.values.USN)) {
            setValids({...valids, usn: true})
        } else {
            setValids({...valids, usn: false})
        }
    }, [pwdFormik.values.USN])

    useEffect(() => {
        if (pwdFormik.values.NP.length > 5) {
            setValids({...valids, pwd: true})
        }
    }, [pwdFormik.values.NP])

    return (
        <>
            <div id="cUSN">
                <h2>Username</h2>
                <form id="cUsn">
                    <FormControl>
                        {pwdFormik.errors.USN && tch.usn ?
                        <FormLabel htmlFor="USN" className="profLabel">New Username:<span className="logErr">{pwdFormik.errors.OGP}</span></FormLabel>
                        : <FormLabel htmlFor="USN" className="profLabel">New Username</FormLabel>}
                        <Input
                          id="USN"
                          type="email"
                          value={pwdFormik.values.USN}
                          onChange={pwdFormik.handleChange}
                          onFocus={() => setfocii({...focii, usn: true})}
                          onBlur={() => {setTch({...tch, usn: true})
                            setfocii({...focii, usn: false})}}
                        />
                        {(focii.usn || tch.usn) && valids.usn ? <FontAwesomeIcon className="acV" icon={faCheck} color="green"/>
                        : focii.usn ? <FontAwesomeIcon className="acV" icon={faX} color="#850000"/>
                        : <span></span>}
                    </FormControl>
                </form>
            </div>
            <div id="CPWD">
                <h2>Password</h2>
                <form id="cPwd">
                    <FormControl>
                        {pwdFormik.errors.OGP && tch.pwd ?
                        <FormLabel htmlFor="PWD" className="profLabel">Current Password:<span className="logErr">{pwdFormik.errors.OGP}</span></FormLabel>
                        : <FormLabel htmlFor="PWD" className="profLabel">Current Password</FormLabel>}
                        <Input
                          id="PWD"
                          type="email"
                          value={pwdFormik.values.OGP}
                          onChange={pwdFormik.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="PWD2" className="profLabel">New Password</FormLabel>
                        <Input
                          id="PWD2"
                          ref={pwdRef}
                          type="password"
                          value={pwdFormik.values.NP}
                          onChange={pwdFormik.handleChange}
                          onFocus={() => setfocii({...focii, pwd: true})}
                          onBlur={() => {setTch({...tch, pwd: true})
                            setfocii({...focii, pwd: false})}}
                        />
                        {(focii.pwd || tch.pwd) && valids.pwd ? <FontAwesomeIcon className="acV" icon={faCheck} color="green"/>
                        : focii.pwd && pwdRef.current.value.length < 1 ? <FontAwesomeIcon className="acV" icon={faX} color="#850000"/>
                        : <span></span>}
                        <div id="view" className="eye2" onClick={() => setTog1(!tog1)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="PWD3" className="profLabel">Confirm New Password</FormLabel>
                        <Input
                          id="PWD3"
                          ref={pwd2Ref}
                          type="password"
                          value={pwdFormik.values.CNP}
                          onChange={pwdFormik.handleChange}
                          onFocus={() => setfocii({...focii, pwd2: true})}
                          onBlur={() => {setTch({...tch, pwd2: true})
                            setfocii({...focii, pwd2: false})}}
                        />
                        {(focii.pwd2 || tch.pwd) && valids.pwd2 ? <FontAwesomeIcon className="acV" icon={faCheck} color="green"/>
                        : focii.pwd2 && pwd2Ref.current.value.length < 1 ? <FontAwesomeIcon className="acV" icon={faX} color="#850000"/>
                        : <span></span>}
                        <div id="view1" className="eye3" onClick={() => setTog2(!tog2)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                    </FormControl>
                    <FontAwesomeIcon id="pwdInfo" icon={faCircleInfo} onClick={() => setInf(true)}/>
                    <div id="pwdPop">
                        <h3>Password Requirements</h3>
                        <ul>
                            <li>At least 6 characters long</li>
                            <li>Contains at least one number</li>
                            <li>Contains at least one capital letter</li>
                        </ul>
                    </div>
                </form>
                <button className="Button pwdButton" onClick={() => setCPwd(!cPwd)}>
                    {!cPwd ? <span>Change Password</span> : <span>Cancel</span>}
                </button>
            </div>
        </>
    )
}

const Appearance: FC = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const { accent, setAccent } = useContext(AccentContext)

    const lgt = document.getElementById("ltTheme") as HTMLInputElement
    const dkt = document.getElementById("dkTheme") as HTMLInputElement
    useEffect(() => {
        if (lgt && dkt) {
            if (theme === "light") {
                lgt.checked = true
                dkt.checked = false
            } else {
                lgt.checked = false
                dkt.checked = true
            }
        }
    }, [theme])

    return (
        <>
            <h2>Theme</h2>
            <form id="themeForm">
                <div id="themeOps">
                    <div id="TH1">
                        <label htmlFor="ltTheme">
                            <div className="tBox tBox1">
                                <div className="theBox theBox1">
                                    <h3>Text</h3>
                                    <p>Faint Text</p>
                                    <div className="Button tButt">
                                        Button
                                    </div>
                                </div>
                            </div>
                        </label>
                        {theme === "light" ? <input type="radio" checked id="ltTheme" value="light" onClick={(e) => setTheme("light")}/>
                        : <input type="radio" id="ltTheme" value="light" onClick={(e) => setTheme("light")}/>}
                    </div>
                    <div id="TH2">
                        <label htmlFor="dkTheme">
                            <div className="tBox tBox2">
                                <div className="theBox theBox2">
                                    <h3>Text</h3>
                                    <p>Faint Text</p>
                                    <div className="Button tButt">
                                        Button
                                    </div>
                                </div>
                            </div>
                        </label>
                        {theme === "dark" ? <input type="radio" checked id="dkTheme" value="dark" onClick={(e) => setTheme("dark")}/>
                        : <input type="radio" id="dkTheme" value="dark" onClick={(e) => setTheme("dark")}/>}
                    </div>
                </div>
            </form>
            <div>
                <h2>Accent</h2>
                <div className="accSwitches">
                    <div className="currentTC">
                        <div className="currentTxt"></div>
                    </div>
                    <div id="acCirs">
                        <button type="button" className="gry accSwitch" onClick={() => setAccent("gry")}/>
                        <button type="button" className="rd accSwitch" onClick={() => setAccent("rd")}/>
                        <button type="button" className="mngo accSwitch" onClick={() => setAccent("mngo")}/>
                        <button type="button" className="ylo accSwitch" onClick={() => setAccent("ylo")}/>
                        <button type="button" className="grn accSwitch" onClick={() => setAccent("grn")}/>
                        <button type="button" className="tl accSwitch" onClick={() => setAccent("tl")}/>
                        <button type="button" className="blu accSwitch" onClick={() => setAccent("blu")}/>
                        <button type="button" className="indgo accSwitch" onClick={() => setAccent("indgo")}/>
                        <button type="button" className="pnk accSwitch" onClick={() => setAccent("pnk")}/>
                        <button type="button" className="rsb accSwitch" onClick={() => setAccent("rsb")}/>
                        <button type="button" className="blk accSwitch" onClick={() => setAccent("blk")}/>
                    </div>
                </div>
            </div>
        </>
    )
}

interface SettingsProps {
    inf: boolean
    setInf(value: boolean): void
}

const Settings: FC<SettingsProps> = ({inf, setInf}) => {
    const [setSec, setSetSec] = useState("profile")
    const [pChange, setPChange] = useState(false)

    // Accept / cancel buttons
    const acceptChange = (sec: string) => {
    }
    const cancelChange = (sec: string) => {
    }

    const acc = document.querySelector(".saveSet") as HTMLElement
    const rev = document.querySelector(".revertSet") as HTMLElement
    useEffect(() => {
        acc?.classList.remove("hidden")
        rev?.classList.remove("hidden")
        if (setSec === "profile") {
            if (pChange) {
                acc?.classList?.add("active")
                rev?.classList?.add("active")
            } else {
                acc?.classList?.remove("active")
                rev?.classList?.remove("active")
            }
        } else if (setSec === "appearance") {
            acc?.classList.add("hidden")
            rev?.classList.add("hidden")
        }
    })

    // settings section
    const sctns = {
        pFl: document.getElementById("pFl") as HTMLElement,
        aCnt: document.getElementById("aCnt") as HTMLElement,
        aPrnc: document.getElementById("aPrnc") as HTMLElement,
    }
    const activeSec = () => {
        sctns.pFl?.classList.remove("active")
        sctns.aCnt?.classList.remove("active")
        sctns.aPrnc?.classList.remove("active")
        if (setSec === "profile") {
            sctns.pFl?.classList.add("active")
        } else if (setSec === "account") {
            sctns.aCnt?.classList.add("active")
        } else {
            sctns.aPrnc?.classList.add("active")
        }
    }
    useEffect(() => {
        activeSec()
    }, [setSec])

    return (
        <article id="stngs">
            <ul id="settingsList">
                <li id="pFl" onClick={() => setSetSec("profile")}>Profile</li>
                <li id="aCnt" onClick={() => setSetSec("account")}>Account</li>
                <li id="aPrnc" onClick={() => setSetSec("appearance")}>Appearance</li>
            </ul>
            <div className="accSet">
                {setSec === "profile" ?
                <Profile setPChange={setPChange} />
                : setSec === "account" ?
                <Account inf={inf} setInf={setInf}/>
                :
                <Appearance />}
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