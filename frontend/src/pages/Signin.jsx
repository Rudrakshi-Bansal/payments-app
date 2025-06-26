import { useState } from "react";
import  BottomWarning from "../components/BottomWarning";
import  Button from "../components/Button";
import  Heading from "../components/Heading";
import  InputBox from "../components/InputBox";
import  SubHeading  from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin ()  {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post(
            "http://localhost:3000/api/v1/user/signin",
            {
              username,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );

            
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                console.log(response.data);
                navigate("/dashboard?firstName="+response.data.firstName+"&userId="+response.data.userId);
            }
        } catch(err) {
            if (err.response?.status === 411) {
                setError("Wrong Usernam/Password!");
            }
            else {
                setError("Something went wrong. Please try again!");
            }
        }
    }

    return <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 text-center">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
            setUsername(e.target.value);
        }} placeholder="email@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
            setPassword(e.target.value);
        }} placeholder="******" label={"Password"} type={"password"} />
        <div className="pt-4">
          <Button onClick={handleSignIn} label={"Sign in"} />
        </div>
        {error && (
          <div className="text-red-500 text-sm pt-2">{error}</div>
        )}
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
    </div>
  </div>
};