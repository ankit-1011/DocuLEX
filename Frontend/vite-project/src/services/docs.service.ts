import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

//API for fetching documents of a user based on their wallet address
export const getDocs = async (account: { address: any }) => {
    try {
        const retrivalData = await fetch(`${API_BASE_URL}/docs?wallet_address=${account.address}`, {
            method: 'GET', headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (!retrivalData.ok) {
            throw new Error(`HTTP error! status: ${retrivalData.status}`);
        }
        const data = await retrivalData.json();
        console.log("Data received from API:", data);
        if (Array.isArray(data)) {
            return data;
        } else if (Array.isArray(data.documents)) {
            return data.documents;
        } else {
            return [];
        }

    } catch (err) {
        toast.error("Error fetching documents");
        console.error("Error fetching documents:", err);
        return [];
    }
}

//API for downloading a document using its CID and filename
export const docsDownload = async (cid: string, filename: string) => {
    try {
        const response = await fetch(
            `https://maroon-official-carp-80.mypinata.cloud/ipfs/${cid}`
        );

        // binary data ko blob mai convert
        const blob = await response.blob();

        // temporary url create
        const url = window.URL.createObjectURL(blob);

        // anchor create
        const a = document.createElement("a");

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // memory cleanup
        window.URL.revokeObjectURL(url);
        toast.success("Document downloaded");
    } catch (error) {
        console.log(error);
        toast.error("Download failed");
    }
}