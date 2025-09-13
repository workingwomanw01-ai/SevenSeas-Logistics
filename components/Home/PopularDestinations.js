import Image from "next/image";

const destinations = [
	{
		name: "Australia",
		code: "au",
		link: "/moving/international-relocation/moving-to-australia/",
	},
	{
		name: "Austria",
		code: "at",
		link: "/shipping/shipping-to-destinations/austria/",
	},
	{
		name: "Belgium",
		code: "be",
		link: "/moving/international-relocation/moving-to-belgium/",
	},
	{
		name: "Brunei",
		code: "bn",
		link: "/moving/international-relocation/removals-to-brunei/",
	},
	{
		name: "Cambodia",
		code: "kh",
		link: "/shipping/shipping-to-destinations/cambodia/",
	},
	{
		name: "Canada",
		code: "ca",
		link: "/moving/international-relocation/moving-to-canada/",
	},
	{
		name: "China",
		code: "cn",
		link: "/moving/international-relocation/moving-to-china/",
	},
	{
		name: "Croatia",
		code: "hr",
		link: "/shipping/shipping-to-destinations/croatia/",
	},
	{
		name: "Denmark",
		code: "dk",
		link: "/moving/international-relocation/moving-to-denmark/",
	},
	{
		name: "Finland",
		code: "fi",
		link: "/shipping/shipping-to-destinations/finland/",
	},
	{
		name: "France",
		code: "fr",
		link: "/moving/international-relocation/removals-to-france/",
	},
	{
		name: "Germany",
		code: "de",
		link: "/moving/international-relocation/removals-to-germany/",
	},
	{
		name: "Hong Kong",
		code: "hk",
		link: "/moving/international-relocation/moving-to-hong-kong/",
	},
	{
		name: "India",
		code: "in",
		link: "/moving/international-relocation/india/",
	},
	{
		name: "Indonesia",
		code: "id",
		link: "/moving/international-relocation/moving-to-indonesia/",
	},
	{
		name: "Ireland",
		code: "ie",
		link: "/moving/international-relocation/moving-to-ireland/",
	},
	{
		name: "Israel",
		code: "il",
		link: "/shipping/shipping-to-destinations/israel/",
	},
	{
		name: "Italy",
		code: "it",
		link: "/moving/international-relocation/moving-to-italy/",
	},
	{
		name: "Japan",
		code: "jp",
		link: "/moving/international-relocation/moving-to-japan/",
	},
	{
		name: "Macau SAR",
		code: "mo",
		link: "/moving/international-relocation/moving-to-macau/",
	},
	{
		name: "Malaysia",
		code: "my",
		link: "/moving/international-relocation/moving-to-malaysia/",
	},
	{
		name: "Mauritius",
		code: "mu",
		link: "/moving/international-relocation/removals-to-mauritius/",
	},
	{
		name: "Netherlands",
		code: "nl",
		link: "/moving/international-relocation/moving-to-the-netherlands/",
	},
	{
		name: "New Zealand",
		code: "nz",
		link: "/moving/international-relocation/moving-to-new-zealand/",
	},
	{
		name: "Norway",
		code: "no",
		link: "/shipping/shipping-to-destinations/norway/",
	},
	{
		name: "Philippines",
		code: "ph",
		link: "/shipping/shipping-to-destinations/philippines/",
	},
	{
		name: "Poland",
		code: "pl",
		link: "/shipping/shipping-to-destinations/poland/",
	},
	{
		name: "Portugal",
		code: "pt",
		link: "/moving/international-relocation/removals-to-portugal/",
	},
	{
		name: "Qatar",
		code: "qa",
		link: "/moving/international-relocation/removals-to-qatar/",
	},
	{
		name: "Saudi Arabia",
		code: "sa",
		link: "/moving/international-relocation/moving-to-saudi-arabia/",
	},
	{
		name: "Singapore",
		code: "sg",
		link: "/moving/international-relocation/moving-to-singapore/",
	},
	{
		name: "South Africa",
		code: "za",
		link: "/moving/international-relocation/moving-to-south-africa/",
	},
	{
		name: "South Korea",
		code: "kr",
		link: "/shipping/shipping-to-destinations/south-korea/",
	},
	{
		name: "Spain",
		code: "es",
		link: "/moving/international-relocation/removals-to-spain/",
	},
	{
		name: "Sweden",
		code: "se",
		link: "/moving/international-relocation/moving-to-sweden/",
	},
	{
		name: "Switzerland",
		code: "ch",
		link: "/moving/international-relocation/moving-to-switzerland/",
	},
	{
		name: "Taiwan",
		code: "tw",
		link: "/moving/international-relocation/moving-to-taiwan/",
	},
	{
		name: "Thailand",
		code: "th",
		link: "/moving/international-relocation/moving-to-thailand/",
	},
	{
		name: "United Arab Emirates",
		code: "ae",
		link: "/moving/international-relocation/moving-to-the-uae/",
	},
	{
		name: "United Kingdom",
		code: "gb",
		link: "/shipping/shipping-to-destinations/uk/",
	},
	{
		name: "United States",
		code: "us",
		link: "/moving/international-relocation/moving-to-the-usa/",
	},
];

// Helper to get flag URL
const getFlagUrl = (code) =>
	`https://flagcdn.com/w60/${code.toLowerCase()}.png`;

export default function PopularDestinations() {
	return (
		<section
			className="py-16 bg-[#f8fafc]"
			id="section_81c8b806-0917-4b1a-a974-6f27af8b80b1"
		>
			<div className="max-w-6xl mx-auto px-4">
				<div className="mb-10">
					<h2
						className="text-3xl md:text-4xl font-bold mb-4 text-center"
						style={{ color: "#bfa14a" }}
					>
						Popular destinations our shipping company covers
					</h2>
					<div className="text-lg text-gray-700 w-full leading-relaxed text-center">
						<p>
							We ship boxes, baggage and other household items to countless international destinations using our extensive network of depots. And, when you choose Seven Seas Worldwide, you can rest easy knowing we'll handle the whole process, including customs clearance and safe delivery.
						</p>
						<p className="mt-2 font-medium">
							Here are a few of the most popular countries we cover:
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-12 gap-y-10 justify-items-center">
					{destinations.map((dest) => (
						<div
							key={dest.name}
							className="flex flex-col items-center"
							style={{ height: 120 }}
						>
							<div className="rounded-full overflow-hidden shadow w-24 h-24 mb-3 relative">
								<img
									src={`https://flagcdn.com/w160/${dest.code}.png`}
									srcSet={`
                        https://flagcdn.com/w160/${dest.code}.png 1x,
                        https://flagcdn.com/w320/${dest.code}.png 2x
                    `}
									alt={dest.name}
									className="object-cover w-full h-full"
									loading="lazy"
								/>
							</div>
							<p
								className="text-lg underline font-semibold"
								style={{ color: "#800020" }}
							>
								{dest.name}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}