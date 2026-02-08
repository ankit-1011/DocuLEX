import Logo from '../assets/Logo.png';
const Footer = () => {
  return (
    <div className='bg-[#1C1C1C] rounded-xl m-4 '>
           <div className="">
            <p className=" text-gray-300 text-2xl font-semibold py-8 px-4 text-center">© 2026 <img src={Logo} className="w-10 h-10 inline-block "/>DocuLEX. All rights reserved.</p>
           </div>
    </div>
  )
}

export default Footer