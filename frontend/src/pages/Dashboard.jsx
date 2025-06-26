import Appbar  from "../components/Appbar";
import  Balance  from "../components/Balance";
import  Users  from "../components/Users";

export default function Dashboard() {
    return <div className="h-screen w-screen py-4 px-8">
        <Appbar />
        <Balance value={"2000"} />
        <Users />
    </div>
}