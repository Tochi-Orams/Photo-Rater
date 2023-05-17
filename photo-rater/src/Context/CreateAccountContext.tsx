import { createContext } from 'react';

interface deets {
    email: string
    password: string
}

const CreateAccountContext = createContext({
    details: {email: "", password: ""},
    setDetails: (detials: deets) => {}
})

export default CreateAccountContext;