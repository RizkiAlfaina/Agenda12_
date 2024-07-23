import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Login() {
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    function handleClick() {
        window.location.replace("/control/dashboard");
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-green-100 p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-center mb-10 mt-2">
                    <img src="/login.jpg" alt="image" className="mx-auto w-35 h-35 object-contain mb-6" />
                    <h1 className="font-bold sm:text-xl md:text-xl lg:text-2xl mt-2">Terminal Agendas System</h1>
                </div>
                <div className="space-y-4">
                    <div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Username"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <Input
                            value={password}
                            id="password"
                            type={visible ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            required
                        />
                    </div>
                    <Button type="submit" onClick={handleClick} className="w-full bg-green-500 hover:bg-green-800 text-white py-2 rounded-lg">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}
