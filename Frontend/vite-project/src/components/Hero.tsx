import '../index.css'

const Hero = () => {
    return (
        <div className="flex justify-center items-center flex-col gap-8 m-8 ">
          
            <div className="text-8xl font-[550] text-center ">
                Embed the<br /><span className="relative inline-block">
                    <span className="text-white">Blockchain, Anywhere</span>
                    <span className="absolute inset-0 text-gray-400 overflow-hidden"
                        style={{ clipPath: 'inset(50% 0 0 0)' }}>
                        Blockchain, Anywhere
                    </span>
                </span>
            </div>
            <div className="text-3xl text-gray-300  text-center max-w-3xl">
            Transparent disputes, immutable records, and trustless enforcement — bringing justice onchain.
            </div>
              
              <div className="flex gap-3 mt-4 marquee">
                <button className=" text-[#35e64d] border border-green-500 text-3xl p-2 rounded-xl">Success<i className="text-medium ">✓</i></button>
                <button className="border border-white text-white  text-3xl rounded-xl p-2">Onchain</button>
                 <button className=" border border-white text-white  text-3xl rounded-xl p-2">ZK Proof</button>
                <button className="border border-white text-white    text-3xl rounded-xl p-2">DAOs</button>
                 <button className=" text-[#35e64d] border border-green-500 text-3xl rounded-xl p-2">Success<i className="text-medium p-1">✓</i></button>
                <button className="border border-white text-white    text-3xl rounded-xl p-2">Onchain</button>
                 <button className=" border border-white text-white    text-3xl rounded-xl p-2">NFTs</button>
                <button className="border border-white text-white    text-3xl rounded-xl p-2">Temper Proofs</button>
              </div>

        </div>
    )
}

export default Hero