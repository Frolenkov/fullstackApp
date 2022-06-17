import { NavLink } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import css from "./navbar.module.css";
import { logout } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getFiles, searchFile } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";

const Navbar = ({ isAuth, url }) => {
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(false);

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser);

    const searchChangeHandler = (e) => {
        setSearch(e.target.value);
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value !== '') {
        setSearchTimeout(setTimeout((value)=>{
            dispatch(searchFile(value));
        }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className={css.root}>
            <div className={css.container}>
            <NavLink to="home"><div className={css.logo}>Kaban in clouds</div></NavLink>
                {!isAuth ? (
                    <div className={css.buttons}>
                        <div className={css.login}>
                            <NavLink to="login">Enter</NavLink>
                        </div>
                        <div className={css.registration}>
                            <NavLink to="registration">Registration</NavLink>
                        </div>
                    </div>
                ) : (
                    <div className={css.buttons}>
                        <input
                            className={css.search}
                            value={search}
                            onChange={(e) => searchChangeHandler(e)}
                            placeholder="Search..."
                        />
                        <NavLink to="profile">
                        <Avatar user={currentUser} />
                        </NavLink>
                        <div
                            className={css.logout}
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
