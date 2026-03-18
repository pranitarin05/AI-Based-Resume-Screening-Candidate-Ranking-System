import React from "react";

const Title = ({ title, description }) => {
    return (
        <div className="mt-6 text-center text-slate-700 px-4">
            <h2 className="text-3xl sm:text-4xl font-medium">{title}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-sm sm:text-base">
                {description}
            </p>
        </div>
    );
};

export default Title;
