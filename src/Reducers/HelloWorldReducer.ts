import { Action } from "redux";

export default function HelloWorld(state: string = "", action: Action): string {
    switch (action.type) {
        case "hw":
            return "Hello World";
        case "hw2":
            return "Hello World2" ;
        default:
            return state;
    }
}