import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    console.log('profile',profile);
    setUser(profile.data);
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/users");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user,null,2)} </pre>
      <button onClick={() => getProfile()}>Profile</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Dashboard;
