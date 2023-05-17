import { FC, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCirclePlus, faX, faCircleCheck, faCircleXmark, faPen, faTrash, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faTiktok, faLinkedin, faTwitter, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { default as axios } from 'axios'
import LoginContext from "../Context/LoginContext";
import CreateAccountContext from "../Context/CreateAccountContext";

const defaultPic = "https://icons-for-free.com/iconfiles/png/512/person+user+icon-1320166085409390336.png"

interface soci {
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname?: string,
    bio?: string,
    website?: string,
    sm1?: object,
    sm2?: object,
    sm3?: object
}

const defaultSoc = [
    {
        icon: <FontAwesomeIcon icon={faCirclePlus} />,
        plat: "Select one",
        url: ""
    },
    {
        icon: <FontAwesomeIcon icon={faCirclePlus} />,
        plat: "Select one",
        url: ""
    },
    {
        icon: <FontAwesomeIcon icon={faCirclePlus} />,
        plat: "Select one",
        url: ""
    },
]

const CreateProfile: FC = () => {
    // eslint-disable-next-line
    const { status, setStatus } = useContext(LoginContext)
    // eslint-disable-next-line
    const { details, setDetails } = useContext(CreateAccountContext)

    const [socials, setSocials] = useState(defaultSoc)
    const [socEdit, setSocEdit] = useState([false, 0])
    const [socOp, setSocOp] = useState("select one")
    const [foc, setFoc] = useState(false)
    const [foc2, setFoc2] = useState(false)
    const [pos, setPos] = useState(0)

    const URL = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    const icns = [
        document.querySelector(".ico0") as HTMLElement,
        document.querySelector(".ico1") as HTMLElement,
        document.querySelector(".ico2") as HTMLElement,
    ]

    useEffect(() => {
        for (let i = 0; i < socials.length; i++) {
            if (socials[i].plat === "Select one") {
                setPos(i)
                icns[i]?.classList.remove("active")
                break
            } else {
                setPos(i)
                icns[i]?.classList.add("active")
            }
        }
    }, [socials])

    // Initializing the form for editing the profile
    const profFormik = useFormik({
        initialValues: {
            UserN: "",
            FN2: "",
            LN2: "",
            Bio2: "",
            Web2: ""
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            UserN: Yup.string(),
            FN2: Yup.string().required(),
            LN2: Yup.string(),
            Bio2: Yup.string().max(250),
            Web2: Yup.string().matches(URL, "Enter a valid URL")
        })
    })

    const PC = document.querySelector(".profChars") as HTMLElement
    useEffect(() => {
        if (foc) {
            PC?.classList.add("active")
        } else {
            PC?.classList.remove("active")
        }
    }, [foc])

    const user = document.getElementById("UserN") as HTMLInputElement
    useEffect(() => {
        if (user && foc2) {
            user.placeholder = ""
        } else if (user) {
            user.placeholder = "Username"
        }
    }, [foc2])

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
    const window = document.querySelector(".socWindow") as HTMLDivElement
    const overlay = document.querySelector(".socOver") as HTMLDivElement
    useEffect(() => {
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
        } else if (i === 0) {
            setSocials([...socials.slice(0, i), entry, ...socials.slice(1)])
        } else {
            setSocials([...socials.slice(0, i), entry, ...socials.slice(3 - i)])
        }

        setSocEdit([false, 0])
    }

    useEffect(() => {
        if (socOp === "Select one" || !URL.test(socFormik.values.url)) {
            ok?.classList.add("disabled")
        } else {
            ok?.classList.remove("disabled")
        }
    }, [socOp, socFormik.values.url])

    const removeSM = (i: any) => {
        setSocEdit([false, 0])
    }

    // Backend
    const createAccount = () => {
        setStatus(["in", profFormik.values.UserN])

        const submit: soci = {
            email: details.email,
            password: details.password,
            username: profFormik.values.UserN,
            firstname: profFormik.values.FN2,
        }

        // include optional values
        if (profFormik.values.LN2 !== "") {
            submit.lastname = profFormik.values.LN2
        } else {submit.lastname = ""}
        if (profFormik.values.Bio2 !== "") {
            submit.bio = profFormik.values.Bio2
        } else {submit.bio = ""}
        if (profFormik.values.Web2 !== "") {
            submit.website = profFormik.values.Web2
        } else {submit.website = ""}

        for (let i = 0; i < socials.length; i++) {
            if (socials[i].url !== "") {
                if (i === 0) {
                    submit.sm1 = socials[i]
                } else if (i === 1) {
                    submit.sm2 = socials[i]
                } else {
                    submit.sm3 = socials[i]
                }
            }
        }

        console.log(submit)

        axios.post('http://localhost:3001/create-user', submit).then(() => {
            console.log("success")
        })
    }

    return (
        <>
            <h1 id="CYP">Create Your Profile</h1>
            <article className="createBox">
                <div className="socWindow">
                    <form id="addSM">
                        <div onClick={() => setSocEdit([false, 0])}>
                            <FontAwesomeIcon id="smX" icon={faX} size="1x"/>
                        </div>
                        <h2 id="socWinHead">Social Media Profile</h2>
                        <div id="logoDiv">
                            {socOp === "instagram" ?
                            <span className="socIcon20"><FontAwesomeIcon icon={faInstagram} /></span>
                            : socOp === "facebook" ?
                            <span className="socIcon20"><FontAwesomeIcon icon={faFacebook} /></span>
                            : socOp === "tiktok" ?
                            <span className="socIcon20"><FontAwesomeIcon icon={faTiktok} /></span>
                            : socOp === "twitter" ?
                            <span className="socIcon20"><FontAwesomeIcon icon={faTwitter} /></span>
                            : socOp === "linkedin" ?
                            <span className="socIcon20"><FontAwesomeIcon icon={faLinkedin} /></span>
                            : socOp === "pinterest" ?
                            <span className="socIcon20"><FontAwesomeIcon icon={faPinterest} /></span>
                            :
                            <span className="socIcon20"><FontAwesomeIcon icon={faCircleQuestion} /></span>
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
                <form className="profDetails2">
                    <div id="picName">
                        <div>
                            <img className="DP2" src={defaultPic} alt="Profile Pic" />
                            <div id="changeDP2" onClick={() => {}}>
                                <FontAwesomeIcon icon={faCamera} size="1x" id="camIcon" color="white"/>
                                <h4>Change Photo</h4>
                            </div>
                        </div>
                        <FormControl>
                            <Input
                                id="UserN"
                                placeholder="Username"
                                value={profFormik.values.UserN}
                                onChange={profFormik.handleChange}
                                onFocus={() => setFoc2(true)}
                                onBlur={() => setFoc2(false)}
                            />
                        </FormControl>
                    </div>
                    <div id="names2">
                        <FormControl>
                            <FormLabel htmlFor="FN2" className="profLabel">First name</FormLabel>
                            <Input
                              id="FN2"
                              value={profFormik.values.FN2}
                              onChange={profFormik.handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="LN2" className="profLabel">Last name</FormLabel>
                            <Input
                              id="LN2"
                              value={profFormik.values.LN2}
                              onChange={profFormik.handleChange}
                            />
                        </FormControl>
                    </div>
                    <FormControl>
                        <FormLabel htmlFor="Bio2" className="profLabel2">About</FormLabel>
                        <Textarea
                            id="Bio2"
                            resize="none"
                            maxLength={250}
                            value={profFormik.values.Bio2}
                            onChange={profFormik.handleChange}
                            onFocus={() => setFoc(true)}
                            onBlur={() => setFoc(false)}
                        />
                        <p className="profChars">{250-profFormik.values.Bio2.length} characters remaining</p>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="Web2" className="profLabel2">Website</FormLabel>
                        <Input
                            id="Web2"
                            value={profFormik.values.Web2}
                            onChange={profFormik.handleChange}
                        />
                    </FormControl>
                    <div id="profSocials2">
                        <h3>Socials</h3>
                        <div id="socIcons2">
                            {socials.map((item, i) => (
                                <div key={i} onClick={() => openWindow(item.plat, item.url)}>
                                    <span className={`socIcon2 ico${i}`} onClick={()=> setSocEdit([true, pos])}>{item.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <Link to="/home" onClick={createAccount}> */}
                        <button className="Button lgButton pfB" onClick={(e) => {e.preventDefault() 
                            createAccount()}}>
                            Let's Go!
                        </button>
                    {/* </Link> */}
                </form>
            </article>
        </>
    )
}

export default CreateProfile;