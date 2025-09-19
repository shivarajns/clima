import NavBar from "./components/navbar"
import Search from "./components/search"
import { useState } from "react";
import CardDisplay from "./components/card";
function App() {
    const [search, setSearch] = useState("Bengaluru");

    return(
        <>
            <NavBar/>
            <Search setSearch={setSearch} search={search}/>
            <CardDisplay search={search} setSearch={setSearch}/>
        </>
    )

}
export default App