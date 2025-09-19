import NavBar from "./components/navbar"
import Search from "./components/search"
import { useState } from "react";

function App() {
    const [search, setSearch] = useState("Bengaluru");

    return(
        <>
            <NavBar/>
            <Search setSearch={setSearch} search={search}/>
            
        </>
    )

}
export default App