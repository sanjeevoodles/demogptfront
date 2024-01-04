import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	useContext,
} from "react";

import { useRouter } from "next/router";
import { post } from "./../utils/utilities";

interface User {
	name?: string;
	email?: string;
	token?: string;
}

interface IAuthContext {
	login: (userData: User) => void;
	logout: () => void;
	user: User | null;
}

export const AuthContext = React.createContext<IAuthContext>({
	login: () => {},
	logout: () => {},
	user: null,
});

export const AuthContextProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loginState, setLoginState] = useState<boolean>(false);
	console.log("login status", loginState);
	const router = useRouter();

	const blacklist = ["dashboard"];

	// const validateUser: () => void = () => {
	// 	const token = localStorage.getItem("token");
	// 	// console.log("token========>", token);
	// 	// let state;
	// 	const url = process.env.BACKEND_ADDRESS + "/auth/whoami";
	// 	if (token) {
	// 		post(url, "", { token })
	// 			.then((res: Response) => {
	// 				console.log("======", res);
	// 				if (res.status === 200) setLoginState(true);
	// 				else setLoginState(true);
	// 			})
	// 			.catch((error: Error) => {
	// 				console.error("Error occurred", error);
	// 				setLoginState(true);
	// 			});
	// 	} else setLoginState(true);
	// };
	// const validateUser: () => void = () => {
	// 	const token = localStorage.getItem("token");

	// 	const url = process.env.BACKEND_ADDRESS + "/auth/whoami";
	// 	if (token) {
	// 		post(url, "", { token })
	// 			.then((res: Response) => {
	// 				if (res.status === 200) {
	// 					setLoginState(true);
	// 				} else {
	// 					setLoginState(true);
	// 					// Redirect to login page if the user is not authenticated
	// 					router.push("/login");
	// 				}
	// 			})
	// 			.catch((error: Error) => {
	// 				console.error("Error occurred", error);
	// 				setLoginState(true);
	// 			});
	// 	} else {
	// 		setLoginState(true);
	// 		// Redirect to login page if the token is not present
	// 		router.push("/login");
	// 	}
	// };

	// router.pathname.includes()

	// useEffect(() => {
	// 	console.log("60", router.pathname);
	// 	// validateUser();
	// 	console.log("validateUser====", loginState);

	// 	if (
	// 		!loginState &&
	// 		router.pathname !== "/" &&
	// 		router.pathname !== "/dashboard/verify-email" &&
	// 		router.pathname !== "/dashboard/create-account"
	// 	) {
	// 		console.log("here");
	// 		router.push("/dashboard/login");
	// 	}
	// }, [router.pathname]);

	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
		router.push("/dashboard");
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
