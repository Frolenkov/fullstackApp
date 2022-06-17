import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import css from "./disk.module.css";
import Popup from "./Popup/Popup";
import { setCurrentDir, setPopupDisplay, setView } from "../../reducers/fileReducer";
import ProgressBar from "./ProgressBar/ProgressBar";
import Loader from "./Loader/Loader";
import ListIcon from "./ListIcon";
import PlateIcon from "./PlateIcon";

const Disk = () => {
    const dispatch = useDispatch();
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState("type");

    const { currentDir, dirStack } = useSelector((state) => state.files);
    const loader = useSelector((state) => state.app.loader);

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    const showPopupHandler = () => dispatch(setPopupDisplay(true));

    const backClickHandler = () => {
        const backDir = dirStack.pop();
        dispatch(setCurrentDir(backDir));
    };

    const fileUploadHandler = (e) => {
        const files = [...e.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    };

    const dragEnterHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    };

    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = [...e.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
        console.log(files);
    };

    if (loader) {
        return <Loader />;
    }

    return !dragEnter ? (
        <div
            className={css.disk}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragEnterHandler(e)}
        >
            <div className={css.buttons}>
                <div className={css.rightSide}>
                    <button
                        className={css.back}
                        onClick={() => backClickHandler()}
                    >
                        Back
                    </button>
                    <button
                        className={css.create}
                        onClick={() => showPopupHandler()}
                    >
                        Create directory
                    </button>
                    <div className={css.upload}>
                        <label className={css.label}>
                            Upload file
                            <input
                                multiple={true}
                                onChange={(e) => fileUploadHandler(e)}
                                type="file"
                                className={css.input}
                            />
                        </label>
                    </div>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className={css.select}
                    >
                        <option value="name">By Name</option>
                        <option value="type">By type</option>
                        <option value="date">By date</option>
                    </select>
                </div>
                <div className={css.leftSide}>
                    <div className={css.plate} onClick={()=>dispatch(setView("palte"))}>
                        <PlateIcon />
                    </div>
                    <div className={css.list} onClick={()=>dispatch(setView("list"))}>
                        <ListIcon />
                    </div>
                </div>
            </div>
            <FileList />
            <Popup />
            <ProgressBar />
        </div>
    ) : (
        <div
            className={css.dragArea}
            onDrop={(e) => dropHandler(e)}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragEnterHandler(e)}
        >
            Drop files here
        </div>
    );
};

export default Disk;
