import { Download, LayoutGrid, Logs, MoonStar, ScanEye, Sun, User } from "lucide-react";
import Logo from "../assets/logo.png";
import UploadFile from "../components/UploadFile";
import Footer from "../components/Footer";
import SkipTemplate from "../components/SkipTemplate";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { toast } from "sonner";



interface docsDataType {
    cid: string,
    filename: string,
    filetype: string,
    wallet_address: string
    created_at: any
}

const MotionSun = motion(Sun);
const MotionMoon = motion(MoonStar);
const MotionUser = motion(User);

const DashboardPage = () => {


    const [Open, setOpen] = useState(false)
    const [gridOpen, setGrid] = useState("first")
    const [retrivedDocs, setRetrievedDocs] = useState<docsDataType[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);

    const account = useAccount()


    const docsRetrival = async () => {
        try {
            const retrivalData = await fetch(`http://localhost:3000/api/docs?wallet_address=${account.address}`, {
                method: 'GET', headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await retrivalData.json();
            if (retrivalData.ok) {
                setRetrievedDocs(data.documents);
                console.log("Retrival data:", data);
            } else {
                toast.error(data.message || "Failed to fetch documents");
            }

            console.log("Data Inside DB:", data);
        } catch (err) {
            toast.error("Error fetching documents");
            console.error("Error fetching documents:", err);
        }
    }

    useEffect(() => {
        if (account.address) {
            docsRetrival();
        }
    }, [account.address])

    return (
        <div className="bg-black min-h-screen text-white" >

            {/* Navbar */}
            <motion.div className="flex justify-between items-center border-b border-white/15 h-14 px-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <div className="flex items-center gap-2 font-semibold text-xl">
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                    <i>DocuLEX</i>
                </div>

                <div className="flex items-center gap-5">
                    <input
                        className="border border-white/30 border-dashed px-3 py-1 rounded-lg placeholder:text-sm placeholder:text-white/50 bg-transparent text-white focus:outline-none"
                        placeholder="Search..." />
                    <MotionSun
                        className="opacity-50 h-5 cursor-pointer"
                        whileTap={{ scale: 0.7 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                    />

                    <MotionMoon
                        className="opacity-50 h-5 cursor-pointer"
                        whileTap={{ scale: 0.7 }}
                        whileHover={{ rotate: -180 }}
                        transition={{ duration: 0.3 }}
                    />

                    <span className="opacity-30">|</span>

                    <MotionUser
                        className="opacity-50 h-5 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                    />

                    <ConnectButton showBalance={false} chainStatus="icon" accountStatus={{
                        smallScreen: 'avatar',
                        largeScreen: 'full',
                    }} />
                </div>
            </motion.div>

            {/* Hero Section */}
            <motion.div className="flex flex-col items-center mt-24 gap-4 text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <h3 className="text-3xl font-bold">
                    Secure Your Legal Documents with <i>DocuLEX</i>
                </h3>

                <p className="max-w-2xl font-light text-lg text-white/70">
                    Upload, verify, and manage your documents with cryptographic security
                    and AI-powered insights. Add your legal documents to generate a secure
                    digital fingerprint (hash), timestamp, and verification proof.
                </p>

                {/* Upload Button */}
                <button className=" text-amber-400  cursor-pointer hover:scale-110 transition-all ease-in" onClick={() => setOpen(true)}>
                    <span className="text-4xl">[</span> <span className="text-xl" >Upload Documents</span> <span className="text-4xl">]</span>
                </button>
            </motion.div>

            {/* Documents Section */}
            <div className="mt-20 px-10">

                <h2 className="text-2xl font-semibold mb-6">Your Documents</h2>
                <h1 className="text-xl">Browse and search through your legal documents. Available in multiple languages with full text access.</h1>
                <div className="flex items-center gap-4 mb-6">
                    <input type="text" placeholder="Search by name of documents..." className="bg-transparent border border-white/30 placeholder:text-white/50 text-white focus:outline-none px-3 py-1 rounded-lg w-full" />
                    <div className="flex gap-2 border px-4 py-2 rounded-md cursor-pointer active:scale-75 transition-all ease-in" onClick={() => setGrid("second")}><Logs />List</div>
                    <div className="flex gap-2 border px-4 py-2 rounded-md cursor-pointer bg-white text-black active:scale-75 transition-all ease-in" onClick={() => setGrid("first")}><LayoutGrid />Grid</div>
                </div>



                {/* Data Shown in Card Format */}
                {gridOpen === "first" ? (

                    <div className="grid grid-cols-3 gap-6 ">
                        {retrivedDocs.map((doc, index) => (
                            <div key={index} className="">
                                <div className="border border-white/20 p-6 h-46 rounded-lg transition  hover:border-amber-300 transation ease-in">

                                    <h4 className="font-semibold mb-2">
                                        {doc.filename}
                                    </h4>

                                    <div className="text-sm text-white/60">
                                        <h3>
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </h3>
                                    </div>

                                    <div className="flex justify-between items-center mt-10">

                                        <p className="text-sm text-green-400 mt-2">
                                            Secured
                                        </p>

                                        <div className="flex gap-3">

                                            <button className="flex gap-2 rounded-md p-1 border border-amber-400 text-amber-400 active:scale-80 transition cursor-pointer" onClick={() => setPreviewOpen(true)}>
                                                <ScanEye />
                                                Preview
                                            </button>

                                            {previewOpen && (
                                                <SkipTemplate onClose={() => setPreviewOpen(false)} />
                                            )}


                                            <button className="flex gap-2 px-1 py-1 rounded-md border border-amber-400 text-amber-400 active:scale-80 transition font-semibold tracking-wide cursor-pointer" >
                                                <Download />
                                                Download
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    retrivedDocs.map((doc, index) => (
                        <div key={index} className="border border-white/20 p-6 h-46 mb-6 rounded-lg  transition cursor-pointer hover:border-amber-300 transation ease-in">
                            <div className="flex justify-between gap-2">
                                <div className="flex flex-col">
                                    <h4 className="font-semibold mb-2">{doc.filename}</h4>
                                    <p className="text-sm text-white/60">
                                        {new Date(doc.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    CID : {doc.cid}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-10">
                                <p className="text-md text-green-400 mt-2">Secured</p>
                                <div className="flex gap-3">
                                    <button className="flex gap-2 rounded-md p-2 border border-amber-400 text-amber-400 transition font-semibold tracking-wide mt-2 cursor-pointer active:scale-80" onClick={() => setPreviewOpen(true)}>
                                        <ScanEye />Preview
                                    </button>
                                    {previewOpen && (
                                        <SkipTemplate onClose={() => setPreviewOpen(false)} />
                                    )}
                                    <button className="flex gap-2 p-2 rounded-md border border-amber-400 text-amber-400 transition font-semibold tracking-wide mt-2 cursor-pointer active:scale-80">
                                        <Download />Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}


                <Footer />
            </div>

            {/* Upload Modal Component */}
            {Open && <UploadFile onClose={() => setOpen(false)} />}
        </div>
    );
};

export default DashboardPage;