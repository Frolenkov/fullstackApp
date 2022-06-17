import css from "./file.module.css";
import DirIcon from "./DirIcon";
import FileIcon from "./FileIcon";
import sizeFormatter from "../../../../utils/sizeFormatter"
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";

const File = ({ file }) => {
    const dispatch = useDispatch();
    const {currentDir, view} = useSelector((state) => state.files);

    const openDirHandler = () => {
        dispatch(pushToStack(currentDir));
        dispatch(setCurrentDir(file._id));
    };

    const downloadHandler = (e) => {
        e.stopPropagation();
        downloadFile(file);
    };

    const deleteHandler = (e) => {
        e.stopPropagation();
        dispatch(deleteFile(file));
    };

    return (
        view === 'list' ?
        
        <div
            className={css.file}
            onClick={file.type === "dir" ? () => openDirHandler() : null}
        >
            <div className={css.img}>
                {file.type === "dir" ? <DirIcon /> : <FileIcon />}
            </div>
            <div className={css.name}>{file.name}</div>
            <div className={css.date}>{file.date?.slice(0, 10)}</div>
            {file.type !== "dir" && (
                <>
                    <div className={css.size}>{sizeFormatter(file.size)}</div>
                    <button
                        className={css.download}
                        onClick={(e) => downloadHandler(e)}
                    >
                        Download
                    </button>
                </>
            )}
            <button className={css.delete} onClick={(e) => deleteHandler(e)}>
                Delete
            </button>
        </div>
        
        :
       
        <div
            className={css.filePlate}
            onClick={file.type === "dir" ? () => openDirHandler() : null}
        >
            <div className={css.img}>
                {file.type === "dir" ? <DirIcon /> : <FileIcon />}
            </div>
            <div className={css.name}>{file.name}</div>
          
            {file.type !== "dir" && (
                <>                    
                    <button
                        className={css.download}
                        onClick={(e) => downloadHandler(e)}
                    >
                        Download
                    </button>
                </>
            )}
            <button className={css.delete} onClick={(e) => deleteHandler(e)}>
                Delete
            </button>
        </div>
        
    );
};

export default File;
