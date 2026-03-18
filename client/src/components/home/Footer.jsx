import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="flex flex-wrap justify-center lg:justify-between gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/60 to-white mt-40">
            {/* Left */}
            <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
                <Link to="/">
                    <img src="/logo.svg" alt="KaniCV Logo" />
                </Link>

                <div>
                    <p className="text-slate-800 font-semibold">Product</p>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Support
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Affiliate
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-slate-800 font-semibold">Resources</p>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Company
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Community
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Careers
                                <span className="ml-2 px-2 py-1 text-xs rounded-md bg-green-600 text-white">
                                    We’re hiring!
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-slate-800 font-semibold">Legal</p>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Privacy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="hover:text-green-600 transition"
                            >
                                Terms
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-2 max-md:items-center max-md:text-center items-end">
                <p className="max-w-60">
                    Supporting every career journey, from first resume to final
                    offer.
                </p>

                <div className="flex items-center gap-4 mt-3">
                    <a
                        href="https://github.com/Kanish1012"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Github className="size-5 hover:text-green-500 transition" />
                    </a>
                    <a
                        href="https://linkedin.com/in/kanish1012/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Linkedin className="size-5 hover:text-green-500 transition" />
                    </a>
                </div>

                <p className="mt-3">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-slate-700 font-medium">
                        KaniCV Resume Builder
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
