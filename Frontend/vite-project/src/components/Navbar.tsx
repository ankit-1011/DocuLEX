import Logo from '../assets/Logo.png'

const Navbar = () => {
    return (
        <div className="w-[280] h-30 bg-black flex justify-center items-center ">
            <div className="flex items-center text-white font-semibold w-[69%] h-16 border border-gray-600 p-4 rounded-4xl gap-40">
                <div className="w-18  p-4 flex mr-8  items-center">
                    <img src={Logo} alt="logo" />
                    <h2 className='font-bold text-3xl italic'>DocuLEX</h2>
                </div>

                <div className="flex justify-center items-center h-10 gap-8 ml-auto ">
                    <a href="#" className="relative overflow-hidden h-6 group">
                        <span className="block group-hover:-translate-y-full transition-transform duration-300">Home</span>
                        <span
                            className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 hover:text-[#A3E635]">Home</span>
                    </a>
                    <a href="#" className="relative overflow-hidden h-6 group">
                        <span className="block group-hover:-translate-y-full transition-transform duration-300">Integrations</span>
                        <span
                            className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 hover:text-[#A3E635]">Integrations</span>
                    </a>
                    <a href="#" className="relative overflow-hidden h-6 group">
                        <span className="block group-hover:-translate-y-full transition-transform duration-300">About</span>
                        <span
                            className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 hover:text-[#A3E635]">About</span>
                    </a>
                    <a href="#" className="relative overflow-hidden h-6 group">
                        <span className="block group-hover:-translate-y-full transition-transform duration-300">FAQs</span>
                        <span
                            className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 hover:text-[#A3E635]">FAQs</span>
                    </a>
                </div>

                <div className="border-2 border-white  rounded-4xl h-10 bg-[#A3E635] cursor-pointer text-black flex justify-center items-center shadow-lg shadow-cyan-400/70">
                    <button className='cursor-pointer h-10 w-35 rounded-4xl hover:bg-violet-600 focus:outline-2 focus:outline-offset-2  active:bg-violet-900 hover:text-amber-50'>Connect Wallet</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar