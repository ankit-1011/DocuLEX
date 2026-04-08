

const Abstraction = () => {
    return (
        <div className="min-h-screen bg-black p-24">
            <h1 className="text-center text-gray-300 text-6xl font-semibold">Traditional Documents vs DocuLEX.
                From Friction to Flow.</h1>

            <div className="flex justify-between mt-32 ml-24 mr-24">
                <div className="gap-2 flex flex-col justify-center items-center ">
                    <h2 className="text-center text-gray-300 text-2xl font-normal">Traditional document management<br/> requires users to :</h2>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border bg-[#e5eaed] text-black px-16 py-3 rounded-lg text-3xl">Manual filing</button>
                        <i className="fa-solid fa-circle text-red-500 text-sm"></i>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 text-gray-300 px-4 py-3 rounded-lg text-3xl">Multiple verifications</button>
                        <i className="fa-solid fa-circle text-red-500 text-sm"></i>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 px-2 py-3 rounded-lg text-3xl">Paper trails & notaries</button>
                        <i className="fa-solid fa-circle text-white text-sm"></i>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 px-12 py-3 rounded-lg text-3xl">Long wait times</button>
                        <i className="fa-solid fa-circle text-white text-sm"></i>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 bg-[#3acd3acc] px-8 py-3 rounded-lg text-3xl">Registration done</button>
                        <i className="fa-solid fa-circle text-white text-sm"></i>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-center text-gray-300 text-2xl font-normal">With<br/> DocuLEX :</h2>
                    <div className="flex items-center gap-3 mt-4">
                        <i className="fa-solid fa-circle text-green-500 text-sm"></i>
                        <button className="border-2 border-gray-300 bg-[#e5eaed] text-black px-4 py-3 rounded-lg text-3xl">Upload document</button>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <i className="fa-solid fa-circle text-white text-sm"></i>
                        <button className="border-2 border-gray-300 bg-[#3acd3acc] text-white px-3 py-3 rounded-lg text-3xl">AI + ZK + Onchain</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Abstraction