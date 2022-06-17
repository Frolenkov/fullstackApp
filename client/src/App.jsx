import Navbar from "./components/navbar/Navbar";
import css from "./app.module.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import Disk from "./components/disk/Disk";
import Profile from "./components/profile/Profile";

const App = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    });
    return (
        <Router>
            <div className={css.app}>
                <Navbar isAuth={isAuth} />
                <div className={css.container}>
                {!isAuth ? (
                    <Routes>
                        <Route
                            path="/registration"
                            element={<Registration />}
                        />
                        <Route path="/login" element= {<Login />}/>
                        <Route path="*" element={<Navigate to ="/login" />}/>
                    </Routes>
                ) : (
                    <Routes>                      
                        <Route path="/" element={<Disk />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to ="/" />}/>
                    </Routes>
                )}
                </div>
            </div>
        </Router>
    );
};

export default App;
