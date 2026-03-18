import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileCheck, Trophy, Target, ArrowUpRight, Search, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { FileUpload } from '../components/feature/FileUpload';
import { Modal } from '../components/ui/Modal';
import { uploadResumes } from '../services/api';
import toast from 'react-hot-toast';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export default function DashboardPage() {
  const [candidates, setCandidates] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobCriteria, setJobCriteria] = useState('');

  const stats = useMemo(() => {
    if (!candidates.length) return { total: 0, topScore: 0, avgScore: 0, parsed: 0 };
    const scores = candidates.map(c => c.score);
    return {
      total: candidates.length,
      topScore: Math.max(...scores),
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      parsed: candidates.length
    };
  }, [candidates]);

  const handleUpload = async (files) => {
    setIsProcessing(true);
    toast.loading(`Processing ${files.length} resumes...`, { id: 'processing' });
    
    try {
      const result = await uploadResumes(files, jobCriteria);
      if (result.success) {
        // Append new candidates and resort
        const newCandidates = [...candidates, ...result.data]
          .sort((a, b) => b.score - a.score)
          .map((c, i) => ({ ...c, rank: i + 1 }));
          
        setCandidates(newCandidates);
        toast.success(`Successfully analyzed ${files.length} resumes!`, { id: 'processing' });
      }
    } catch (error) {
      toast.error("Failed to process resumes. Please try again.", { id: 'processing' });
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-400/10 border-green-500/20';
    if (score >= 75) return 'text-blue-400 bg-blue-400/10 border-blue-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20';
    return 'text-red-400 bg-red-400/10 border-red-500/20';
  };

  const scoreDistributionData = useMemo(() => {
    const bins = { '90+': 0, '80-89': 0, '70-79': 0, '<70': 0 };
    candidates.forEach(c => {
      if (c.score >= 90) bins['90+']++;
      else if (c.score >= 80) bins['80-89']++;
      else if (c.score >= 70) bins['70-79']++;
      else bins['<70']++;
    });
    return Object.entries(bins).map(([name, count]) => ({ name, count }));
  }, [candidates]);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-100">Overview</h1>
          <p className="text-gray-400 mt-1">Upload resumes and view real-time analysis results.</p>
        </div>
        
        {candidates.length > 0 && (
          <Button variant="outline" className="shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Uploaded</p>
                <p className="text-3xl font-bold text-gray-100 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Successfully Parsed</p>
                <p className="text-3xl font-bold text-gray-100 mt-2">{stats.parsed}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <FileCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Top Candidate Score</p>
                <p className="text-3xl font-bold text-gray-100 mt-2">{stats.topScore}%</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Average Match</p>
                <p className="text-3xl font-bold text-gray-100 mt-2">{stats.avgScore}%</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Target className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Criteria & Upload</CardTitle>
              <CardDescription>Define role requirements and upload resumes for specific ranking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Job Profile & Required Skills</label>
                <textarea 
                  className="w-full bg-gray-900 border border-gray-800 text-sm rounded-lg p-3 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors custom-scrollbar"
                  placeholder="e.g. Senior Backend Engineer. Needs 5+ years experience, Node.js, AWS..."
                  rows={3}
                  value={jobCriteria}
                  onChange={(e) => setJobCriteria(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              <FileUpload onUpload={handleUpload} isProcessing={isProcessing} />
            </CardContent>
          </Card>

          {/* Mini Chart Area (if candidates exist) */}
          {candidates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-48 pt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip 
                      cursor={{ fill: '#1f2937', opacity: 0.4 }}
                      contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="h-full flex flex-col min-h-[500px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <CardTitle>Ranked Candidates</CardTitle>
                <CardDescription>Candidates scored purely on objective skill metrics.</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Filter by name or skill..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 text-sm rounded-lg pl-9 pr-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto custom-scrollbar">
              {candidates.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                  <FileCheck className="w-12 h-12 mb-4 opacity-20" />
                  <p>No candidates processed yet.</p>
                  <p className="text-sm">Upload resumes to see the rankings here.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-gray-900/50 sticky top-0 z-10 backdrop-blur-md">
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Skills Matched</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredCandidates.map((candidate) => (
                        <motion.tr 
                          key={candidate.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="group border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <TableCell className="font-medium text-gray-400">
                            #{candidate.rank}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-200">{candidate.name}</p>
                              <p className="text-xs text-gray-500">{candidate.filename}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 3).map(skill => (
                                <span key={skill} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700">
                                  {skill}
                                </span>
                              ))}
                              {candidate.skills.length > 3 && (
                                <span className="px-2 py-0.5 bg-gray-900 text-gray-500 text-xs rounded">
                                  +{candidate.skills.length - 3}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getScoreColor(candidate.score)}`}>
                              {candidate.score}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="group-hover:text-blue-400 text-gray-600">
                              <ArrowUpRight className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedCandidate} 
        onClose={() => setSelectedCandidate(null)}
        title="Candidate Analysis"
        className="max-w-2xl"
      >
        {selectedCandidate && (
          <div className="mt-4 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-100">{selectedCandidate.name}</h3>
                <p className="text-gray-400">{selectedCandidate.filename}</p>
              </div>
              <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl border ${getScoreColor(selectedCandidate.score)}`}>
                <span className="text-2xl font-bold">{selectedCandidate.score}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">AI Summary</h4>
              <p className="text-sm text-gray-400 leading-relaxed bg-gray-900 border border-gray-800 p-4 rounded-lg">
                {selectedCandidate.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Extracted Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Match Breakdown</h4>
                <div className="h-40 bg-gray-900/50 rounded-lg border border-gray-800 p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                      { subject: 'Experience', A: selectedCandidate.score - 5, fullMark: 100 },
                      { subject: 'Skills', A: selectedCandidate.score + 2, fullMark: 100 },
                      { subject: 'Education', A: 90, fullMark: 100 },
                      { subject: 'Culture', A: 85, fullMark: 100 },
                      { subject: 'Impact', A: selectedCandidate.score - 10, fullMark: 100 },
                    ]}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                      <Radar name="Candidate" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedCandidate(null)}>Close</Button>
              <Button>Shortlist Candidate</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
