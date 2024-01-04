import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleIcon } from "icons";
import {
	Input,
	Label,
	Button,
	WindmillContext,
} from "@roketid/windmill-react-ui";
import { useGoogleLogin } from "@react-oauth/google";
import { post } from "./../../utils/utilities";

function CrateAccount() {
	const router = useRouter();

	const { mode } = useContext(WindmillContext);
	const imgSource =
		mode === "dark"
			? "/assets/img/create-account-office-dark.jpeg"
			: "/assets/img/create-account-office.jpeg";
	const googleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => console.log(tokenResponse),
		onError: (err) => {
			console.log(err);
		},
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	function togglePasswordVisibility(data: any) {
		console.log("data", data);
		if (data === "password") {
			setIsPasswordVisible((prevState) => !prevState);
		} else {
			setIsConfirmPasswordVisible((prevState) => !prevState);
		}
	}
	const [signUpData, setSignUpData] = useState({
		email: "",
		password: "",
		confirm_password: "",
	});
	const isFormValid = () => {
		// Check if email, password, and confirm_password are not empty
		return (
			signUpData.email.trim() !== "" &&
			signUpData.password.trim() !== "" &&
			signUpData.confirm_password.trim() !== ""
		);
	};
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// 	const [cPassword, setcPassword] = useState("");
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setSignUpData({ ...signUpData, [name]: value });
	};
	console.log("signup", signUpData);
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior

		try {
			const response = await axios.post(
				`${process.env.BACKEND_ADDRESS}/signup`,
				signUpData
			);
			console.log("response", response);
			if (
				response.data.code == 200 &&
				response.data.message === "User registered successfully"
			) {
				console.log("Signup successful");
				toast.success(response.data.message);
				router.push("/dashboard/login");

				// Additional logic after successful signup, e.g., redirect to the login page
			} else {
				console.log("Signup failed. Please try again.");
				// Handle other cases, e.g., display an error message
			}
		} catch (error) {
			console.log("Response", error.response.data.detail);
			toast.error(error.response.data.detail.message);

			// Handle errors, e.g., display an error message to the user
		}
	};

	return (
		<div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
			<div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
				<div className="flex flex-col overflow-y-auto md:flex-row">
					<div className="relative h-32 md:h-auto md:w-1/2">
						<Image
							aria-hidden="true"
							className="object-cover w-full h-full"
							src={imgSource}
							alt="Office"
							layout="fill"
						/>
					</div>
					<main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
						<div className="w-full">
							<h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
								Create account
							</h1>
							<Label>
								<span>Email</span>
								<Input
									className="mt-1"
									type="email"
									name="email"
									value={signUpData.email}
									onChange={handleChange}
									placeholder="john@doe.com"
								/>
							</Label>
							<Label className="mt-4">
								<span>Password</span>

								<div className="relative  container mx-auto  mt-1">
									<Input
										type={isPasswordVisible ? "text" : "password"}
										placeholder="Password"
										className="w-full
        px-4
        py-2
        text-base
        border border-gray-300
        rounded
        outline-none
        focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
										name="password"
										onChange={handleChange}
										value={signUpData.password}
									/>
									<button
										className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
										onClick={() => togglePasswordVisibility("password")}
									>
										{isPasswordVisible ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										)}
									</button>
								</div>
							</Label>
							{/* confirm password */}
							<Label className="mt-4">
								<span>Confirm password</span>

								<div className="relative  container mx-auto mt-1">
									<Input
										type={isConfirmPasswordVisible ? "text" : "password"}
										placeholder="Confirm password"
										className="w-full
			 px-4
        py-2
        text-base
        border border-gray-300
        rounded
        outline-none
        focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
										value={signUpData.confirm_password}
										name="confirm_password"
										onChange={handleChange}
									/>
									<button
										className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
										onClick={() => togglePasswordVisibility("confirm password")}
									>
										{isConfirmPasswordVisible ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										)}
									</button>
								</div>
							</Label>

							<Label
								className="mt-6"
								check
							>
								<Input type="checkbox" />
								<span className="ml-2">
									I agree to the{" "}
									<span className="underline">privacy policy</span>
								</span>
							</Label>

							{/* <Link
								href="/dashboard/login"
								passHref={true}
							> */}
							<form onSubmit={handleSubmit}>
								<Button
									block
									style={{ cursor: isFormValid() ? "pointer" : "not-allowed" }}
									className={`mt-4 ${isFormValid() ? "" : "opacity-50"}`}
									type="submit"
									disabled={!isFormValid()}
								>
									Sign Up
								</Button>
							</form>
							{/* </Link> */}

							<hr className="my-8" />

							<Button
								block
								layout="outline"
								onClick={() => googleLogin()}
							>
								<GoogleIcon
									className="w-4 h-4 mr-2"
									aria-hidden="true"
								/>
								Sign in with Google
							</Button>
							<p className="mt-4">
								<Link href="/dashboard/login">
									<a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
										Already have an account? Login
									</a>
								</Link>
							</p>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}

export default CrateAccount;
