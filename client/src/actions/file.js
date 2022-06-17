import axios from "axios";
import { API_URL } from "../config";
import { hideLoader, showLoader } from "../reducers/appReducer";
import {
    addFile,
    setFiles,
    uploadProgress,
    deleteFileAction,
} from "../reducers/fileReducer";

export function getFiles(dirId, sort) {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            let url = `${API_URL}/api/files`;
            if (dirId) {
                url = `${API_URL}/api/files?parent=${dirId}`;
            }
            if (sort) {
                url = `${API_URL}/api/files?sort=${sort}`;
            }
            if (dirId && sort) {
                url = `${API_URL}/api/files?parent=${dirId}&sort=${sort}`;
            }
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(setFiles(response.data));
        } catch (e) {
            alert(e.response.data.message);
        } finally {
            dispatch(hideLoader());
        }
    };
}

export const createDir = (dirId, name) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/files/`,
                {
                    name,
                    parent: dirId,
                    type: "dir",
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            dispatch(addFile(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const uploadFile = (file, dirId) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            if (dirId) {
                formData.append("parent", dirId);
            }
            const response = await axios.post(
                `${API_URL}/api/files/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        const totalLength = progressEvent.lengthComputable
                            ? progressEvent.total
                            : progressEvent.target.getResponseHeader(
                                  "content-length"
                              ) ||
                              progressEvent.target.getResponseHeader(
                                  "x-decompressed-content-length"
                              );
                        console.log("total", totalLength);
                        if (totalLength) {
                            let progress = Math.round(
                                (progressEvent.loaded * 100) / totalLength
                            );
                            console.log(progress);
                            dispatch(uploadProgress(progress));
                        }
                    },
                }
            );
            dispatch(addFile(response.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export async function downloadFile(file) {
    const response = await fetch(
        `${API_URL}/api/files/download?id=${file._id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    console.log(file);
    return async (dispatch) => {
        try {
            const response = await axios.delete(
                `${API_URL}/api/files/delete?id=${file._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            dispatch(deleteFileAction(file._id));
            alert(response.data.message);
        } catch (e) {
            console.log(e);
        }
    };
}

export function searchFile(name) {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/files/search?search=${name}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            dispatch(setFiles(response.data));
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(hideLoader())
        }
    };
}
