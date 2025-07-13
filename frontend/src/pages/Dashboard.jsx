import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [balance, setBalance] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        // Fetch user data and balance
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch user profile
                const userResponse = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Fetch balance
                const balanceResponse = await axios.get("http://localhost:3000/api/v1/accounts/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setUser(userResponse.data);
                setBalance(balanceResponse.data.balance);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response && error.response.status === 403) {
                    // Token expired or invalid
                    localStorage.removeItem("token");
                    navigate("/signin");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center">
            <div className="text-2xl font-bold">Loading...</div>
        </div>;
    }

    return <div className="h-screen w-screen py-4 px-8">
        <Appbar user={user} />
        <Balance value={balance} />
        <Users />
    </div>
}