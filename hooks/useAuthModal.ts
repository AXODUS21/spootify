// this basically makes it so that I dont have to pass these functions as a props to be able to change the state
//for example I am using these functions in the AuthModal without gaving to pass it as a prop
import {create} from "zustand" 


interface AuthModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))


export default useAuthModal;