import React, { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./login.module.css";
import { login } from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <div className={css.root}>
            <div className={css.form}>
                <h1>Login</h1>
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
                        onClick={
                            () => dispatch(
                            login(email, password)
                            )
                        }
                        className={css.submit}
                    >
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
