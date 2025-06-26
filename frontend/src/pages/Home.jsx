import {useNavigate } from "react-router-dom";
import  Heading  from "../components/Heading";
import  SubHeading  from "../components/SubHeading";
import Button  from "../components/Button";

export default function Home  () {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 text-center">
        <Heading label="Welcome to Payments App" />
        <SubHeading label="Manage your payments securely and easily." />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button onClick={() => navigate("/signin")} label="Sign In" />
          <Button onClick={() => navigate("/signup")} label="Sign Up" />
        </div>
      </div>
    </div>
  );
}