import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

/* ===== Date Helpers ===== */
const formatMonthYear = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

const ModernTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-normal">
            {/* Header */}
            <header
                className="p-6 text-white"
                style={{
                    backgroundColor: accentColor,
                    WebkitPrintColorAdjust: "exact",
                    printColorAdjust: "exact",
                }}
            >
                <h1 className="text-3xl font-light mb-2">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={data.personal_info.linkedin}
                            className="flex items-center gap-2"
                        >
                            <Linkedin className="size-4" />
                            <span className="break-all text-xs">
                                {data.personal_info.linkedin.replace(
                                    /^https?:\/\//,
                                    "",
                                )}
                            </span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={data.personal_info.website}
                            className="flex items-center gap-2"
                        >
                            <Globe className="size-4" />
                            <span className="break-all text-xs">
                                {data.personal_info.website.replace(
                                    /^https?:\/\//,
                                    "",
                                )}
                            </span>
                        </a>
                    )}
                </div>
            </header>

            <div className="p-6">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-6">
                        <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                            Experience
                        </h2>

                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="relative pl-5 border-l border-gray-200"
                                >
                                    <div className="flex justify-between items-start mb-1.5">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {exp.position}
                                            </h3>
                                            <p
                                                className="font-medium text-sm"
                                                style={{ color: accentColor }}
                                            >
                                                {exp.company}
                                            </p>
                                        </div>
                                        <div className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded">
                                            {formatDate(exp.start_date)} –{" "}
                                            {exp.is_current
                                                ? "Present"
                                                : formatDate(exp.end_date)}
                                        </div>
                                    </div>

                                    {exp.description && (
                                        <div className="text-gray-700 text-sm leading-relaxed mt-2 whitespace-pre-line">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                            Projects
                        </h2>

                        <div className="space-y-4">
                            {data.project.map((p, index) => (
                                <div
                                    key={index}
                                    className="relative pl-5 border-l border-gray-200"
                                    style={{ borderLeftColor: accentColor }}
                                >
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {p.name}
                                    </h3>
                                    {p.description && (
                                        <p className="text-gray-700 text-sm leading-relaxed mt-1.5">
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                                Education
                            </h2>

                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold text-sm text-gray-900">
                                            {edu.degree}
                                            {edu.field && ` in ${edu.field}`}
                                        </p>
                                        <p
                                            className="text-sm"
                                            style={{ color: accentColor }}
                                        >
                                            {edu.institution}
                                        </p>
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>
                                                {formatDate(
                                                    edu.graduation_date,
                                                )}
                                            </span>
                                            {edu.gpa && (
                                                <span>CGPA: {edu.gpa}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Certifications */}
                            {data.certifications?.length > 0 && (
                                <div className="mt-5">
                                    <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                                        Certifications
                                    </h2>

                                    <div className="space-y-2 text-sm text-gray-700">
                                        {data.certifications.map(
                                            (cert, index) => (
                                                <div key={index}>
                                                    <a
                                                        href={cert.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-medium text-gray-900"
                                                    >
                                                        {cert.name}
                                                    </a>{" "}
                                                    — {cert.issuer}
                                                    {cert.year && (
                                                        <span className="text-gray-500">
                                                            {" "}
                                                            (
                                                            {formatMonthYear(
                                                                cert.year,
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-light mb-3 pb-1 border-b border-gray-200">
                                Skills
                            </h2>

                            <div className="flex flex-wrap gap-2.5">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs text-white rounded-full"
                                        style={{
                                            backgroundColor: accentColor,
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
