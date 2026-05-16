import { motion } from "framer-motion"


const How_Works = () => {
    return (
        <div className="min-h-screen bg-white py-12 px-24">
            <motion.div className="text-center text-7xl text-black font-semibold" initial={{ y: 100, opacity: 0 }} transition={{ duration: 0.6 }} whileInView={{ y: 0, opacity: 1 }}>
                How DocuLEX Works
                <h1 className="text-3xl mt-4 text-center">A next-generation platform combining AI, Blockchain, ZK Proofs,<br/> and DAO governance to manage legal documents.</h1>
            </motion.div>
            <motion.div className="bg-[#F2F1F1] min-h-[19rem] w-full my-12 rounded-2xl py-4" initial={{ y: 100, opacity: 0 }} transition={{ duration: 0.6 }} whileInView={{ y: 0, opacity: 1 }}>
                <p className="text-black text-3xl font-semibold py-8 px-4">1. Upload & 2. AI Processing</p>
                <hr style={{ border: "1px solid white" }} />
                <p className="text-black text-xl px-4 py-4">Upload your legal or official documents. AI-powered extraction and validation ensures accuracy and extracts key data.</p>
            </motion.div>
            <motion.div className="bg-[#F2F1F1] min-h-[19rem] w-full my-12 rounded-2xl py-4" initial={{ y: 100, opacity: 0 }} transition={{ duration: 0.6 }} whileInView={{ y: 0, opacity: 1 }}>
                <p className="text-black text-3xl font-semibold py-8 px-4">3. ZK Verification & 4. Blockchain + DAO</p>
                <hr style={{ border: "1px solid white" }} />
                <p className="text-black text-xl px-4 py-4">Zero-Knowledge Proofs verify authenticity without exposing sensitive data. Immutable registration on blockchain with DAO governance.</p>
            </motion.div>
        </div>
    )
}

export default How_Works