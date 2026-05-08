

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
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 text-gray-300 px-4 py-3 rounded-lg text-3xl">Multiple verifications</button>
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 px-2 py-3 rounded-lg text-3xl">Paper trails & notaries</button>
                        <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 px-12 py-3 rounded-lg text-3xl">Long wait times</button>
                        <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="border-2 border-gray-300 bg-[#3acd3acc] px-8 py-3 rounded-lg text-3xl">Registration done</button>
                        <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-center text-gray-300 text-2xl font-normal">With<br/> DocuLEX :</h2>
                    <div className="flex items-center gap-3 mt-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        <button className="border-2 border-gray-300 bg-[#e5eaed] text-black px-4 py-3 rounded-lg text-3xl">Upload document</button>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                        <button className="border-2 border-gray-300 bg-[#3acd3acc] text-white px-3 py-3 rounded-lg text-3xl">AI + ZK + Onchain</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Abstraction