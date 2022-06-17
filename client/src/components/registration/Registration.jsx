import { useState } from "react";
import css from "./registration.module.css";
import { login, registration } from "../../actions/user";
import { useDispatch } from "react-redux";

const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const registrationHandler = async () => {
      const response = await registration(email, password)
        console.log(response)
        if (response.status === 200) {
            dispatch(login(email, password))
        }
    }

    return (
        <div className={css.root}>
            <div className={css.form}>
                <h1>Registration</h1>
                <div className={css.field}>
                    <label id="name">
                        <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Enter name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css.field}>
                    <label id="surname">
                        <input
                            name="surname"
                            id="surname"
                            type="text"
                            placeholder="Enter surname..."
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css.field}>
                    <label id="email">
                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css.field}>
                    <label id="password">
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className={css.buttons}>
                    <button
                        onClick={() => registrationHandler()}
                        className={css.submit}
                    >
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
