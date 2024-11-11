import { useState } from "react"
import { navLinks } from "../constants"


const Header = () =>{
    const [active, setActive] = useState('')

    return(
        <nav className="bg-orange-600 w-full flex items-center px-6 py-0 fixed top-0 left-0">
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <img src={`/src/assets/logo2.jpg`} alt="logo" className='w-18 h-18 object-contain' />
                <ul className="flex-row list-none gap-10 flex">
                    {navLinks.map((link) => (
                    <li 
                        key={link.id} 
                        className={`text-white relative text-[15px] font-medium cursor-pointer`} 
                        onClick={() => setActive(link.title)}
                    >
                        <a href={`#${link.id}`}>{link.title}</a>
                        <span
                            className={`${
                            active === link.title ? "w-full" : "w-0"
                            } block h-[2px] bg-white absolute left-0 bottom-[-2px] transition-all duration-300 ease-in-out hover:w-full`}
                        ></span>
                    </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export { Header }