import { createContext } from "react";

const UserContext = createContext({
    user: "",
    setUser: (accent: string) => {}
});

export default UserContext;