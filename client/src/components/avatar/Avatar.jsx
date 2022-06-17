import AvatarIcon from "./AvatarIcon";
import css from "./avatar.module.css";
import { API_URL } from "../../config";

const Avatar = ({ user }) => (
    <div className={css.avatar}>
        {user.avatar ? <img src={`${API_URL}/${user.avatar}`} alt="avatar" /> : <AvatarIcon />}
    </div>
);

export default Avatar;
