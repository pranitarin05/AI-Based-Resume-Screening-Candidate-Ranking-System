import React, { useState } from "react";
import { Check, Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#10B981" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Cyan", value: "#06B6D4" },
        { name: "Pink", value: "#EC4899" },
        { name: "Slate", value: "#475569" },
        { name: "Gray", value: "#6B7280" },
        { name: "Black", value: "#1F2937" },
    ];

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Palette size={16} />
                <span className="max-sm:hidden">Accent</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 grid grid-cols-4 gap-2 p-3 z-10 w-60 bg-white rounded-md border border-gray-200 shadow-sm">
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            type="button"
                            onClick={() => {
                                onChange(color.value);
                                setIsOpen(false);
                            }}
                            className="relative group flex flex-col items-center"
                        >
                            <div
                                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors relative"
                                style={{ backgroundColor: color.value }}
                            >
                                {selectedColor === color.value && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-center mt-1 text-gray-600">
                                {color.name}
                            </p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
