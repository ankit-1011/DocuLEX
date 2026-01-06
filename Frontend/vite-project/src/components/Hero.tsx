import '../index.css'

const Hero = () => {
    return (
        <div className="flex justify-center items-center flex-col gap-8 m-8">
            <div className="border bg-[#AC60C1] rounded-2xl  h-8 w-66 flex justify-center items-center">
                <p className=" font-medium p-2">✨ $7.5 million seed round raised</p>
            </div>
            <div className="text-6xl md:text-8xl font-base text-center leading-tight">
                Impactful design,<br /><span className="relative inline-block">
                    <span className="text-white">created effortlessly</span>

                    <span className="absolute inset-0 text-gray-400 overflow-hidden"
                        style={{ clipPath: 'inset(50% 0 0 0)' }}>
                        created effortlessly
                    </span>
                </span>

            </div>
            <div className="text-xl md:text-2xl text-gray-500 text-center max-w-3xl leading-relaxed">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum sequi vitae, vero eos odit ipsam ullam non delectus autem dicta!
            </div>

            <form className="flex h-12 w-full max-w-md items-center gap-2 overflow-hidden rounded-full border border-gray-500/30 bg-white">
                <input type="email" placeholder="Enter Your Wallet Address" className=" h-full bg-transparent w-full pl-6 text-sm placeholder-gray-500 text-black outline-none" required />
                <button type="submit" className="mr-1 h-10 w-56 rounded-full bg-[#A3E635] text-sm text-black transition active:scale-95">Join us</button>
            </form>

        </div>
    )
}

export default Hero