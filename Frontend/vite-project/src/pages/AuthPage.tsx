import { useState } from "react";
import Logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
const AuthPage = () => {

    const navigate = useNavigate();
    const [state, setState] = useState<"login" | "register">("login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));      
    };

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await fetch(state==="login"?"http://localhost:3000/api/auth/login":"http://localhost:3000/api/auth/signup",{
                method:'post',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(
                    state==="login"?{email:formData.email,password:formData.password}:formData
                )
            })

            const data = await res.json();
            console.log(data);
            console.log(res);
            if(!res.ok){
                throw new Error(res.statusText);
            }

            if(state==="login"){
                const token=  localStorage.setItem("token", data.token);
                console.log(token);
                navigate("/dashboard");
                alert("Login successful");
            }else{
               alert("Account created successfully");
               navigate("/dashboard");
            }
           
        }catch(error){
            console.error(error);
        }
    };


    return (
        <div className="min-h-screen bg-black flex justify-center items-center p-4">
            <div className="w-full max-w-[400px] overflow-hidden bg-white shadow-2xl flex flex-col">
                <div className="bg-black flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 flex items-center justify-center mt-2">
                            <img src={Logo} alt="Logo" className="w-10 h-10" />
                        </div>
                        <span className="text-white font-semibold text-lg">DocuLEX</span>
                    </div>
                    <button
                        type="button"
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>


                <div className="bg-amber-400 px-4 py-2 flex items-center border-b-4 justify-center gap-2">
                    <h2 className="text-gray-900 font-bold text-lg uppercase tracking-wide  border-gray-800">
                        {state === "login" ? "*Sign in*" : "* Create account *"}
                    </h2>
                </div>

         
                <div className="p-6 flex-1">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {state !== "login" && (
                            <div>
                                <label className="block text-gray-800 text-xs font-semibold uppercase tracking-wider mb-1.5">Name</label>
                                <div className="w-full bg-white border-[3px] border-gray-600 border-r-[6px] border-b-[6px] border-r-black border-b-black h-12 px-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="8" r="5" />
                                        <path d="M20 21a8 8 0 0 0-16 0" />
                                    </svg>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        className="flex-1 border-none outline-none text-gray-900 placeholder-gray-500 bg-transparent"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5">Email</label>
                            <div className="w-full bg-white border-[3px] border-gray-600 border-r-[6px] border-b-[6px] border-r-black border-b-black h-12 px-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="flex-1 border-none outline-none text-gray-900 placeholder-gray-500 bg-transparent"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5">Password</label>
                            <div className="w-full bg-white border-[3px] border-gray-600 border-r-[6px] border-b-[6px] border-r-black border-b-black h-12 px-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    className="flex-1 border-none outline-none text-gray-900 placeholder-gray-500 bg-transparent"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-12 bg-amber-400 text-gray-900 font-semibold hover:bg-amber-500 transition-colors flex items-center justify-center gap-2 mt-6 border-b-4 border-amber-600/50"
                        >
                            {state === "login" ? "Sign in" : "Sign up"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setState((prev) => (prev === "login" ? "register" : "login"))}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            {state === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
