import React from "react";
import Layout from "example/containers/Layout";
import PageTitle from "example/components/Typography/PageTitle";
import {
	Input,
	HelperText,
	Label,
	Select,
	Textarea,
} from "@roketid/windmill-react-ui";

const CreateApp = () => {
	return (
		<Layout>
			<PageTitle>Welcom to DemoGPT</PageTitle>
			<div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
				<Label className="mt-4">
					<span>Explain your LLM-based application idea *</span>
					<Textarea
						className="mt-3"
						rows={3}
						placeholder="Enter some long form content."
					/>
				</Label>
				<Label className="mt-3">
					<span>
						List all specific features desired for your app (comma seperated)
					</span>
					<Input
						className="mt-2"
						placeholder="Write some specific features"
					/>
				</Label>
			</div>
		</Layout>
	);
};

export default CreateApp;
