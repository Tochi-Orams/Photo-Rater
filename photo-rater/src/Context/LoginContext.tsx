import { createContext } from 'react';

const LoginContext = createContext({
    status: ["out", ""],
    setStatus: (status: string[]) => {}
})

export default LoginContext;