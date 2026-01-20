import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export function Signin() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    
    async function signin() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        await axios.post(`${BACKEND_URL}/signin`, {     
                username,
                password  
        },{
            withCredentials: true
        })

        alert("Signed in successfully");
        navigate("/dashboard");
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center">
                <Button onClick={signin} loading={false} size="md" variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
    </div>
}