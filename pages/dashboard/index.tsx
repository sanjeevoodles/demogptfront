import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/Home.module.css";
import PreviewCard from "example/components/Cards/previewCard";
import Layout from "example/containers/Layout";
import thumb from "../../public/images/hero-image-01.jpg";
import thumb2 from "../../public/images/home2.png";
import thumb3 from "../../public/images/home3.png";
import thumb4 from "../../public/images/home4.jpeg";

import response, { ITableData } from "utils/demo/tableData";
import { SearchIcon } from "icons";

import { Button, Input, WindmillContext } from "@roketid/windmill-react-ui";

import {
	Chart,
	ArcElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import Link from "next/link";
import SkeletonCard from "example/components/Cards/SkeletonCard";
import { useRouter } from "next/router";
// const prevObj: any[] = [];
const prevObj = [
	{
		id: 1,
		icon: thumb2,
		title: "Contact Form",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 2,
		icon: thumb3,
		title: "BLog Post",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 3,
		icon: thumb4,
		title: "Landing Page",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 4,
		icon: thumb4,
		title: "SEO Management",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 5,
		icon: thumb2,
		title: "Tag generator",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
	{
		id: 6,
		icon: thumb2,
		title: "Contact Form",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];
function Dashboard() {
	Chart.register(
		ArcElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);
	const router = useRouter();
	const { mode, toggleMode } = useContext(WindmillContext);

	useEffect(() => {
		// Check if the user is authenticated (has a token)
		const token = localStorage.getItem("token");
		if (!token) {
			// Redirect to the login page if no token is found
			router.push("/dashboard/login");
		}
	}, []);

	return (
		<Layout>
			{/* <PageTitle>Dashboard</PageTitle> */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-serif-medium text-2xl dark:text-gray-200 mt-6">
						Dashboard
					</h1>
				</div>
				<Link
					href="dashboard/CreateApp
					"
					passHref={true}
				>
					<Button
						block
						className="mt-4"
						style={{ width: "150px" }}
					>
						CREATE APP
					</Button>
				</Link>
			</div>
			<hr
				style={{ width: "100%", margin: "10px 0", border: "1px solid #ccc" }}
			/>

			<div className="flex justify-between items-center">
				<div>
					<h2
						className={
							mode === "dark"
								? `${styles.headingMainDark}`
								: `${styles.headingMain}`
						}
					>
						Recent Projects
					</h2>
				</div>
				<div>
					{prevObj && prevObj.length > 0 && (
						<div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
							<div className="absolute inset-y-0 flex items-center pl-2">
								<SearchIcon
									className="w-4 h-4"
									aria-hidden="true"
								/>
							</div>
							<Input
								className="pl-8 text-gray-700"
								placeholder="Search for projects"
								aria-label="Search"
							/>
						</div>
					)}
				</div>
			</div>
			{/* <!-- Cards --> */}
			<div
				className={
					prevObj && prevObj.length > 0
						? "w-full flex justify-around items-center gap-[20px] flex-wrap"
						: "w-full "
				}
				// style={{
				// 	width: "100%",
				// 	display: "flex",
				// 	justifyContent: "space-around",
				// 	alignItems: "center",
				// 	gap: "20px",
				// 	flexWrap: "wrap",
				// }}
			>
				{prevObj && prevObj.length > 0 ? (
					prevObj.map((data) => {
						return (
							<PreviewCard
								key={data.id}
								imageUrl={data.icon} // Replace with your actual image URL
								title={data.title}
								description={data.desc}
							></PreviewCard>
						);
					})
				) : (
					// <div className="flex flex-col items-center justify-center h-full mt-10">
					// 	<div className="text-lg text-black font-medium text-center mb-4 dark:text-white">
					// 		No Project Added !
					// 	</div>
					// 	<Button
					// 		block
					// 		className="mt-4"
					// 		style={{ width: "150px" }}
					// 	>
					// 		CREATE APP
					// 	</Button>
					// </div>
					<SkeletonCard />
				)}
			</div>
		</Layout>
	);
}

export default Dashboard;
