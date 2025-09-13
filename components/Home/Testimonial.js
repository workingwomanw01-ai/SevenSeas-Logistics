"use client"

import { useState, useEffect } from "react"

const testimonials = [
	{
		heading: "Smooth Move!",
		text: "Seven Seas made my move so easy and stress-free. Highly recommended!",
		author: "Sarah L.",
		date: "2 days ago",
	},
	{
		heading: "Fast & Reliable",
		text: "Excellent customer service and fast delivery. Will use again!",
		author: "James T.",
		date: "5 days ago",
	},
	{
		heading: "Great Value",
		text: "Affordable rates and my items arrived safely. Thank you!",
		author: "Priya S.",
		date: "1 week ago",
	},
	{
		heading: "Always Informed",
		text: "The tracking updates kept me informed every step of the way. Great experience!",
		author: "Carlos M.",
		date: "2 weeks ago",
	},
	{
		heading: "Professional Team",
		text: "The staff was courteous and handled my belongings with care.",
		author: "Linda W.",
		date: "3 weeks ago",
	},
	{
		heading: "Highly Recommend",
		text: "I recommend Seven Seas to all my friends and family. Top-notch service!",
		author: "Ahmed K.",
		date: "1 month ago",
	},
	{
		heading: "Stress-Free Experience",
		text: "Moving overseas was easy thanks to their support and updates.",
		author: "Maria G.",
		date: "1 month ago",
	},
	{
		heading: "Impressive Service",
		text: "Everything arrived on time and in perfect condition. Thank you!",
		author: "Tom R.",
		date: "2 months ago",
	},
]

const MAX_DESKTOP = 4

export default function Testimonial() {
	const [isMobile, setIsMobile] = useState(false)
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768)
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const handlePrev = () => {
		if (isMobile) {
			setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
		} else {
			setCurrent((prev) =>
				prev === 0
					? Math.max(testimonials.length - MAX_DESKTOP, 0)
					: prev - 1
			)
		}
	}
	const handleNext = () => {
		if (isMobile) {
			setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
		} else {
			setCurrent((prev) =>
				prev >= testimonials.length - MAX_DESKTOP
					? 0
					: prev + 1
			)
		}
	}

	// For desktop, show up to 4 at a time, sliding by 1
	const getDesktopTestimonials = () => {
		let start = current
		let end = start + MAX_DESKTOP
		if (end > testimonials.length) {
			// Wrap around
			const firstPart = testimonials.slice(start)
			const secondPart = testimonials.slice(0, end - testimonials.length)
			return [...firstPart, ...secondPart]
		}
		return testimonials.slice(start, end)
	}

	return (
		<div className="wide-col col-xs-12">
			<style>
                {`
                @media (max-width: 767px) {
                    .ss-testimonial-heading {
                        font-size: 18px !important;
                    }
                    .ss-testimonial-main {
                        font-size: 24px !important;
                    }
                    .ss-testimonial-info {
                        align-items: center !important;
                        text-align: center !important;
                        margin-left: 0 !important;
                        padding-left: 0 !important;
                    }
                }
                @media (min-width: 768px) {
                    .ss-testimonial-info {
                        align-items: center !important;
                        text-align: center !important;
                        margin-left: 200px !important; /* <-- push right on desktop */
                        padding-left: 0 !important;
                    }
                }
                .ss-arrow-btn {
                    background: #fff !important;
                    border: none;
                    border-radius: 50%;
                    width: 26px;
                    height: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s;
                    box-shadow: 0 2px 8px rgba(229,57,53,0.10);
                    border: 2px solid #b71c1c;
                    padding: 0;
                }
                .ss-arrow-btn svg {
                    display: block;
                    width: 13px;
                    height: 13px;
                }
                .ss-arrow-btn:active {
                    background: #ffeaea !important;
                }
                .ss-arrow-btn .ss-arrow-icon {
                    fill: #b71c1c;
                }
                .ss-arrow-btn.disabled,
                .ss-arrow-btn:disabled {
                    border-color: #ccc !important;
                    background: #f5f5f5 !important;
                    cursor: not-allowed !important;
                }
                .ss-arrow-btn.disabled .ss-arrow-icon,
                .ss-arrow-btn:disabled .ss-arrow-icon {
                    fill: #ccc !important;
                }
                `}
            </style>
            {/* Small space above testimonials */}
            <div style={{ height: 24 }} />
            <div className="container">
                {/* ROW - OVERVIEW */}
                <div className="row overview" style={{ justifyContent: "center" }}>
                    <div
                        className="info col-xs-12 ss-testimonial-info"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <p
                            className="secondary-heading ss-testimonial-heading"
                            style={{
                                color: "#b71c1c", // burgundy-dark
                                fontSize: 28,
                                fontWeight: 700,
                                marginBottom: 2,
                            }}
                        >
                            Don't take our word for it
                        </p>
                        <h4
                            className="heading main ss-testimonial-main"
                            style={{
                                color: "#C9A96E", // gold-dark
                                fontSize: 36,
                                fontWeight: 800,
                                marginBottom: 32,
                            }}
                        >
                            Our customers love us!
                        </h4>
                    </div>
                </div>
                {/*// ROW - OVERVIEW */}
            </div>
            <div
				className="spc codeblock"
				data-os-animation="fadeIn"
				data-os-animation-delay="0s"
			>
				{isMobile ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							width: "100%",
							maxWidth: 340,
							margin: "0 auto 16px auto",
						}}
					>
						<button
							onClick={handlePrev}
							aria-label="Previous"
							className={`ss-arrow-btn${(current === 0) ? " disabled" : ""}`}
							style={{
								position: "absolute",
								left: -16,
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 2,
							}}
							disabled={current === 0}
						>
							<svg viewBox="0 0 24 24" className="ss-arrow-icon">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
						</button>
						<div
							style={{
								background: "#fff",
								borderRadius: "0px",
								boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
								padding: "20px",
								maxWidth: "320px",
								width: "100%",
								minHeight: "140px",
								textAlign: "left",
								margin: "0 24px",
							}}
						>
							{/* Stars and tick row */}
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 8,
								}}
							>
								<div
									style={{
										display: "flex",
										gap: "2px",
										marginRight: 8,
									}}
								>
									{[...Array(5)].map((_, i) => (
										<span
											key={i}
											style={{
												display: "inline-flex",
												alignItems: "center",
												justifyContent: "center",
												background: "#00B67A",
												borderRadius: "0px",
												width: 22,
												height: 22,
											}}
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 20 20"
												fill="white"
												xmlns="http://www.w3.org/2000/svg"
												style={{ display: "inline-block" }}
											>
												<polygon
													points="10,1.5 12.59,7.36 18.9,7.64 13.95,11.97 15.54,18.09 10,14.5 4.46,18.09 6.05,11.97 1.1,7.64 7.41,7.36"
													fill="white"
													stroke="white"
													strokeWidth="1"
												/>
											</svg>
										</span>
									))}
								</div>
								<span
									style={{
										display: "inline-flex",
										alignItems: "center",
										justifyContent: "center",
										background: "#bdbdbd",
										borderRadius: "50%",
										width: 14,
										height: 14,
										marginRight: 6,
									}}
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
									>
										<circle cx="8" cy="8" r="8" fill="none" />
										<path
											d="M4 8.5L7 11.5L12 6.5"
											stroke="#fff"
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<span
									style={{
										color: "#757575",
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									Invited
								</span>
							</div>
							<div
								style={{
									fontWeight: "bold",
									fontSize: 18,
									marginBottom: 6,
								}}
							>
								{testimonials[current].heading}
							</div>
							<div style={{ marginBottom: 10 }}>
								{testimonials[current].text}
							</div>
							<div style={{ color: "#757575", fontSize: 14 }}>
								– {testimonials[current].author}{" "}
								<span style={{ marginLeft: 8 }}>
									{testimonials[current].date}
								</span>
							</div>
						</div>
						<button
							onClick={handleNext}
							aria-label="Next"
							className={`ss-arrow-btn${(isMobile ? current === testimonials.length - 1 : current >= testimonials.length - MAX_DESKTOP) ? " disabled" : ""}`}
							style={{
								position: "absolute",
								right: -16,
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 2,
							}}
							disabled={isMobile ? current === testimonials.length - 1 : current >= testimonials.length - MAX_DESKTOP}
						>
							<svg viewBox="0 0 24 24" className="ss-arrow-icon">
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                            </svg>
                        </button>
					</div>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
							width: "100%",
							maxWidth: 1400,
							margin: "0 auto 16px auto",
						}}
					>
						<button
							onClick={handlePrev}
							aria-label="Previous"
							className="ss-arrow-btn"
							style={{
								position: "absolute",
								left: -20,
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 2,
							}}
						>
							<svg viewBox="0 0 24 24" className="ss-arrow-icon">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
						</button>
						<div
							style={{
								display: "flex",
								gap: "24px",
								width: "100%",
								justifyContent: "center",
								maxWidth: 1340, // set a max width for the row
								margin: "0 auto", // center the row in its parent
							}}
						>
							{getDesktopTestimonials().map((t, idx) => (
								<div
									key={idx}
									style={{
										background: "#fff",
										borderRadius: "0px",
										boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
										padding: "20px",
										maxWidth: "320px",
										width: "100%",
										minHeight: "140px",
										textAlign: "left",
										marginLeft: 0,
										flex: "1 1 260px",
									}}
								>
									{/* Stars and tick row */}
									<div
										style={{
											display: "flex",
											alignItems: "center",
											marginBottom: 8,
										}}
									>
										<div
											style={{
												display: "flex",
												gap: "2px",
												marginRight: 8,
											}}
										>
											{[...Array(5)].map((_, i) => (
												<span
													key={i}
													style={{
														display: "inline-flex",
														alignItems: "center",
														justifyContent: "center",
														background: "#00B67A",
														borderRadius: "0px",
														width: 22,
														height: 22,
													}}
												>
													<svg
														width="16"
														height="16"
														viewBox="0 0 20 20"
														fill="white"
														xmlns="http://www.w3.org/2000/svg"
														style={{ display: "inline-block" }}
													>
														<polygon
															points="10,1.5 12.59,7.36 18.9,7.64 13.95,11.97 15.54,18.09 10,14.5 4.46,18.09 6.05,11.97 1.1,7.64 7.41,7.36"
															fill="white"
															stroke="white"
															strokeWidth="1"
														/>
													</svg>
												</span>
											))}
										</div>
										<span
											style={{
												display: "inline-flex",
												alignItems: "center",
												justifyContent: "center",
												background: "#bdbdbd",
												borderRadius: "50%",
												width: 14,
												height: 14,
												marginRight: 6,
											}}
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
											>
												<circle cx="8" cy="8" r="8" fill="none" />
												<path
													d="M4 8.5L7 11.5L12 6.5"
													stroke="#fff"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</span>
										<span
											style={{
												color: "#757575",
												fontWeight: 500,
												fontSize: 14,
											}}
										>
											Invited
										</span>
									</div>
									<div
										style={{
											fontWeight: "bold",
											fontSize: 18,
											marginBottom: 6,
										}}
									>
										{t.heading}
									</div>
									<div style={{ marginBottom: 10 }}>{t.text}</div>
									<div style={{ color: "#757575", fontSize: 14 }}>
										– {t.author}{" "}
										<span style={{ marginLeft: 8 }}>{t.date}</span>
									</div>
								</div>
							))}
						</div>
						<button
							onClick={handleNext}
							aria-label="Next"
							className="ss-arrow-btn"
							style={{
								position: "absolute",
								right: -20,
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 2,
							}}
						>
							<svg viewBox="0 0 24 24" className="ss-arrow-icon">
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            {/* Trustpilot rating below the review cards in desktop view */}
            {!isMobile && (
                <div
                    style={{
                        textAlign: "center",
                        fontSize: 13,
                        color: "#757575",
                        marginTop: 8,
                        marginBottom: 16,
                        lineHeight: 1.6,
                    }}
                >
                    Rated <span style={{ fontWeight: 700, color: "#222" }}>4.5/5</span> based on 9,633 reviews. Showing our 5 star reviews.
                    <br />
                    <span style={{ fontWeight: 700, color: "#222" }}>Trustpilot</span>
                    <svg width="16" height="16" viewBox="0 0 20 20" style={{ display: "inline-block", marginLeft: 4, verticalAlign: "middle" }}>
                        <polygon
                            points="10,1.5 12.59,7.36 18.9,7.64 13.95,11.97 15.54,18.09 10,14.5 4.46,18.09 6.05,11.97 1.1,7.64 7.41,7.36"
                            fill="#00B67A"
                            stroke="#00B67A"
                            strokeWidth="1"
                        />
                    </svg>
                </div>
            )}
			{/* Add Trustpilot rating below the review card */}
            {isMobile ? (
                <div
                    style={{
                        textAlign: "center",
                        fontSize: 13,
                        color: "#757575",
                        marginTop: 8,
                        marginBottom: 16,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: 340,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <span style={{ display: "block", width: "100%" }}>
                        Rated <span style={{ fontWeight: 700, color: "#222" }}>4.5/5</span> based on 9,633 reviews.
                    </span>
                    <span style={{ display: "block", width: "100%" }}>
                        Showing our 5 star reviews.
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2, justifyContent: "center", width: "100%" }}>
                        <span style={{ fontWeight: 700, color: "#222" }}>Trustpilot</span>
                        <svg width="16" height="16" viewBox="0 0 20 20" style={{ display: "inline-block" }}>
                            <polygon
                                points="10,1.5 12.59,7.36 18.9,7.64 13.95,11.97 15.54,18.09 10,14.5 4.46,18.09 6.05,11.97 1.1,7.64 7.41,7.36"
                                fill="#00B67A"
                                stroke="#00B67A"
                                strokeWidth="1"
                            />
                        </svg>
                    </span>
                </div>
            ) : null}
			<div className="container">
				{/* ROW - OVERVIEW */}
				{/* <div className="row outro text-left">
					<div className="info col-xs-12">
						<div className="text base-text">
							<p>
								<span id="shipping">
									Ready to ship with confidence? Join thousands of happy
									customers today!
								</span>
							</p>
						</div>
					</div>
				</div> */}
				{/*// ROW - OVERVIEW */}
			</div>
		</div>
	)
}
