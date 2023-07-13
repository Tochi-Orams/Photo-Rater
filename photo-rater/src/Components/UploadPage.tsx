import { FC, FormEvent, useState, useRef, RefObject } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faX } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { keyboardKey } from '@testing-library/user-event';

const UploadPage: FC = () => {
    const [foc, setFoc] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const [len, setLen] = useState(0)

    const [txt, setTxt] = useState<string>("")

    const HTRef = useRef() as RefObject<HTMLDivElement>
    const tagtext = document.querySelector(".HTInput") as HTMLElement

    const handleChange = (e: FormEvent) => {
        if (e.currentTarget.textContent) {
            setTxt(e.currentTarget.textContent)
        }
    }

    // Create a tag
    const createHT = () => {
        if(txt?.replace(/\s/g, "").length > 0 && HTRef.current){
            setTags([...tags, `#${txt}`])
            setTxt("")
            HTRef.current.textContent = ""
            setTimeout(() => {
                if (HTRef.current) {
                    HTRef.current.textContent = ""
                }
            }, 5);
        }
    }

    // confirm a tag by pressing 'enter' or 'space'
    const handleKey = (event: keyboardKey) => {
        if (event.code === "Space" || event.code === "Enter") {
            createHT()
        }
        if (event.code === "Backspace" && HTRef.current?.textContent === "") {
            removeTag(tags.length - 1)
        }
        console.log(txt)
    }

    // remove a tag
    const removeTag = (num: number) => {
        setTags(tags.filter((tag) => tags.indexOf(tag) !== num))
    }

    // Formik Initialization
    const formik = useFormik({
        initialValues: {
            title: "",
            hashtags: ""
        },
        onSubmit: (values) => {
            console.log(formik.values)
        },
        validationSchema: Yup.object({
            title: Yup.string().max(50).required(),
            hashtags: Yup.string()
        })
    })

    const browsePic = () => {

    }

    const uploadPic = (e: FormEvent) => {
        e.preventDefault()
        console.log(formik.values)
    }

    return (
        <article className="pageContents uploadBox">
            <section id="upWindow">
                <div id="dotBorder" onClick={browsePic}>
                    <FontAwesomeIcon id="upload" icon={faCircleArrowUp} size="5x" />
                    <h2>Drop File Here</h2>
                    <h3>- or -</h3>
                    <button className="logOut browse" onClick={browsePic}>Browse</button>
                </div>
            </section>
            <form className="uploadForm" onSubmit={uploadPic}>
                <FormControl>
                    <FormLabel htmlFor="title"><h2>Title</h2></FormLabel>
                    <Input
                      id="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="hashtags"><h2>Hashtags</h2></FormLabel>
                    <div id="hashtags">
                        <div id="tags" onClick={() => {tagtext.focus()
                        setFoc(true)}}>
                            {tags.map((data, i) => (
                                <div key={i} className="tagButton" contentEditable={false}>
                                    <p>{data}</p>
                                    <button className="deleteTag" onClick={() => removeTag(i)}>
                                        <FontAwesomeIcon icon={faX}/>
                                    </button>
                                </div>
                            ))}
                            <p
                              contentEditable={true}
                              className="HTInput"
                              ref={HTRef}
                              onInput={handleChange}
                              onBlur={() => setFoc(false)}
                              onKeyDown={handleKey}
                            />
                        </div>
                    </div>
                </FormControl>
                <button aria-label="Submit" type="submit" className="Button lgButton uButton">
                    Upload
                </button>
            </form>
        </article>
    )
}

export default UploadPage;