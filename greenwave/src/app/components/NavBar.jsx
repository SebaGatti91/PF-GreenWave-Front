'use client'
import Link from "next/link";
import Button from "./Button";

const NavBar = () => {
    return (
        <div>
            <nav className="py-3 items-center text-white flex justify-between" style={{ backgroundColor: '#535E4A' }}>
                <div className="flex items-center">
                    <Link href='/'>
                        <img
                            className="ml-2" src="/images/Green-Wave.png" alt=""
                            style={{ width: '100px' }}
                        />
                    </Link>
                </div>

                <section className="flex gap-10 items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{ borderRadius: '1em 1em', width: '260px' }}
                        className="px-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-center"
                    />

                    <Link
                        className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
                        style={{ fontFamily: 'font-serif' }} href='/'>
                        Home
                    </Link>

                    <Link
                        className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
                        style={{ fontFamily: 'font-serif' }} href='/about'>
                        About
                    </Link>

                    <Link
                        className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
                        style={{ fontFamily: 'font-serif' }} href='/store'>
                        Store
                    </Link>

                    <Link
                        className="text-xl hover:bg-hover hover:rounded-lg hover:text-black px-2 hover:transform hover:scale-110 transition-transform duration-300"
                        style={{ fontFamily: 'font-serif' }} href='/tips'>
                        Tips
                    </Link>

                    <Button
                        className='py-1 px-10 mr-10 bg-hover hover:bg-boton'
                        style={{
                            fontFamily: 'font-serif',
                            borderRadius: '2em 2em',
                            boxShadow: '2px 3px black',
                        }}
                        link={'/login'}
                        text='Login'
                    />
                </section>
            </nav>
        </div>
    );
};

export default NavBar;