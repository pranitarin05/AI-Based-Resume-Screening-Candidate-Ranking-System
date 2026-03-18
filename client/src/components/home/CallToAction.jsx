import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <div
            id="cta"
            className="w-full max-w-5xl mx-auto mt-28 px-10 sm:px-16 border-y border-dashed border-slate-200"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-3 md:px-10 py-16 sm:py-20 -mt-10 -mb-10 border-x border-dashed border-slate-200 text-center md:text-left">
                <p className="max-w-md text-xl font-medium text-slate-800">
                    Build a professional resume that helps you stand out and get
                    hired.
                </p>

                <Link
                    to="/login"
                    className="flex items-center gap-2 rounded px-8 py-3 bg-green-600 text-white transition-all hover:bg-green-700 hover:shadow-lg active:scale-95"
                >
                    <span>Get Started</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default CallToAction;
