type UploadFileProps = {
    onClose: () => void;
};

const UploadFile = ({ onClose }: UploadFileProps) => {
    return (
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
                <form className="space-y-5">
                    <div>
                        <label className="text-sm text-white">Name</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 rounded bg-zinc-800 text-white outline-none"
                            placeholder="Documents.pdf"
                            required
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="text-sm text-white">Upload File</label>
                        <input
                            type="file"
                            className="w-full mt-1 p-2 rounded bg-zinc-800/80 text-white outline-none cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-white file:text-black hover:file:bg-white/90"
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
    );
};

export default UploadFile;