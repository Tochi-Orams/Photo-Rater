import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import exp from "constants";
import { keyboardKey } from "@testing-library/user-event";

const Search: FC = () => {
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState("")
    const [recency, setRecency] = useState("")

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: (values) => {
            console.log("")
        },
    })

    // const srch = document.getElementById("search") as HTMLInputElement
    const handleFocus = () => {
        const page = document.querySelectorAll(".pageContents")
        const blr = document.querySelector(".overlay") as HTMLElement
        const results = document.querySelector(".searchTxt") as HTMLElement
        if (page && blr && results) {
            page.forEach(elem => elem.classList.add("active"))
            blr.classList.add("active")
            results.classList.add("active")
        }
    }

    const exitSearch = () => {
        const page = document.querySelectorAll(".pageContents")
        const blr = document.querySelector(".overlay") as HTMLElement
        const results = document.querySelector(".searchTxt") as HTMLElement
        if (page && blr && results) {
            page.forEach(elem => elem.classList.remove("active"))
            blr.classList.remove("active")
            results.classList.remove("active")
        }
    }

    useEffect(() => {
        const handleEsc = (event: keyboardKey) => {
            if (event.key === "Escape") {
                exitSearch()
            }
        }

        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    })

    const cats = (idx: number) => {
        const catOps = [
            document.getElementById("hashtags"),
            document.getElementById("users"),
        ]
        if (catOps[idx]?.classList.contains("active")) {
            setCategory("")
        }
        if (idx === 0) {
            catOps[0]?.classList.toggle("active")
            catOps[1]?.classList.remove("active")
            setCategory("hashtags")
        } else if (idx === 1) {
            catOps[1]?.classList.toggle("active")
            catOps[0]?.classList.remove("active")
            setCategory("users")
        }
    }
    const rats = (idx: number) => {
        const ratOps = [
            document.getElementById("ratingUp"),
            document.getElementById("ratingDown"),
        ]
        if (ratOps[idx]?.classList.contains("active")) {
            setRating("")
        }
        if (idx === 0) {
            ratOps[0]?.classList.toggle("active")
            ratOps[1]?.classList.remove("active")
            setRating("high")
        } else if (idx === 1) {
            ratOps[1]?.classList.toggle("active")
            ratOps[0]?.classList.remove("active")
            setRating("low")
        }
    }

    const rec = (idx: number) => {
        const recOps = [
            document.getElementById("newest"),
            document.getElementById("oldest"),
        ]
        if (recOps[idx]?.classList.contains("active")) {
            setRecency("")
        }
        if (idx === 0) {
            recOps[0]?.classList.toggle("active")
            recOps[1]?.classList.remove("active")
            setRecency("new")
        } else if (idx === 1) {
            recOps[1]?.classList.toggle("active")
            recOps[0]?.classList.remove("active")
            setRecency("old")
        }
    }

    const clear = () => {
        setCategory("")
        setRating("")
        setRecency("")
        const frs = [
            document.getElementById("hashtags"),
            document.getElementById("users"),
            document.getElementById("ratingUp"),
            document.getElementById("ratingDown"),
            document.getElementById("newest"),
            document.getElementById("oldest"),
        ]
        for (let i=0; i<frs.length; i++) {
            if (frs[i]?.classList.contains("active")){
                frs[i]?.classList.remove("active")
            }
        }
    }

    return (
        <div>
            <div className="overlay" >
                <div className="closeSearch" onClick={exitSearch}>
                    <FontAwesomeIcon id="x" icon={faX} size="1x"/>
                </div>
                <section className="filterOptions">
                    <h2 id="filtHead">Search Filters</h2>
                    <div className="filterSection">
                        <h3>Search Type</h3>
                        <button className="filter" type="button" id="hashtags" onClick={() => cats(0)}>Hashtags</button>
                        <button className="filter rt" type="button" id="users" onClick={() => cats(1)}>Users</button>
                    </div>
                    <div className="filterSection">
                        <h3>Rating</h3>
                        <button className="filter" type="button" id="ratingUp" onClick={() => rats(0)}>Best</button>
                        <button className="filter rt" type="button" id="ratingDown" onClick={() => rats(1)}>Worst</button>
                    </div>
                    <div className="filterSection">
                        <h3>Posting Date</h3>
                        <button className="filter" type="button" id="newest" onClick={() => rec(0)}>Newest</button>
                        <button className="filter rt" type="button" id="oldest" onClick={() => rec(1)}>Oldest</button>
                    </div>
                    <button className="filter bt" type="button" onClick={clear}>Clear All</button>
                </section>
            </div>
            <form className="navForm">
                <div className="srchContainer">
                    <input
                        type="text"
                        id="search"
                        placeholder="Search"
                        value={formik.values.search}
                        onClick={() => handleFocus()}
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="search" className="srchLabel">
                        <FontAwesomeIcon id="mag" icon={faMagnifyingGlass} size="1x"/>
                    </label>
                </div>
            </form>
            <section className="searchTxt">
                <h2>Search Results</h2>
                <div id="term">
                    <h1>{formik.values.search}</h1>
                </div>
                <div>

                </div>
            </section>
        </div>
    )
}

export default Search;