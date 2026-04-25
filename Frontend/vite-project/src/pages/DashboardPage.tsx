import { Download, LayoutGrid, Logs, MoonStar, ScanEye, Sun, User } from "lucide-react";
import Logo from "../assets/logo.png";
import UploadFile from "../components/UploadFile";
import Footer from "../components/Footer";
import SkipTemplate from "../components/SkipTemplate";
import { useState } from "react";

const DashboardPage = () => {

    const [Open,setOpen] = useState(false)
   

    return (
        <div className="bg-black min-h-screen text-white" >

            {/* Navbar */}
            <div className="flex justify-between items-center border-b border-white/15 h-14 px-8">
                <div className="flex items-center gap-2 font-semibold text-xl">
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                    <i>DocuLEX</i>
                </div>

                <div className="flex items-center gap-5">
                    <input
                        className="border border-white/30 border-dashed px-3 py-1 rounded-lg placeholder:text-sm placeholder:text-white/50 bg-transparent text-white focus:outline-none"
                        placeholder="Search..."/>
                    <Sun className="opacity-50 h-5 cursor-pointer" />
                    <MoonStar className="opacity-50 h-5 cursor-pointer" />

                    <span className="opacity-30">|</span>

                    <User className="opacity-50 h-5 cursor-pointer" />

                    <button className="border px-3 py-1 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">
                        Connect Wallet
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center mt-24 gap-4 text-center px-4" >
                <h3 className="text-3xl font-bold">
                    Secure Your Legal Documents with <i>DocuLEX</i>
                </h3>

                <p className="max-w-2xl font-light text-lg text-white/70">
                    Upload, verify, and manage your documents with cryptographic security
                    and AI-powered insights. Add your legal documents to generate a secure
                    digital fingerprint (hash), timestamp, and verification proof.
                </p>

                {/* Upload Button */}
                <button className=" text-amber-400  cursor-pointer" onClick={() => setOpen(true)}>
                    <span className="text-4xl">[</span> <span className="text-xl" >Upload Documents</span> <span className="text-4xl">]</span>
                </button>
            </div>

            {/* Documents Section */}
            <div className="mt-20 px-10">
                
                <h2 className="text-2xl font-semibold mb-6">Your Documents</h2>
                <h1 className="text-xl">Browse and search through your legal documents. Available in multiple languages with full text access.</h1>
                <div className="flex items-center gap-4 mb-6">
                    <input type="text" placeholder="Search by name of documents..." className="bg-transparent border border-white/30 placeholder:text-white/50 text-white focus:outline-none px-3 py-1 rounded-lg w-full" />
                    <div className="flex gap-2 border px-4 py-2 rounded-md cursor-pointer"><Logs className="" />List</div>
                    <div className="flex gap-2 border px-4 py-2 rounded-md cursor-pointer bg-white text-black"><LayoutGrid />Grid</div>
                </div>

                <div className="grid grid-cols-3 gap-6  ">

                    {/* Example Card */}
                    <div className="border border-white/20 p-6 h-46 rounded-lg  transition">
                        <h4 className="font-semibold mb-2">1981 Development Councils Elections</h4>
                        <p className="text-sm text-white/60">Date: 12 Feb 2026</p>

                        <div className="flex justify-between items-center mt-10">
                            <p className="text-sm text-green-400 mt-2">Secured</p>
                            <div className="flex gap-3">
                                <button className="flex gap-2 rounded-md p-1 border border-amber-400 text-amber-400 transition font-semibold tracking-wide mt-2 cursor-pointer">
                                    <ScanEye />Preview
                                </button>
                                <button className="flex gap-2 px-1 py-1 rounded-md border border-amber-400 text-amber-400   transition font-semibold tracking-wide mt-2 cursor-pointer">
                                    <Download />Download
                                </button>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="border border-white/20 p-6 h-46 rounded-lg  transition cursor-pointer">
                    <h4 className="font-semibold mb-2">1981 Development Councils Elections</h4>
                    <p className="text-sm text-white/60">Date: 12 Feb 2026</p>

                    <div className="flex justify-between items-center mt-10">
                        <p className="text-md text-green-400 mt-2">Secured</p>
                        <div className="flex gap-3">
                            <button className="flex gap-2 rounded-md p-2 border border-amber-400 text-amber-400 transition font-semibold tracking-wide mt-2 cursor-pointer">
                                <ScanEye />Preview
                            </button>
                            <button className="flex gap-2 p-2 rounded-md border border-amber-400 text-amber-400 transition font-semibold tracking-wide mt-2 cursor-pointer">
                                <Download />Download
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Upload Modal Component */}
           {Open && <UploadFile onClose={() => setOpen(false)} />}
            {/* <SkipTemplate/> */}
        </div>
    );
};

export default DashboardPage;