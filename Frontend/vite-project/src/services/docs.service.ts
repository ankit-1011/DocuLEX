import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

type GetDocsParams = {
    address: string;
    page?: number;
    limit?: number;
};

// API for fetching documents with pagination
export const getDocs = async ({ address, page = 1, limit = 6 }: GetDocsParams) => {
    try {
        const url = `${API_BASE_URL}/docs?wallet_address=${address}&page=${page}&limit=${limit}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            documents: data.documents || [],
            total: data.total || 0,
            page: data.page || 1,
            limit: data.limit || limit,
            totalPages: data.totalPages || 1,
        };
    } catch (err) {
        toast.error("Error fetching documents");
        console.error("Error fetching documents:", err);
        return {
            documents: [],
            total: 0,
            page: 1,
            limit,
            totalPages: 1,
        };
    }
};

export const docsDownload = async (cid: string, filename: string) => {
    try {
        const response = await fetch(
            `https://maroon-official-carp-80.mypinata.cloud/ipfs/${cid}`
        );

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
        toast.success("Document downloaded");
    } catch (error) {
        console.log(error);
        toast.error("Download failed");
    }
};
