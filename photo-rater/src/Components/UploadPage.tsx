import { FC, FormEvent, useState, useEffect, useRef, RefObject } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { keyboardKey } from '@testing-library/user-event';

const UploadPage: FC = () => {
    const [foc, setFoc] = useState(false)
    const [space, setSpace] = useState(0)
    const [tags, setTags] = useState<any[]>([])
    const [len, setLen] = useState(0)

    const HTRef = useRef() as RefObject<HTMLDivElement>

    let txtContent: any
    const content = (e: FormEvent) => {
        return txtContent = e.currentTarget?.textContent
    }

    const createHT = () => {
        const tagDiv = document.getElementById("hashtags") as HTMLDivElement
        if(txtContent?.replace(/\s/g, '').length > 0){
            const upTag: any[] = [...tags, {tag: `#${txtContent}`, func: (e: FormEvent) => {e.preventDefault()
                removeTag(len)}}]
            setTags(upTag)
            setLen(len + 1)
        }
    }

    useEffect(() => {
        const handleSpace = (event: keyboardKey) => {
            if (event.code === "Space" || event.code === "Enter") {
                setSpace(space + 1)
                createHT()
            }
        }

        if (foc) {
            document.addEventListener("keydown", handleSpace)
            return () => document.removeEventListener("keydown", handleSpace)
        }
    }, [space, foc])


    useEffect(() => {
        console.log(tags, len)
        // const tagDiv = document.getElementById("hashtags") as HTMLDivElement
        // const clearField = () => {
        //     // tagDiv.innerText = ""
        // }
        // clearField()
    }, [tags])

    const removeTag = (num: number) => {
        console.log(num, 'tags')
        const temp: any[] = []
        for (let i=0; i<len; i++) {
            if (i !== num) {
                temp.push(tags[i])
                console.log(i)
            }
        }
        console.log(temp, 'temp')
        // setTags(temp)
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
                        <div id="tags">
                            {tags.map((data, i) => (
                                <div key={i} className="tagButton" contentEditable={false}>
                                    <p>{data.tag}</p>
                                    <button className="deleteTag" onClick={data.func}>x</button>
                                </div>
                            ))}
                        </div>
                        <p contentEditable={true}
                          ref={HTRef}
                          className="HTInput"
                          onInput={(e) => content(e)}
                          onClick={() => setFoc(true)}
                          onBlur={() => setFoc(false)}
                        />
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