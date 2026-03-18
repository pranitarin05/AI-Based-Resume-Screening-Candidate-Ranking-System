import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex items-center justify-center">
                <div
                    className="size-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"
                    aria-label="Loading"
                />
            </div>
        </div>
    );
};

export default Loader;
