import React from "react";
import Title from "./Title";
import { BookUserIcon } from "lucide-react";

const Testimonial = () => {
    const cardsData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: "Briar Martin",
            handle: "@neilstellar",
            quote: "The AI suggestions instantly improved my resume. It looks clean, professional, and recruiter-ready.",
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: "Avery Johnson",
            handle: "@averywrites",
            quote: "I rebuilt my resume in under 10 minutes and started getting interview calls within days.",
        },
        {
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            name: "Jordan Lee",
            handle: "@jordantalks",
            quote: "The ATS-friendly format made a huge difference. Recruiters actually noticed my profile.",
        },
        {
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=200",
            name: "Arjun Mehta",
            handle: "@arjunbuilds",
            quote: "As a fresher, I struggled with resume structure. This tool guided me step by step.",
        },
        {
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
            name: "Kwame Adeyemi",
            handle: "@kwametech",
            quote: "The AI perfectly highlighted my skills and experience. It saved me hours of manual edits.",
        },
        {
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200",
            name: "Hiroshi Tanaka",
            handle: "@hirodev",
            quote: "Clear layouts and smart wording suggestions made my resume stand out instantly.",
        },
        {
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
            name: "Lukas Schneider",
            handle: "@lukascodes",
            quote: "Professional design with accurate content. I’d recommend this to any job seeker.",
        },
    ];

    const VerifiedBadge = () => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
        >
            <path
                fill="#22c55e"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
            />
        </svg>
    );

    const Card = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
            <div className="flex gap-2">
                <img
                    src={card.image}
                    alt={`${card.name} profile`}
                    className="size-11 rounded-full"
                />
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <p className="font-medium">{card.name}</p>
                        <VerifiedBadge />
                    </div>
                    <span className="text-xs text-slate-500">
                        {card.handle}
                    </span>
                </div>
            </div>
            <p className="text-sm py-4 text-gray-800">{card.quote}</p>
        </div>
    );

    return (
        <>
            {/* Header */}
            <div
                id="testimonials"
                className="flex flex-col items-center my-10 scroll-mt-12"
            >
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
                    <BookUserIcon className="size-4" />
                    <span>Testimonials</span>
                </div>

                <Title
                    title="Don’t just take our word for it"
                    description="See how job seekers around the world are landing interviews faster with our AI resume builder."
                />
            </div>

            {/* Marquee Rows */}
            {[false, true].map((reverse, row) => (
                <div
                    key={row}
                    className="w-full mx-auto max-w-5xl overflow-hidden relative"
                >
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                    <div
                        className={`marquee-inner flex min-w-[200%] pt-10 pb-5 ${
                            reverse ? "marquee-reverse" : ""
                        }`}
                    >
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <Card key={`${card.name}-${index}`} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
                </div>
            ))}
        </>
    );
};

export default Testimonial;
