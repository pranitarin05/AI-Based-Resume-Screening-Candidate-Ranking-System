import React from "react";
import { Zap, Sparkles, FileText, Download } from "lucide-react";
import Title from "./Title";

const features = [
    {
        icon: Sparkles,
        color: "violet",
        title: "AI-Powered Resume Builder",
        description:
            "Generate professional, ATS-optimized resumes instantly using smart AI suggestions.",
    },
    {
        icon: FileText,
        color: "green",
        title: "Custom Resume Templates",
        description:
            "Choose from modern, recruiter-approved templates tailored to your job role.",
    },
    {
        icon: Download,
        color: "orange",
        title: "Easy Export & Share",
        description:
            "Download your resume in PDF format and share it with employers instantly.",
    },
];

const colorMap = {
    violet: {
        bg: "group-hover:bg-violet-100",
        border: "group-hover:border-violet-300",
        icon: "stroke-violet-600",
        active: "bg-violet-100 border-violet-300",
    },
    green: {
        bg: "group-hover:bg-green-100",
        border: "group-hover:border-green-300",
        icon: "stroke-green-600",
        active: "",
    },
    orange: {
        bg: "group-hover:bg-orange-100",
        border: "group-hover:border-orange-300",
        icon: "stroke-orange-600",
        active: "",
    },
};

const Features = () => {
    return (
        <div
            id="features"
            className="flex flex-col items-center my-14 scroll-mt-12"
        >
            {/* Badge */}
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
                <Zap className="size-4" />
                <span>Simple process</span>
            </div>

            {/* Section Title */}
            <Title
                title="Build your resume in minutes"
                description="Our streamlined AI-powered process helps you create a professional resume quickly and effortlessly."
            />

            {/* Content */}
            <div className="flex flex-col md:flex-row items-center justify-center xl:mt-10 gap-10">
                {/* Image */}
                <img
                    className="max-w-2xl w-full xl:-ml-32"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
                    alt="AI Resume Builder Preview"
                />

                {/* Feature Cards */}
                <div className="flex flex-col gap-6 px-4 md:px-0">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const colors = colorMap[feature.color];

                        return (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-6 max-w-md group cursor-pointer"
                            >
                                <div
                                    className={`p-6 flex gap-4 rounded-xl border border-transparent transition-colors ${colors.bg} ${colors.border} ${index === 0 ? colors.active : ""}`}
                                >
                                    <Icon className={`size-6 ${colors.icon}`} />

                                    <div className="space-y-2">
                                        <h3 className="text-base font-semibold text-slate-700">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 max-w-xs">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Features;
