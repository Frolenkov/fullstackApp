import css from "./fileList.module.css";
import { useSelector } from "react-redux";
import File from "./file/File";

const FileList = () => {
    const { files,  view } = useSelector((state) => state.files);

    if (files.length === 0) {
        return <div>Files not found</div>;
    }

    return view === "list" ? (
        <div className={css.filelist}>
            <div className={css.header}>
                <div className={css.name}>Name</div>
                <div className={css.date}>Date</div>
                <div className={css.size}>Size</div>
            </div>
            {files.map((file) => (
                <File key={file._id} file={file} />
            ))}
        </div>
    ) : (
        <div className={css.filePlate}>
            {files.map((file) => (
                <File key={file._id} file={file} />
            ))}
        </div>
    );
};

export default FileList;
