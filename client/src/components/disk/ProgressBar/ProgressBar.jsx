import css from "./progressBar.module.css";
import { useSelector } from "react-redux";

const ProgressBar = () => {
    const progress = useSelector((state) => state.files.progress);
    return progress > 0 && progress < 100 ? (
        <div className={css.popup}>
            <div className={css.content}>
                <div
                    className={css.bar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    ) : null;
};

export default ProgressBar;
