import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { uploadDocument } from "../contract/contract";


type UploadFileProps = {
    onClose: () => void;
    onUploaded: () => void;
};


const UploadFile = ({ onClose, onUploaded }: UploadFileProps) => {


    const [file, setFile] = useState<File | null>(null);
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const [progressStep, setProgressStep] = useState<"idle" | "ipfs" | "saving" | "blockchain" | "complete">("idle");
    const account = useAccount()

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (!file) return;
        if (!email) {
            toast.error("Please log in again — session email is missing.");
            return;
        }
        formData.append('file', file);

        setProgressStep("ipfs");

        try {
            const res = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: formData,
            })

            const data = await res.json();
            console.log("Upload data:", data);
            setProgressStep("saving");

            if (!res.ok) {
                throw new Error(data?.error ?? data?.message ?? `Upload failed (${res.status})`);
            }

            // Backend wraps Pinata as { pinata: { data: { cid } } }; optional top-level `cid` from API.
            const cid =
                data.cid ??
                data.pinata?.data?.cid ??
                data.pinata?.cid ??
                data.data?.cid;

            if (!cid) {
                throw new Error("No CID in upload response (expected pinata.data.cid).");
            }

            setProgressStep("blockchain");

            const metaDB = await fetch('http://localhost:3000/api/docs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    cid,
                    filename: file.name,
                    filetype: file.type,
                    wallet_address: account.address ?? null,
                })
            });
            await uploadDocument(cid, file.name);
            const metaDBResponse = await metaDB.json();
            console.log("Metadata DB response:", metaDBResponse);

            setProgressStep("complete");

            toast.success("File uploaded successfully in MetaDB!");
            if (!metaDB.ok) {
                throw new Error(metaDBResponse?.message ?? metaDBResponse?.error ?? `Save metadata failed (${metaDB.status})`);
            }
            onUploaded();
            toast.success("File uploaded successfully!");
            onClose();
        }
        catch (err) {
            console.error('Error uploading file:', err);
            toast.error(err instanceof Error ? err.message : 'Error uploading file');
            setProgressStep("idle");
        }
    }

    return (
        <>
            {progressStep !== "idle" ? (
                <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center">
                    <div className="bg-zinc-900 border border-white/20 px-8 py-6 rounded-xl shadow-2xl">
                        <div className="flex items-center gap-4 text-3xl text-white">
                            <span
                                className={
                                    progressStep === "ipfs"
                                        ? "text-blue-400 animate-pulse"
                                        : progressStep === "saving" ||
                                            progressStep === "blockchain" ||
                                            progressStep === "complete"
                                            ? "text-green-400"
                                            : "text-gray-500"
                                }
                            >
                                Uploading to IPFS...
                            </span>

                            <span>→</span>

                            <span
                                className={
                                    progressStep === "saving"
                                        ? "text-blue-400 animate-pulse"
                                        : progressStep === "blockchain" ||
                                            progressStep === "complete"
                                            ? "text-green-400"
                                            : "text-gray-500"
                                }
                            >
                                Saving MetaData...
                            </span>

                            <span>→</span>

                            <span
                                className={
                                    progressStep === "blockchain"
                                        ? "text-blue-400 animate-pulse"
                                        : progressStep === "complete"
                                            ? "text-green-400"
                                            : "text-gray-500"
                                }
                            >
                                Document getting onChain...
                            </span>

                            {progressStep === "complete" && (
                                <span className="text-green-400">✓</span>
                            )}
                        </div>
                    </div>
                </div>
            ) :

                (
                   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-[440px] rounded-md border border-white/30 bg-black p-8 shadow-2xl">
                            <button
                                type="button"
                                className="absolute right-5 top-5 text-zinc-400 hover:text-white cursor-pointer"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <div className="mb-6">
                                <h1 className="text-2xl font-semibold text-white">
                                    Upload Document
                                </h1>
                                <p className="text-sm text-zinc-400 mt-2">
                                    Each upload generates a cryptographic hash and secure timestamp.
                                </p>
                            </div>

                            {/* Form */}
                            <form className="space-y-5" onSubmit={handleUpload} >
                                {/* <div>
                        <label className="text-sm text-white">Name</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 rounded bg-zinc-800 text-white outline-none"
                            placeholder="Documents.pdf"
                            required
                        />
                    </div> */}

                                {/* File Upload */}
                                <div>
                                    <label className="text-sm text-white">Upload File</label>
                                    <input
                                        type="file"
                                        className="w-full mt-1 p-2 rounded bg-zinc-800/80 text-white outline-none cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-white file:text-black hover:file:bg-white/90"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="bg-white text-black px-6 py-1 rounded font-medium cursor-pointer hover:bg-white/90 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

        </>
    );
};

export default UploadFile;