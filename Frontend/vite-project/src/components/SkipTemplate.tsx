import { Cross, Maximize } from 'lucide-react'
import { Document, Page } from "react-pdf";


type SkipTemplateProps = {
    onClose: () => void;
    cid: string
};

const SkipTemplate = ({ onClose, cid }: SkipTemplateProps) => {

    const skip
        = async () => {
            const response = await fetch(
                `https://maroon-official-carp-80.mypinata.cloud/ipfs/${cid}`
            );
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
                window.URL.revokeObjectURL(url);
            }
        }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
            <Cross className='absolute top-4 right-4 cursor-pointer' onClick={onClose} />
            <div className='flex justify-center items-center flex-col bg-black  rounded-md p-10 w-full text-center'>
                <h1 className='text-2xl font-bold'>Skip the Long Read</h1>
                <p className='w-[700px] mt-6 font-medium text-xl'>Get a concise summary of your legal documents with our AI-powered summarization feature. Save time and quickly understand the key points of your agreements, contracts, and other legal files.</p>
                <div className='flex gap-4 mt-4'>
                    <button className='flex bg-white text-black p-1 rounded-md gap-1 cursor-pointer font-medium'><Maximize />Summarise</button>
                    <button className=' bg-white text-black px-4 py-1 rounded-md cursor-pointer' onClick={skip}>Skip</button>
                </div>
            </div>
        </div>

    )
}

export default SkipTemplate