import css from "./loader.module.css";

const Loader = () => (
    <div className={css.container}>
    <div className={css.loader}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>
);

export default Loader;
