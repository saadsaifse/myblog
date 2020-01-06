import React from "react"
import { Link } from "gatsby"

const Navigation = props => {
  const [scrolled, setScrolled] = React.useState(false)

  const scrollCallback = React.useCallback(win => {
    if (win.scrollY > 20) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  React.useEffect(() => {
    window.addEventListener("scroll", scrollCallback)
    return () => window.removeEventListener("scroll", scrollCallback)
  })

  return (
    <nav className={scrolled ? "nav scroll" : "nav"}>
      <div className="nav-container">
        <div className="brand">
          <Link to="/">
            <span className="text">Saad Saif</span>
          </Link>
        </div>
        <div className="links">
          {props.menuLinks.map(link => (
            <Link key={link.name} to={link.link} activeClassName="active">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
