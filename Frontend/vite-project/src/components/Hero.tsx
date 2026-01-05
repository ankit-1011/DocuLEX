const Hero = () => {
    return (
        <div className="flex justify-center items-center flex-col gap-8 m-8">
            <div className="border  rounded-2xl px-6 py-3 bg-pink-500 h-8 w-66 flex justify-center items-center">
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

            <input
                className="w-96 rounded-3xl border-2 border-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300 h-14 "
                placeholder="Enter Your Wallet Address"
                type="text"
            />

        </div>
    )
}

export default Hero