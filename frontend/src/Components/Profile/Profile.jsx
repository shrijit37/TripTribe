import "./profile.css"
import { logout } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";
import {useNavigate } from "react-router-dom";
const Profile = () => {
    const dispatch = useDispatch();
    const edit = true;
    const navigate = useNavigate();
    const handleLogout = async()=>{
        dispatch(logout());
        navigate("/");
    }
    return (
        <div className="profile-page">
            <div>
                <form action="" className="profile-container">
            <h1 className="text">Profile.</h1>
                    <div className="separate">
                        <label htmlFor="" className="profile-label">Name: </label>
                        <input type="text" className="profile-input" defaultValue={"shrijit"}/>
                    </div>

                    <div className="separate">
                        <label htmlFor="" className="profile-label">Email: </label>
                        <input type="email"  className="profile-input" placeholder="E-mail"/>
                    </div>
                    <div className="separate">
                        <label htmlFor="" className="profile-label">Password: </label>
                        <input type="password"  className="profile-input"/>
                    </div>
                    <div className="separate">
                        <label htmlFor="" className="profile-label">Confirm Password: </label>
                        <input type="password"  className="profile-input"/>
                    </div>
                    <div className="separate">
                        <label htmlFor="" className="profile-label">Location</label>
                        <input type="search" name="" id=""  className="profile-input"/>
                    </div>
                    <div className="separate">
                        <label htmlFor="" className="profile-label">Preference(Space Separated)</label>
                        <input type="text" className="profile-input" />
                    </div>
                    <div className="separate">
                        <button className="profile-btn">
                            Save Changes
                        </button>
                       
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Profile