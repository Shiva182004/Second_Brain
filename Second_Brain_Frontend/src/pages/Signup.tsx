import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        await axios.post(`${BACKEND_URL}/signup`, {
            
                username,
                password
            
        })

        alert("You have signed up!");
        navigate("/signin");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center">
                <Button onClick={signup} loading={false} size="md" variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}