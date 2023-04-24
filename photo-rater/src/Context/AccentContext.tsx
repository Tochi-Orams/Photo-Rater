import { createContext } from "react";

const AccentContext = createContext({
    accent: "",
    setAccent: (accent: string) => {}
});

export default AccentContext;