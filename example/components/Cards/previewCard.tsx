import Image from "next/image";
import React, { useContext } from "react";
import star from "../../../public/images/star (2).png";
import star2 from "../../../public/images/starr.png";
import { SunIcon } from "icons";
import { WindmillContext } from "@roketid/windmill-react-ui";
import styles from "../../../styles/Home.module.css";
interface PreviewCardProps {
	imageUrl: any;
	title: string;
	description: string;
}

function PreviewCard({ imageUrl, title, description }: PreviewCardProps) {
	const { mode, toggleMode } = useContext(WindmillContext);

	return (
		<div>
			<div className={styles.cardContainer}>
				<div className={styles.cardImg}>
					<div>
						{" "}
						<Image
							src={imageUrl}
							alt="Card Image"
							width={500} // Adjust the width based on your design
							height={300} // Adjust the height based on your design
							layout="responsive"
							objectFit="cover"
							className="rounded-none" // Remove rounded corners
						/>
					</div>
					<div>
						<p
							className={
								mode === "dark" ? styles.cardTitleDark : styles.cardTitle
							}
						>
							{title}
						</p>
						<p className={styles.cardDesc}>{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PreviewCard;
