import { useState } from "react"

function Search({setSearch}) {

    const [newSearch, setNewSearch] = useState("");

    const clickHandler = () => {
        if (newSearch.trim() !== "") {
            setSearch(newSearch);
            setNewSearch("");
        }

        else{
            alert("Search Something.")
        }
    }

    return (
        <>
            <div className="search-cnt">
                <input className="input" type="text" placeholder="Search here" value={newSearch} onChange={(e) => { setNewSearch(e.target.value) }} onKeyDown={(e) => { if (e.key === 'Enter') { clickHandler() } }} />
                <button className="search-btn" onClick={clickHandler}>Search</button>
            </div>
        </>
    )
}

export default Search