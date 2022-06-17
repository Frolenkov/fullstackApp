const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY";
const PUSH_TO_STACK = "PUSH_TO_STACK";
const POP_TO_STACK = "POP_TO_STACK";
const CHANGE_PROGRESS = "CHANGE_PROGRESS";
const DELETE_FILE = "DELETE_FILE";
const SET_VIEW = "SET_VIEW";


const defaultState = {
    files: [],
    currentDir: null,
    popupDisplay: false,
    dirStack: [],
    progress: 0,
    view: 'list'
};

const fileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_FILES: {
            return {
                ...state,
                files: action.payload,
            };
        }
        case SET_CURRENT_DIR: {
            return {
                ...state,
                currentDir: action.payload,
            };
        }
        case ADD_FILE: {
            return {
                ...state,
                files: [...state.files, action.payload],
                popupDisplay: false,
            };
        }
        case DELETE_FILE: {
            return {
                ...state,
                files: [...state.files.filter(file=> action.payload !== file._id)]
            }
        }
        case SET_POPUP_DISPLAY: {
            return {
                ...state,
                popupDisplay: action.payload,
            };
        }
        case PUSH_TO_STACK: {
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload],
            };
        }
        case POP_TO_STACK: {
            return {
                ...state,
                dirStack: action.payload,
            };
        }
        case CHANGE_PROGRESS: {
            return {
                ...state,
                progress: action.payload,
            };
        }

        case SET_VIEW: {
            return {
                ...state,
                view: action.payload
            }
        }

        default:
            return state;
    }
};

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const setPopupDisplay = (display) => ({
    type: SET_POPUP_DISPLAY,
    payload: display,
});
export const pushToStack = (dir) => ({ type: PUSH_TO_STACK, payload: dir });
export const popToStack = (dir) => ({ type: POP_TO_STACK, payload: dir });
export const uploadProgress = (progress) => ({
    type: CHANGE_PROGRESS,
    payload: progress,
});
export const deleteFileAction = (id) => ({
    type: DELETE_FILE,
    payload: id,
});
export const setView = (type) => ({
    type: SET_VIEW,
    payload: type,
});

export default fileReducer;
