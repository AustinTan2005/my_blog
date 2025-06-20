import React from "react";

interface NavLink {
    label: string;
    href: string;
}

interface NavBarProps {
    links: NavLink[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
    return (
        <nav
            id="navbar-example2"
            className="navbar fixed-top bg-body-secondary bg-opacity-75 px-3"
            style={{ backdropFilter: "blur(6px)" }}
        >
            <a className="navbar-brand" href="/">
                <img
                    src="/jake.svg"
                    alt="Logo"
                    width="50"
                    height="48"
                    className="d-inline-block align-content-center"
                />
            </a>
            <ul className="nav nav-pills ms-auto gap-3">
                {links.map((link, idx) => (
                    <li className="nav-item" key={idx}>
                        <a className="btn btn-outline-primary" href={link.href}>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
