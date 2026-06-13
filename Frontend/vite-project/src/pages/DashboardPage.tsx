import {
    Check,
    Copy,
    Download,
    FileText,
    LayoutGrid,
    List,
    LogOut,
    Plus,
    ScanEye,
    Search,
    Shield,
    Upload,
    User,
    Wallet,
} from "lucide-react";
import Logo from "../assets/logo.png";
import UploadFile from "../components/UploadFile";
import Footer from "../components/Footer";
import SkipTemplate from "../components/SkipTemplate";
import { getDocs, docsDownload } from "../services/docs.service";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface DocsDataType {
    cid: string;
    filename: string;
    filetype: string;
    wallet_address: string;
    created_at: string | null;
}

function shortCid(cid: string) {
    if (cid.length <= 18) return cid;
    return `${cid.slice(0, 10)}…${cid.slice(-8)}`;
}

function shortAddress(addr: string) {
    if (!addr || addr.length < 12) return addr ?? "—";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const DashboardPage = () => {
    const [open, setOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [retrievedDocs, setRetrievedDocs] = useState<DocsDataType[]>([]);
    const [previewCid, setPreviewCid] = useState<string | null>(null);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copiedCid, setCopiedCid] = useState("");

    const { address, isConnected } = useAccount();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const docsRetrieval = useCallback(async () => {
        if (!address) {
            setRetrievedDocs([]);
            return;
        }
        setLoading(true);
        try {
            const data = await getDocs({ address });
            setRetrievedDocs(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    }, [address]);

    const downloadFile = async (cid: string, filename: string) => {
        await docsDownload(cid, filename);
    };

    useEffect(() => {
        if (address) docsRetrieval();
    }, [address, docsRetrieval]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");
    }, [navigate]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setLogoutOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        docsRetrieval();
    }, [])

    const logoutStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        toast.success("Logged out successfully!");
        navigate("/");
    };

    const copyText = async (cid: string) => {
        await navigator.clipboard.writeText(cid);
        setCopiedCid(cid);
        toast.success("CID copied");
        setTimeout(() => setCopiedCid(""), 2000);
    };

    const userEmail = localStorage.getItem("email");

    const stats = [
        { label: "Total documents", value: retrievedDocs.length, icon: FileText },
        { label: "On IPFS", value: retrievedDocs.length, icon: Shield },
        { label: "Wallet", value: isConnected ? shortAddress(address!) : "Not connected", icon: Wallet },
    ];

    const renderDocActions = (doc: DocsDataType, compact = false) => (
        <div className={`flex ${compact ? "gap-2" : "gap-2.5"} shrink-0`}>
            <button
                type="button"
                onClick={() => setPreviewCid(doc.cid)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/5 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:border-amber-400 hover:bg-amber-400/15 active:scale-95"
            >
                <ScanEye className="h-3.5 w-3.5" />
                Preview
            </button>
            <button
                type="button"
                onClick={() => downloadFile(doc.cid, doc.filename)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-amber-300 active:scale-95"
            >
                <Download className="h-3.5 w-3.5" />
                Download
            </button>
        </div>
    );

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
            {/* Ambient background */}
            <div
                className="pointer-events-none fixed inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="pointer-events-none fixed -left-32 top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
            <div className="pointer-events-none fixed -right-32 bottom-20 h-80 w-80 rounded-full bg-amber-600/8 blur-[100px]" />

            {/* Navbar */}
            <motion.header
                className="sticky top-0 z-40 border-b border-white/8 bg-black/60 backdrop-blur-xl"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2.5">
                        <img src={Logo} alt="DocuLEX" className="h-9 w-9" />
                        <span className="text-lg font-semibold tracking-tight">
                            Docu<span className="text-amber-400">LEX</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3" ref={dropdownRef}>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setLogoutOpen((v) => !v)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-amber-400/40 hover:bg-white/10 hover:text-white"
                                aria-label="Account menu"
                            >
                                <User className="h-4 w-4" />
                            </button>
                            <AnimatePresence>
                                {logoutOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-11 w-52 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-md"
                                    >
                                        {userEmail && (
                                            <div className="border-b border-white/8 px-4 py-3">
                                                <p className="text-[10px] uppercase tracking-wider text-white/40">Signed in as</p>
                                                <p className="mt-0.5 truncate text-sm text-white/90">{userEmail}</p>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={logoutStorage}
                                            className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Log out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <ConnectButton
                            showBalance={false}
                            chainStatus="icon"
                            accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
                        />
                    </div>
                </div>
            </motion.header>

            <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                {/* Hero */}
                <motion.section
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/8 px-4 py-1.5 text-xs font-medium text-amber-300">
                        <Shield className="h-3.5 w-3.5" />
                        Cryptographically secured vault
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Your legal documents,{" "}
                        <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                            on-chain & immutable
                        </span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-white/55 sm:text-lg">
                        Upload, verify, and manage documents with IPFS storage and blockchain proof.
                    </p>
                    <motion.button
                        type="button"
                        onClick={() => setOpen(true)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
                    >
                        <Upload className="h-4 w-4" />
                        Upload document
                    </motion.button>
                </motion.section>

                {/* Stats */}
                <motion.section
                    className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {stats.map(({ label, value, icon: Icon }) => (
                        <div
                            key={label}
                            className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-white/15 hover:bg-white/[0.05]"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-white/40">{label}</p>
                                    <p className="mt-2 text-2xl font-bold tabular-nums text-white">{value}</p>
                                </div>
                                <div className="rounded-xl bg-amber-400/10 p-2.5 text-amber-400">
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.section>

                {/* Documents */}
                <section>
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight">Your documents</h2>
                            <p className="mt-1 text-sm text-white/45">
                                {isConnected
                                    ? "Files linked to your connected wallet"
                                    : "Connect wallet to load your documents"}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center gap-2 self-start rounded-lg border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-amber-400/30 hover:text-amber-300 sm:self-auto"
                        >
                            <Plus className="h-4 w-4" />
                            New upload
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                            <input
                                type="text"
                                placeholder="Search by name, type, or CID…"
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/15 cursor-default"
                            />
                        </div>
                        <div className="flex rounded-xl border border-white/10 bg-white/[0.04] p-1">
                            <button
                                type="button"
                                onClick={() => setViewMode("grid")}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${viewMode === "grid"
                                    ? "bg-amber-400 text-black shadow-sm"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Grid
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("list")}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${viewMode === "list"
                                    ? "bg-amber-400 text-black shadow-sm"
                                    : "text-white/60 hover:text-white"
                                    }`}
                            >
                                <List className="h-4 w-4" />
                                List
                            </button>
                        </div>
                    </div>

                    {/* Content states */}
                    {!isConnected && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
                            <div className="mb-4 rounded-2xl bg-amber-400/10 p-4 text-amber-400">
                                <Wallet className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold">Connect your wallet</h3>
                            <p className="mt-2 max-w-sm text-sm text-white/45">
                                Link MetaMask or another wallet to view and manage your uploaded documents.
                            </p>
                        </div>
                    )}

                    {isConnected && loading && (
                        <div className={`grid gap-4 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="animate-pulse rounded-2xl border border-white/8 bg-white/[0.03] p-6"
                                >
                                    <div className="h-4 w-2/3 rounded bg-white/10" />
                                    <div className="mt-3 h-3 w-1/3 rounded bg-white/8" />
                                    <div className="mt-8 h-8 w-full rounded-lg bg-white/8" />
                                </div>
                            ))}
                        </div>
                    )}

                    {isConnected && !loading && retrievedDocs.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
                            <div className="mb-4 rounded-2xl bg-white/5 p-4 text-white/40">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold">No documents yet</h3>
                            <p className="mt-2 max-w-sm text-sm text-white/45">
                                Upload your first legal document to get a secure IPFS hash and timestamp.
                            </p>
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-300"
                            >
                                <Upload className="h-4 w-4" />
                                Upload now
                            </button>
                        </div>
                    )}

                    {/* Grid view */}
                    {isConnected && !loading && retrievedDocs.length > 0 && viewMode === "grid" && (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {retrievedDocs.map((doc) => (
                                <article
                                    key={doc.cid}
                                    className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm transition hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/5"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-xl bg-amber-400/10 p-2.5 text-amber-400">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="truncate font-semibold text-white" title={doc.filename}>
                                                {doc.filename}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-white/45">
                                                {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "—"}
                                            </p>
                                        </div>
                                        <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                                            Secured
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2">
                                        <code className="flex-1 truncate font-mono text-[11px] text-white/50">
                                            {shortCid(doc.cid)}
                                        </code>
                                        <button
                                            type="button"
                                            onClick={() => copyText(doc.cid)}
                                            className="shrink-0 text-white/40 transition hover:text-amber-400"
                                            aria-label="Copy CID"
                                        >
                                            {copiedCid === doc.cid ? (
                                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                                            ) : (
                                                <Copy className="h-3.5 w-3.5" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-5">
                                        <span className="truncate text-xs text-white/35">
                                            {doc.filetype || "Unknown type"}
                                        </span>
                                        {renderDocActions(doc, true)}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* List view */}
                    {isConnected && !loading && retrievedDocs.length > 0 && viewMode === "list" && (
                        <div className="space-y-3">
                            {retrievedDocs.map((doc) => (
                                <article
                                    key={doc.cid}
                                    className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-amber-400/25 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex min-w-0 flex-1 items-center gap-4">
                                        <div className="hidden rounded-xl bg-amber-400/10 p-3 text-amber-400 sm:block">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h4 className="truncate font-semibold">{doc.filename}</h4>
                                                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-400">
                                                    Secured
                                                </span>
                                            </div>
                                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
                                                <span>
                                                    {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "—"}
                                                </span>
                                                <span>{doc.filetype || "Unknown"}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => copyText(doc.cid)}
                                                    className="inline-flex items-center gap-1 font-mono text-white/50 transition hover:text-amber-400"
                                                >
                                                    CID: {shortCid(doc.cid)}
                                                    {copiedCid === doc.cid ? (
                                                        <Check className="h-3 w-3 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="h-3 w-3" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {renderDocActions(doc)}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <div className="mt-20">
                    <Footer />
                </div>
            </main>

            {open && (
                <UploadFile
                    onClose={() => setOpen(false)}
                    onUploaded={docsRetrieval}
                />
            )}

            {previewCid && (
                <SkipTemplate onClose={() => setPreviewCid(null)} cid={previewCid} />
            )}
        </div>
    );
};

export default DashboardPage;
