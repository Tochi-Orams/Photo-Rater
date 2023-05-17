import { FC, useState, useEffect, useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormLabel, Input, FormErrorMessage, } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginContext from "../Context/LoginContext";
import CreateAccountContext from "../Context/CreateAccountContext";

const LoginPage: FC = () => {
    // eslint-disable-next-line
    const { status, setStatus } = useContext(LoginContext)
    // eslint-disable-next-line
    const { details, setDetails } = useContext(CreateAccountContext)

    const [page, setPage] = useState("login")
    const [match, setMatch] = useState(false)
    const [tch, setTch] = useState(false)

    const pwdRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const pwd2Ref = useRef() as React.MutableRefObject<HTMLInputElement>;

    const Formik = useFormik({
        initialValues: {
            USN: "",
            PWD: "",
            PWD2: ""
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            USN: Yup.string().email("Invalid email").required("Required"),
            PWD: Yup.string().required(),
            PWD2: Yup.string().required(),
        })
    })

    const elems = {
        WD: document.querySelector(".loginBox") as HTMLElement,
        LG: document.getElementById("LNG") as HTMLElement,
        CR: document.getElementById("Cr8") as HTMLElement,
        PW2: document.querySelector(".confPass") as HTMLElement,
        LI: document.querySelector(".logIn") as HTMLElement,
        SI: document.querySelector(".signUp") as HTMLElement,
        FP: document.getElementById("forgot") as HTMLElement,
        view1: document.getElementById("PWD") as HTMLInputElement,
        view2: document.getElementById("PWD2") as HTMLInputElement,
        show1: document.getElementById(".view") as HTMLElement,
        show2: document.getElementById(".view2") as HTMLElement,
        valid: document.getElementById("guides") as HTMLElement
    }

    const togglePage = () => {
        if (page === "login") {
            elems.WD?.classList.remove("active")
            elems.LG?.classList.add("active")
            elems.CR?.classList.remove("active")
            elems.PW2?.classList.remove("active")
            elems.LI?.classList.add("active")
            elems.SI?.classList.remove("active")
            elems.FP?.classList.add("active")
            elems.show1?.classList.remove("active")
            elems.show2?.classList.remove("active")
        } else if (page === "create") {
            elems.WD?.classList.add("active")
            elems.LG?.classList.remove("active")
            elems.CR?.classList.add("active")
            elems.PW2?.classList.add("active")
            elems.LI?.classList.remove("active")
            elems.SI?.classList.add("active")
            elems.FP?.classList.remove("active")
            elems.show1?.classList.add("active")
            elems.show2?.classList.add("active")
        }
    }

    useEffect(() => {
        togglePage()
        return () => {
            togglePage()
        }
    // eslint-disable-next-line
    }, [page])

    // Show password
    const [tog1, setTog1] = useState(false)
    const [tog2, setTog2] = useState(false)

    useEffect(() => {
        if (elems.view1) {
            tog1 ? elems.view1.type = "text"
            : elems.view1.type = "password"
        }
        // eslint-disable-next-line
    }, [tog1])
    useEffect(() => {
        if (elems.view2) {
        tog2 ? elems.view2.type = "text"
        : elems.view2.type = "password"
        }
        // eslint-disable-next-line
    }, [tog2])

    // Show password guidelines
    const lens = Formik.values.PWD.length > 0 || Formik.values.PWD2.length > 0
    const matches = !match && Formik.values.PWD.length > 0
    useEffect(() => {
        if (page === "create" && lens && matches) {
            elems.valid?.classList.add("active")
        } else {
            elems.valid?.classList.remove("active")
        }
    })

    const vlds = {
        len: pwdRef.current?.value.length > 5,
        num: /\d/.test(pwdRef.current?.value),
        cap: /[A-Z]/.test(pwdRef.current?.value),
        match: pwdRef.current?.value === pwd2Ref.current?.value,
    }
    useEffect(() => {
        if (vlds.len && vlds.num && vlds.cap && vlds.match) {
            setMatch(true)
        } else {
            setMatch(false)
        }
        // eslint-disable-next-line
    }, [Formik.values])

    // Button activation
    const crButton = document.querySelector(".signUp") as HTMLElement
    const lgButton = document.querySelector(".logIn") as HTMLElement
    useEffect(() => {
        if (page === "login") {
            if (!Formik.errors.USN && !Formik.errors.PWD && pwdRef.current.value) {
                lgButton?.classList.add("active2")
            } else {
                lgButton?.classList.remove("active2")
            }
        } else {
            if (match && !Formik.errors.USN) {
                crButton?.classList.add("active2")
            } else {
                crButton?.classList.remove("active2")
            }
        }
    })

    // Continue to Account Creation
    const proceed = () => {
        setStatus(["out", "username"])
        setDetails({email: Formik.values.USN, password: pwdRef.current.value})
    }

    return (
        <>
            <div id="logSec">
                <h2 id="LNG" className="active" onClick={() => setPage("login")}>Login</h2>
                <h2>|</h2>
                <h2 id="Cr8" onClick={() => setPage("create")}>Create an Account</h2>
            </div>
            <article className="loginBox">
                <img src={require("../assets/logo.png")} alt="Logo" />
                <h1>App Name</h1>
                <form id="LGF">
                    <FormControl>
                        {Formik.errors.USN && tch ?
                        <FormLabel htmlFor="USN" className="logLabel">Email:<span className="logErr">{Formik.errors.USN}</span></FormLabel>
                        : <FormLabel htmlFor="USN" className="logLabel">Email</FormLabel>}
                        <Input
                          id="USN"
                          type="email"
                          value={Formik.values.USN}
                          onChange={Formik.handleChange}
                          onBlur={() => setTch(true)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="PWD" className="logLabel">Password</FormLabel>
                        <Input
                          id="PWD"
                          ref={pwdRef}
                          type="password"
                          value={Formik.values.PWD}
                          onChange={Formik.handleChange}
                        />
                        <div id="view" className="eye" onClick={() => setTog1(!tog1)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                    </FormControl>
                    <FormControl className="confPass">
                        <FormLabel htmlFor="PWD2" className="logLabel">Confirm Password</FormLabel>
                        <Input
                          id="PWD2"
                          ref={pwd2Ref}
                          type="password"
                          value={Formik.values.PWD2}
                          onChange={Formik.handleChange}
                        />
                        <div id="view1" className="eye1" onClick={() => setTog2(!tog2)}>
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                    </FormControl>
                    <Link to="home" onClick={() => setStatus(["in", "username"])}>
                        <button className="Button logIn">
                            Sign In
                        </button>
                    </Link>
                    <Link to="create-profile" onClick={() => proceed()}>
                        <button className="Button signUp">
                            Continue
                        </button>
                    </Link>
                    <p id="forgot" onClick={() => {}}>Forgot Password?</p>
                </form>

                <div id="guides">
                    {pwdRef.current?.value.length > 5 ?
                    <span className="pValid pLen">
                        <FontAwesomeIcon icon={faCheck} color="green"/>
                        <p style={{color: "green"}}>6+ characters long</p>
                    </span>
                    :
                    <span className="pValid pLen">
                        <FontAwesomeIcon icon={faX} color="#850000"/>
                        <p style={{color: "#850000"}}>6+ characters long</p>
                    </span>}

                    {/\d/.test(pwdRef.current?.value) ?
                    <span className="pValid pNum">
                        <FontAwesomeIcon icon={faCheck} color="green"/>
                        <p style={{color: "green"}}>Contains a number</p>
                    </span>
                    :
                    <span className="pValid pNum">
                        <FontAwesomeIcon icon={faX} color="#850000"/>
                        <p style={{color: "#850000"}}>Contains a number</p>
                    </span>}

                    {/[A-Z]/.test(pwdRef.current?.value) ?
                    <span className="pValid pCap">
                        <FontAwesomeIcon icon={faCheck} color="green"/>
                        <p style={{color: "green"}}>Contains a capital letter</p>
                    </span>
                    :
                    <span className="pValid pCap">
                        <FontAwesomeIcon icon={faX} color="#850000"/>
                        <p style={{color: "#850000"}}>Contains a capital letter</p>
                    </span>}

                    {pwdRef.current?.value === pwd2Ref.current?.value && pwd2Ref.current?.value.length !== 0 ?
                    <span className="pValid pMatch">
                        <FontAwesomeIcon icon={faCheck} color="green"/>
                        <p style={{color: "green"}}>Passwords match</p>
                    </span>
                    :
                    <span className="pValid pMatch">
                        <FontAwesomeIcon icon={faX} color="#850000"/>
                        <p style={{color: "#850000"}}>Passwords match</p>
                    </span>}
                </div>
            </article>
        </>
    )
}

export default LoginPage;