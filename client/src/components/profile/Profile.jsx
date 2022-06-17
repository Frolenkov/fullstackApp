import css from "./profile.module.css";
import { useDispatch } from "react-redux";
import { uploadAvatar, deleteAvatar } from "../../actions/user";

const Profile = () => {

    const dispatch = useDispatch();
    const changeAvatarHandler = (e) => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file))
    }

    return (
        <div className={css.root}>
            <button className={css.remove} onClick={()=>dispatch(deleteAvatar())}>Remove avatar</button>
            <input accept="image/*" onChange={(e)=>changeAvatarHandler(e)} type="file" placeholder="Add avata" />
        </div>
    );
};

export default Profile;
