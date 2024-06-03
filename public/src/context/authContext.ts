import { createContext } from "react";

export interface User {
	userId: string;
	name: string;
	email: string;
}

export const AuthContext = createContext<null | User>(null);
