
import React, { useEffect, useState } from "react";
import { getStore } from "./Store";

export const Main: React.FC = () => {

    const [message, setMessage] = useState("");
    useEffect(() => {
        getStore().subscribe(() => {
            const state = getStore().getState();
            setMessage(state.message);
        });
    });

    const onClick1 = (): void => {
        getStore().dispatch({ type: "hw" });
    };

    const onClick2 = (): void => {
        getStore().dispatch({ type: "hw2" });
    };

    return (
        <div>
            <button onClick={onClick1}>Click 1</button>
            <button onClick={onClick2}>Click 2</button>
            {
                <p>{message}</p>
            }
        </div>
    );
};

export default Main;
