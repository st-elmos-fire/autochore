import { createContext, Dispatch, SetStateAction } from "react";

interface ModeContext {
    mode: "add" | "view" ;
    setMode?: Dispatch<SetStateAction<"view" | "add">>;
}

const ModeContext = createContext<ModeContext>({
    mode: 'view',
    setMode: () => {},
});

export default ModeContext;