import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./Dashboard.css";

function Dashboard() {
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    
    const fetchUserName = async() => {
        try {
            const q = query (collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name); 
        } catch (error) {
            console.error(error);
            //alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate ("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <div className = "dashboard">
            <div class="topnav">
			    <button className = "dashboard_btn">Home</button>
			    <button className = "dashboard_btn">Link2</button>
            	<button className = "dashboard_btn" onClick = {logout}>
                      		Logout
                </button>            	
		    </div>

            <div className = "dashboard_container">
                Logged in as
                  <div> {name} </div>
                  <div id= "loginemail"> {user?.email} </div>
             </div> 
             
        </div>
    );
}

export default Dashboard;