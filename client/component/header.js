import Link from "next/link"

export default ( { currentUser }) => {

    const Links = [
        !currentUser && { label : 'Sign Up' , href : "/auth/signup"},
        !currentUser && { label : 'Login' , href : "/auth/login"},
        currentUser && { label : 'Logout' , href : "/auth/logout"}
    ]
    .filter( link => link)
    .map( ({label, href}) => {
        return(
            <li key={href} className="nav-item"> 
                <Link className="nav-link" href={href}> {label} </Link> 
            </li>
        )
    })

    return(
        <nav className=" navbar navbar-light bg-light">
            <Link className="navbar-brand" href='/'>
                GetTix
            </Link>
            <div className="d-fex justify-content-end">
                <ul className="nav d-fex align-items-center">
                    {Links}
                </ul>

            </div>
        </nav>
    )

}