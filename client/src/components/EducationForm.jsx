import React from "react";
import { GraduationCap, Plus, Trash2, Sparkles } from "lucide-react";

const EducationForm = ({ data, onChange }) => {
    const addEducation = () => {
        const newEducation = {
            institute: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        };
        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Education
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add your education details
                    </p>
                </div>

                <button
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    onClick={addEducation}
                >
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {/* Empty state */}
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No education added yet.</p>
                    <p className="text-sm">
                        Click "Add Education" to get started.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((education, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium">
                                    Education #{index + 1}
                                </h4>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    value={education.institute || ""}
                                    onChange={(e) =>
                                        updateEducation(
                                            index,
                                            "institute",
                                            e.target.value,
                                        )
                                    }
                                    type="text"
                                    placeholder="Institute Name"
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    value={education.degree || ""}
                                    onChange={(e) =>
                                        updateEducation(
                                            index,
                                            "degree",
                                            e.target.value,
                                        )
                                    }
                                    type="text"
                                    placeholder="Degree"
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    value={education.field || ""}
                                    onChange={(e) =>
                                        updateEducation(
                                            index,
                                            "field",
                                            e.target.value,
                                        )
                                    }
                                    type="text"
                                    placeholder="Field of Study"
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    value={education.graduation_date || ""}
                                    onChange={(e) =>
                                        updateEducation(
                                            index,
                                            "graduation_date",
                                            e.target.value,
                                        )
                                    }
                                    type="month"
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    value={education.gpa || ""}
                                    onChange={(e) =>
                                        updateEducation(
                                            index,
                                            "gpa",
                                            e.target.value,
                                        )
                                    }
                                    type="text"
                                    placeholder="CGPA (Optional)"
                                    className="px-3 py-2 text-sm rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EducationForm;
