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

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 leading-normal">
            {/* Header */}
            <header
                className="text-center mb-6 pb-3 border-b-2"
                style={{ borderColor: accentColor }}
            >
                <h1
                    className="text-2xl font-bold mb-1.5"
                    style={{ color: accentColor }}
                >
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-3.5" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-3.5" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-3.5" />
                            <span className="break-all">
                                {data.personal_info.linkedin}
                            </span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-3.5" />
                            <span className="break-all">
                                {data.personal_info.website}
                            </span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-semibold mb-2"
                        style={{ color: accentColor }}
                    >
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-sm text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-semibold mb-2.5"
                        style={{ color: accentColor }}
                    >
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-3.5">
                        {data.experience.map((exp, index) => (
                            <div
                                key={index}
                                className="border-l-2 pl-4"
                                style={{ borderColor: accentColor }}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-semibold text-sm text-gray-900">
                                            {exp.position}
                                        </h3>
                                        <p className="text-sm text-gray-700 font-medium">
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="text-right text-xs text-gray-600">
                                        {formatDate(exp.start_date)} –{" "}
                                        {exp.is_current
                                            ? "Present"
                                            : formatDate(exp.end_date)}
                                    </div>
                                </div>

                                {exp.description && (
                                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
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
                <section className="mb-4">
                    <h2
                        className="text-lg font-semibold mb-2.5"
                        style={{ color: accentColor }}
                    >
                        PROJECTS
                    </h2>

                    <ul className="space-y-2.5">
                        {data.project.map((proj, index) => (
                            <li
                                key={index}
                                className="border-l-2 pl-4"
                                style={{ borderColor: accentColor }}
                            >
                                <p className="text-sm font-semibold text-gray-800 mb-0.5">
                                    {proj.name}
                                </p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {proj.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-semibold mb-2.5"
                        style={{ color: accentColor }}
                    >
                        EDUCATION
                    </h2>

                    <div className="space-y-2.5">
                        {data.education.map((edu, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-start"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {edu.degree}
                                        {edu.field && ` in ${edu.field}`}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {edu.institution}
                                    </p>
                                    {edu.gpa && (
                                        <p className="text-xs text-gray-600 mt-0.5">
                                            CGPA: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600">
                                    {formatDate(edu.graduation_date)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {data.certifications?.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="text-lg font-semibold mb-2.5"
                        style={{ color: accentColor }}
                    >
                        CERTIFICATIONS
                    </h2>

                    <div className="space-y-1.5 text-sm text-gray-700">
                        {data.certifications.map((cert, index) => (
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
                                        ({formatMonthYear(cert.year)})
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section>
                    <h2
                        className="text-lg font-semibold mb-2.5"
                        style={{ color: accentColor }}
                    >
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-x-4 gap-y-1 flex-wrap text-sm text-gray-700">
                        {data.skills.map((skill, index) => (
                            <span key={index}>• {skill}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
