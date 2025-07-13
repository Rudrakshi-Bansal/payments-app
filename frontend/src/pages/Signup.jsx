

import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");


  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: userName,
        password,
        firstname: firstName,
        lastname: lastName
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/signin");
      }
    } catch(err) {
      if (err.response?.status === 411) {
        setError("Username already taken!");
      }
      else {
        setError("Something went wrong. Please try again!");
      }
    }
  }

  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 text-center">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox
          placeholder="First Name"
          label={"First Name"}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputBox
          placeholder="Last Name"
          label={"Last Name"}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <InputBox
          placeholder="email@gmail.com"
          label={"Email"}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <InputBox
          placeholder="**"
          label={"Password"}
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="pt-4">
          <Button
            label={"Sign up"}
            onClick={handleSignUp}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm pt-2">{error}</div>
        )}
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}