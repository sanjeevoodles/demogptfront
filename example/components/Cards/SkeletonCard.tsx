import React from "react";
import styles from "../../../styles/Home.module.css";

const SkeletonCard = () => {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardImg}>
				<div className={styles.skeletonImage}></div>
				<div>
					<div className={styles.skeletonTitle}></div>
					<div className={styles.skeletonDesc}></div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonCard;
