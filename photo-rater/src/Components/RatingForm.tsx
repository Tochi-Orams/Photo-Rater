import { FC, FormEvent, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faChecked } from "@fortawesome/free-solid-svg-icons";
import { faStar as faUnchecked } from "@fortawesome/free-regular-svg-icons";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import OrderContext from '../Context/OrderContext';
import { useFormik } from "formik";
import * as Yup from "yup";

interface state {h: boolean, s: boolean}
interface data {stars: number, comment: string}
interface current {hov: number, slct: number}

const RatingForm: FC = (): JSX.Element => {
    const [s0, setS0] = useState<state>({h: false, s: false})
    const [s1, setS1] = useState<state>({h: false, s: false})
    const [s2, setS2] = useState<state>({h: false, s: false})
    const [s3, setS3] = useState<state>({h: false, s: false})
    const [s4, setS4] = useState<state>({h: false, s: false})

    const [currentRating, setCurrentRating] = useState<current>({hov: 0, slct: 0})
    const [ratingData, setRatingData] = useState<data>({stars: 0, comment: ""})

    const { order, setOrder} = useContext(OrderContext)

    const activates = [() => setS0({...s0, h: true}), () => setS1({...s1, h: true}), () => setS2({...s2, h: true}),
        () => setS3({...s3, h: true}), () => setS4({...s4, h: true})]

    const deactivates = [() => setS0({...s0, h: false}), () => setS1({...s1, h: false}), () => setS2({...s2, h: false}),
        () => setS3({...s3, h: false}), () => setS4({...s4, h: false})]

    const selects = [() => setS0({...s0, s: true}), () => setS1({...s1, s: true}), () => setS2({...s2, s: true}),
        () => setS3({...s3, s: true}), () => setS4({...s4, s: true})]

    const deselects = [() => setS0({...s0, s: false}), () => setS1({...s1, s: false}), () => setS2({...s2, s: false}),
        () => setS3({...s3, s: false}), () => setS4({...s4, s: false})]

    const hover = (i: number) => {
        for (let x: number = 0; x < 4 + 1; x++) {
            if (i >= x) {
                activates[x]()
            } else {
                deactivates[x]()
            }
        }
        setCurrentRating({...currentRating, hov: i + 1})
    }

    const unhover = () => {
        setS0({...s0, h: false})
        setS1({...s1, h: false})
        setS2({...s2, h: false})
        setS3({...s3, h: false})
        setS4({...s4, h: false})
        setCurrentRating({...currentRating, hov: 0})
    }

    const select = (i: number) => {
        for (let x: number = 0; x < 4 + 1; x++) {
            if (i >= x) {
                selects[x]()
            } else {
                deselects[x]()
            }
        }
        setCurrentRating({...currentRating, slct: i + 1})
    }

    const starInfo: any = [
        {   st: s0,
            func1: () => hover(0),
            func2: () => unhover(),
            func3: () => select(0)
        },
        {   st: s1,
            func1: () => hover(1),
            func2: () => unhover(),
            func3: () => select(1)
        },
        {   st: s2,
            func1: () => hover(2),
            func2: () => unhover(),
            func3: () => select(2)
        },
        {   st: s3,
            func1: () => hover(3),
            func2: () => unhover(),
            func3: () => select(3)
        },
        {   st: s4,
            func1: () => hover(4),
            func2: () => unhover(),
            func3: () => select(4)
        },
    ]

    // Formik Initialization
    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        onSubmit: (values) => {
        },
        validationSchema: Yup.object({
            comment: Yup.string().max(180)
        })
    })

    const submit = () => {
        if (currentRating.slct > 0) {
            setRatingData({...ratingData, stars: currentRating.slct, comment: formik.values.comment})
        }
    }

    const skip = () => {
        if (order === "newest") {
            // Skip
        } else {
            //  skip
        }
    }

    return (
        <section className="rating">
            <form className="rateForm" onSubmit={(e: FormEvent) => {e.preventDefault()
                submit()}}>
                <h2 id="rateHead">Rating</h2>
                <div className="score">
                    <div onMouseLeave={() => unhover()}>
                        {starInfo.map((item: any, index: number) => (
                            <span key={index} className="star" onMouseEnter={() => item.func1()} onClick={() => item.func3()}>
                                {item.st.h && item.st.s ?
                                <FontAwesomeIcon icon={faChecked} size="2x" color="orange"/>
                                : item.st.s ?
                                <FontAwesomeIcon icon={faChecked} size="2x" color="orange"/>
                                : item.st.h ?
                                <FontAwesomeIcon icon={faChecked} size="2x" color="gray"/>
                                :
                                <FontAwesomeIcon icon={faUnchecked} size="2x" color="gray"/>
                                }
                            </span>
                        ))}
                    </div>
                    <div className="scoreVis">
                        <div className="outOfFive">
                            {currentRating.slct === 0 ?
                            <h3 className="numScore">{"(" + currentRating.hov + "/5)"}</h3>
                            : currentRating.slct > 0 && currentRating.hov > 0 ?
                            <h3 className="numScore">{"(" + currentRating.hov + "/5)"}</h3>
                            :
                            <h3 className="numScore">{"(" + currentRating.slct + "/5)"}</h3>
                            }
                        </div>
                        <div>
                            <TransitionGroup>
                                {currentRating.slct === 1 ?
                                <CSSTransition
                                  classNames="emojiAnim"
                                  timeout={300}
                                >
                                    <p className="emoji">🤮</p>
                                </CSSTransition>
                                : currentRating.slct === 2 ?
                                <p className="emoji">👎</p>
                                : currentRating.slct === 3 ?
                                <p className="emoji">😐</p>
                                : currentRating.slct === 4 ?
                                <p className="emoji">👀</p>
                                : currentRating.slct === 5 ?
                                <p className="emoji">😍</p>
                                :
                                <p className="no-emoji"></p>
                                }
                            </TransitionGroup>
                        </div>
                    </div>

                </div>
                <FormControl>
                    <FormLabel htmlFor="comment" className="oneLine"><h2 id="noMargin">Comment</h2><p id="noMargin">{"(Optional)"}</p></FormLabel>
                    <Textarea
                      id="comment"
                      resize="none"
                      maxLength={180}
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    />
                    <p className="chars">{180-formik.values.comment.length} characters remaining</p>
                </FormControl>
                <div id="formButtons">
                    <button aria-label="Submit" type="submit" className="Button lgButton sButton">
                        Submit Rating
                    </button>
                    <button className="Button skip" onClick={skip}>
                        Skip
                    </button>
                </div>
            </form>
        </section>
    )
}

export default RatingForm;