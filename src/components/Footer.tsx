import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const links = [
        "About",
        "Privacy Policy ",
        "Licensing",
        "Contact"
    ]
    return (
        <div className='footer'>
            <p>&copy; 2025 Omar El-nady . All Right Reserved</p>
            <div className="footer__links">
                {links.map((link, index) => (
                    <Link key={index} href={`/${link.toLowerCase().replace(" ", "-")} `}
                        className='footer__link' >
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Footer
