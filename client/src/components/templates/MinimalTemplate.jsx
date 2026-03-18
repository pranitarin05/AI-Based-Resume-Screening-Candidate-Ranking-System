/* ===== Date Helpers ===== */
const formatMonthYear = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 font-light leading-snug">
            {/* Header */}
            <header className="mb-5">
                <h1 className="text-4xl font-thin mb-2.5 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <span>{data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span>{data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.location && (
                        <span>{data.personal_info.location}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">
                            {data.personal_info.linkedin}
                        </span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">
                            {data.personal_info.website}
                        </span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-5">
                    <p className="text-gray-700">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-sm uppercase tracking-widest mb-3 font-medium"
                        style={{ color: accentColor }}
                    >
                        Experience
                    </h2>

                    <div className="space-y-3.5">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-lg font-medium">
                                        {exp.position}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} –{" "}
                                        {exp.is_current
                                            ? "Present"
                                            : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-1">
                                    {exp.company}
                                </p>
                                {exp.description && (
                                    <div className="text-gray-700 whitespace-pre-line">
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
                <section className="mb-5">
                    <h2
                        className="text-sm uppercase tracking-widest mb-3 font-medium"
                        style={{ color: accentColor }}
                    >
                        Projects
                    </h2>

                    <div className="space-y-2.5">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-medium">
                                    {proj.name}
                                </h3>
                                <p className="text-gray-600">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-sm uppercase tracking-widest mb-3 font-medium"
                        style={{ color: accentColor }}
                    >
                        Education
                    </h2>

                    <div className="space-y-2.5">
                        {data.education.map((edu, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-baseline"
                            >
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree}{" "}
                                        {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">
                                        {edu.institution}
                                    </p>
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-500">
                                            CGPA: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications (Below Education) */}
            {data.certifications?.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-sm uppercase tracking-widest mb-3 font-medium"
                        style={{ color: accentColor }}
                    >
                        Certifications
                    </h2>

                    <div className="space-y-1.5 text-gray-700 text-sm">
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
                        className="text-sm uppercase tracking-widest mb-3 font-medium"
                        style={{ color: accentColor }}
                    >
                        Skills
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;
