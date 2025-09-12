"use client";

import { useState, useEffect } from "react";
import { Truck, Package, MapPin, Clock, ArrowRight } from "lucide-react";

const slides = [
	{
		id: 1,
		title: "Fast & Reliable Shipping Solutions",
		subtitle: "Delivering Excellence Across the Globe",
		description:
			"Experience seamless logistics with our comprehensive shipping services. From express delivery to freight solutions, we ensure your cargo reaches its destination safely and on time.",
		image:
			"/images/2.png",		icon: Truck,
		buttonText: "Track Your Shipment",
	},
	{
		id: 2,
		title: "Advanced Warehouse Management",
		subtitle: "Smart Storage for Modern Business",
		description:
			"Optimize your inventory with our state-of-the-art warehouse facilities. Real-time tracking, automated systems, and strategic locations ensure efficient supply chain management.",
		image:
			"images/4.png",
		icon: Package,
		buttonText: "Find My Package",
	},
	{
		id: 3,
		title: "Global Supply Chain Solutions",
		subtitle: "Connect Your Business Worldwide",
		description:
			"Streamline your operations with our end-to-end logistics network. From procurement to final delivery, we provide integrated solutions that scale with your business needs.",
		image:
			"/images/5.png",
		icon: MapPin,
		buttonText: "Track Delivery",
	},
];

export default function Hero() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const currentSlideData = slides[currentSlide];
	const IconComponent = currentSlideData.icon;
	return (
		<section
			id="home"
			className="relative h-[85vh] sm:h-[90vh] lg:h-[80vh] min-h-[650px] sm:min-h-[600px] overflow-hidden"
		>
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
				style={{ backgroundImage: `url(${currentSlideData.image})` }}
			/>

			{/* Diagonal Burgundy Overlay */}
			<div
				className="absolute inset-0"
				style={{
					background: 'linear-gradient(135deg, #8b1538cc 0%, #6b1129dd 100%)',
					clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)',
				}}
			/>

			{/* Light Gold Overlay for Right Side */}
			<div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, #c9a96e20 0%, #d4b88240 100%)' }} />

			<div className="relative z-10 h-full flex items-center py-8 sm:py-0">
				{/* Left Content Section */}
				<div className="w-full lg:w-1/2">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-2xl">
							<div className="space-y-4 sm:space-y-6 animate-slide-in" key={currentSlide}>
								<div className="flex items-center space-x-2 sm:space-x-3" style={{ color: '#c9a96e' }}>
									<IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
									<span className="text-base sm:text-lg font-semibold leading-tight">
										LOGISTICS SOLUTIONS THAT DELIVER
									</span>
								</div>								<h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white leading-tight">
									{currentSlideData.title}
								</h1>

								<h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold" style={{ color: '#c9a96e' }}>
									{currentSlideData.subtitle}
								</h2>

								<p className="text-lg sm:text-xl lg:text-xl text-gray-100 leading-relaxed">
									{currentSlideData.description}
								</p>								<div className="flex flex-col sm:flex-row gap-4 pt-6">
									<a href="/tracking" className="text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 group text-lg sm:text-xl" style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #b8965a 100%)' }} onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #b8965a 0%, #9c7f4b 100%)'} onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #c9a96e 0%, #b8965a 100%)'}>
										<span>{currentSlideData.buttonText}</span>
										<ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
									</a>
									<a href="/about" className="border-2 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold transition-colors text-lg sm:text-xl" style={{ borderColor: '#c9a96e', color: '#c9a96e' }} onMouseEnter={(e) => { e.target.style.background = '#c9a96e'; e.target.style.color = '#ffffff'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#c9a96e'; }}>
										Learn More
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}