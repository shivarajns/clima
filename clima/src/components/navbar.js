import Logo from '../Assets/Videos/Logo.gif'
function NavBar() {

    return(
        <>
            <nav className="nav-cnt">
                <img src={Logo} alt='Clima'></img>
                <p>Clima</p>
            </nav>
        </>
    )

}

export default NavBar