import { createContext } from 'react';

const ProfileContext = createContext({
    pSection: "",
    setPSection: (pSection: string) => {}
})

export default ProfileContext;