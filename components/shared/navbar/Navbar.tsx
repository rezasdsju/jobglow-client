
import LightNavLogo from '@/app/assets/job_glow_light_mode_2.png'
import DarkNavLogo from '@/app/assets/job_glow_dark_mode_2.png'
import Image from 'next/image';

import { MobileDrawer } from './MobileDrawer';
import ThemeToggle from '../ThemeToggle';


const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
]
const Navbar = () => {
    return (
        <nav className='mx-2 sticky top-2  z-50 dark:bg-black'>
            <div className=' flex items-center justify-between rounded-2xl border border-border max-w-7xl mx-auto pr-2'>
                <div className='flex items-center justify-center '>
                    <div className=' rounded-2xl overflow-hidden'>
                        <Image src={LightNavLogo} alt='Logo' width={150} height={50} className='dark:hidden '></Image>
                        <Image src={DarkNavLogo} alt='Logo' height={50} width={150} className='hidden dark:block object-contain bg-black'></Image>
                    </div>
                </div>
                <div className=' hidden md:flex items-center justify-end gap-5'>
                    <ul className='flex items-center gap-5'>
                        {
                            navLinks.map((nav) => <li key={nav.href}>{nav.label}</li>)
                        }

                    </ul>
                    <div className='flex items-center justify-center'>
                        <span className='inline-block h-4 w-px bg-gray-200'></span>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                    <div className='flex items-center justify-center gap-5'>
                        <button className='cursor-pointer'>Sign In</button>
                        <button className="rounded-md px-4 py-2 text-white bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)] cursor-pointer">
                            Get Started
                        </button>
                    </div>




                </div>

                <div className='flex md:hidden'>
                    <div className='cursor-pointer'>
                        <ThemeToggle />
                    </div>
                    <MobileDrawer />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;