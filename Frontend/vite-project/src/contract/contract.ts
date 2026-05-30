import { ethers } from "ethers"
import { abi } from "./DocumentStorage.json"

const contractAddress = "0xbf36bdFf8C0551DB02A32207E8c722ca72f3bD79"

export const uploadDocument = async (
    cid: string,
    filename: string
) => {

    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner()

    const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
    )

    const tx = await contract.uploadDocument(
        cid,
        filename
    )

    await tx.wait()

    return tx
}