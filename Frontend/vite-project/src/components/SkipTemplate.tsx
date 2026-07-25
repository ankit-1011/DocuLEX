import { useState } from "react";
import {
    Download,
    Loader2,
    Maximize,
    Minus,
    Plus,
    Search,
    Square,
    X,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PINATA_GATEWAY = "https://maroon-official-carp-80.mypinata.cloud/ipfs";

type SkipTemplateProps = {
    onClose: () => void;
    cid: string;
    filename: string;
    filetype?: string;
};

const SkipTemplate = ({ onClose, cid, filename, filetype }: SkipTemplateProps) => {
    const [showSplitView, setShowSplitView] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1);

    const fileUrl = `${PINATA_GATEWAY}/${cid}`;
    const isPdf =
        filetype === "application/pdf" || filename.toLowerCase().endsWith(".pdf");

    const openInNewTab = async () => {
        const response = await fetch(fileUrl);
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
            window.URL.revokeObjectURL(url);
        }
    };

    const downloadFile = async () => {
        const response = await fetch(fileUrl);
        if (!response.ok) return;
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // small modal — Summarise ya Skip
    if (!showSplitView) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <button
                    type="button"
                    className="absolute right-4 top-4 text-white/70 hover:text-white"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="flex w-full max-w-3xl flex-col items-center rounded-md bg-black p-10 text-center">
                    <h1 className="text-2xl font-bold text-white">Skip the Long Read</h1>
                    <p className="mt-6 max-w-xl text-lg font-medium text-white/80">
                        Get a concise summary of your legal documents with our AI-powered
                        summarization feature. Save time and quickly understand the key points
                        of your agreements, contracts, and other legal files.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={() => setShowSplitView(true)}
                            className="flex cursor-pointer items-center gap-1 rounded-md bg-white p-2 px-3 font-medium text-black"
                        >
                            <Maximize className="h-4 w-4" />
                            Summarise
                        </button>
                        <button
                            type="button"
                            onClick={openInNewTab}
                            className="cursor-pointer rounded-md bg-white px-4 py-2 text-black"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: split view — left PDF, right AI panel (UI only)
    return (
        <div className="fixed inset-0 z-50 flex bg-[#111] p-3">
            {/* LEFT — PDF viewer */}
            <div className="flex w-1/2 flex-col overflow-hidden rounded-l-xl border border-white/10 bg-[#1a1a1a]">
                {/* PDF header toolbar */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{filename}</p>
                        {isPdf && numPages > 0 && (
                            <p className="text-xs text-white/45">
                                Page {pageNumber} of {numPages}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-white/60">
                        <button type="button" className="rounded p-1.5 hover:bg-white/10 hover:text-white">
                            <Search className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
                            className="rounded p-1.5 hover:bg-white/10 hover:text-white"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
                            className="rounded p-1.5 hover:bg-white/10 hover:text-white"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={downloadFile}
                            className="rounded p-1.5 hover:bg-white/10 hover:text-white"
                        >
                            <Download className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded p-1.5 hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* PDF content */}
                <div className="flex-1 overflow-auto bg-[#2a2a2a] p-4">
                    <div className="mx-auto w-fit">
                        {isPdf ? (
                            <Document
                                file={fileUrl}
                                onLoadSuccess={({ numPages: total }) => {
                                    setNumPages(total);
                                    setPageNumber(1);
                                }}
                                loading={
                                    <div className="flex h-64 items-center justify-center text-white/50">
                                        Loading PDF...
                                    </div>
                                }
                                error={
                                    <div className="flex h-64 flex-col items-center justify-center gap-3 text-white/50">
                                        <p>Could not load PDF.</p>
                                        <button
                                            type="button"
                                            onClick={openInNewTab}
                                            className="rounded bg-white/10 px-3 py-1 text-sm text-white"
                                        >
                                            Open in new tab
                                        </button>
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    className="shadow-lg"
                                />
                            </Document>
                        ) : (
                            <img
                                src={fileUrl}
                                alt={filename}
                                className="max-h-[70vh] max-w-full rounded shadow-lg"
                            />
                        )}
                    </div>
                </div>

                {/* PDF page navigation */}
                {isPdf && numPages > 1 && (
                    <div className="flex items-center justify-center gap-3 border-t border-white/10 py-2">
                        <button
                            type="button"
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber((p) => p - 1)}
                            className="rounded px-3 py-1 text-sm text-white/70 disabled:opacity-30"
                        >
                            Prev
                        </button>
                        <span className="text-sm text-white/50">
                            {pageNumber} / {numPages}
                        </span>
                        <button
                            type="button"
                            disabled={pageNumber >= numPages}
                            onClick={() => setPageNumber((p) => p + 1)}
                            className="rounded px-3 py-1 text-sm text-white/70 disabled:opacity-30"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* RIGHT — AI summarise panel */}
            <div className="flex w-1/2 flex-col rounded-r-xl border border-l-0 border-white/10 bg-[#141414]">
                <div className="flex justify-end border-b border-white/10 px-4 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Chat / summary area */}
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
                    {/* User message bubble */}
                    <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#2a2a2a] px-4 py-3 text-sm text-white/90">
                            summarise the content
                        </div>
                    </div>

                    {/* AI loading state — yahan baad mein real summary aayegi */}
                    <div className="flex items-center gap-3 text-white/50">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm">Analyzing your document...</span>
                    </div>
                </div>

                {/* Bottom input — UI only */}
                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1e1e1e] px-4 py-3">
                        <input
                            type="text"
                            placeholder="Ask AI about this document"
                            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                            readOnly
                        />
                        <button
                            type="button"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60"
                        >
                            <Square className="h-3.5 w-3.5 fill-current" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkipTemplate;
