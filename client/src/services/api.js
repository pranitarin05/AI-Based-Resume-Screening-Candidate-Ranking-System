// Mock Service for Resume Processing
export const uploadResumes = async (files, jobCriteria) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults = files.map((file, index) => {
        // Generate a random base score. Boost if criteria is provided.
        const baseScore = Math.floor(Math.random() * (98 - 60 + 1) + 60);
        const score = jobCriteria && jobCriteria.trim().length > 0 
          ? Math.min(99, baseScore + Math.floor(Math.random() * 10)) 
          : baseScore;
        
        // Mock skills based on realistic resume patterns
        const mockSkillsSets = [
          ['React', 'Node.js', 'TypeScript', 'AWS'],
          ['Python', 'Django', 'PostgreSQL', 'Docker'],
          ['JavaScript', 'CSS', 'HTML', 'Figma'],
          ['Java', 'Spring Boot', 'MySQL', 'Kubernetes'],
          ['Go', 'gRPC', 'Redis', 'Kafka']
        ];
        
        // Generate mock names based on the file name or generic
        const nameMatch = file.name.match(/^([a-zA-Z]+)[_-]?([a-zA-Z]*)/);
        const candidateName = nameMatch && nameMatch[1] 
          ? `${nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1)} ${nameMatch[2] ? nameMatch[2].charAt(0).toUpperCase() + nameMatch[2].slice(1) : ''}`
          : `Candidate ${Math.floor(Math.random() * 1000)}`;

        return {
          id: `cand_${Date.now()}_${index}`,
          name: candidateName.trim(),
          filename: file.name,
          score,
          matchPercentage: score + Math.floor(Math.random() * 5),
          skills: mockSkillsSets[Math.floor(Math.random() * mockSkillsSets.length)],
          summary: jobCriteria && jobCriteria.trim().length > 0
            ? `Strong match for the provided job criteria. Candidate shows relevant experience aligned with real-world requirements for this role.`
            : "Experienced software engineer with a strong background in developing scalable web applications and microservices architecture.",
        };
      });

      // Sort by score descending
      mockResults.sort((a, b) => b.score - a.score);
      
      // Assign ranks after sorting
      mockResults.forEach((res, i) => {
        res.rank = i + 1;
      });

      resolve({
        success: true,
        data: mockResults
      });
    }, 2500); // Simulate 2.5s processing time
  });
};
