import { useState } from "react";
import css from "./popup.module.css";
import classnames from 'classnames'
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../../reducers/fileReducer";
import { createDir } from "../../../actions/file";

const Popup = () => {
    const [dirName, setDirName] = useState("");
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)

    const dispatch = useDispatch();

    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName))
        setDirName("")
    }

    return (
        <div className={classnames(css.popup, { [css.show]: popupDisplay})} onClick={()=>dispatch(setPopupDisplay(false))}>
            <div className={css.content} onClick={e=>e.stopPropagation()}>
                <div className={css.header}>
                    <div className={css.title}>Add new directory</div>
                    <div className={css.close} onClick={()=>dispatch(setPopupDisplay(false))}>X</div>
                </div>
                <input
                    className={css.input}
                    value={dirName}
                    onChange={(e) => setDirName(e.target.value)}
                    type="text"
                    placeholder="Enter name..."
                />
                <button className={css.create} onClick={()=>createDirHandler()}>Add</button>
            </div>
        </div>
    );
};

export default Popup;