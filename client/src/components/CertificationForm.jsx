import React from "react";
import { Plus, Trash2 } from "lucide-react";

const CertificationForm = ({ data = [], onChange }) => {
    const addCertification = () => {
        onChange([
            ...data,
            {
                name: "",
                issuer: "",
                year: "",
                url: "",
            },
        ]);
    };

    const updateCertification = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeCertification = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Certifications
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add professional certifications (ATS friendly)
                    </p>
                </div>

                <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Certification
                </button>
            </div>

            {/* Empty state */}
            {data.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-6">
                    No certifications added yet.
                </p>
            )}

            {/* Certifications */}
            <div className="space-y-4">
                {data.map((cert, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 space-y-3"
                    >
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium">
                                Certification #{index + 1}
                            </h4>
                            <button
                                onClick={() => removeCertification(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Certification Name"
                            value={cert.name}
                            onChange={(e) =>
                                updateCertification(
                                    index,
                                    "name",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        />

                        <input
                            type="text"
                            placeholder="Issuing Organization"
                            value={cert.issuer}
                            onChange={(e) =>
                                updateCertification(
                                    index,
                                    "issuer",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        />

                        <input
                            type="month"
                            value={cert.year}
                            onChange={(e) =>
                                updateCertification(
                                    index,
                                    "year",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        />

                        <input
                            type="url"
                            placeholder="Certificate URL (optional)"
                            value={cert.url}
                            onChange={(e) =>
                                updateCertification(
                                    index,
                                    "url",
                                    e.target.value,
                                )
                            }
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CertificationForm;
