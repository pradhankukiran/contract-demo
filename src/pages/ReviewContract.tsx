import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/FileUpload';
import { RiskBadge, RiskLevel } from '@/components/ui/risk-badge';
import { sampleRiskAnalysis } from '@/lib/mockData';
import { Loader2, Download, AlertCircle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewContract() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof sampleRiskAnalysis | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload a contract first');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API delay
    setTimeout(() => {
      setAnalysis(sampleRiskAnalysis);
      setIsAnalyzing(false);
      toast.success('Contract analysis complete!');
    }, 2500);
  };

  const handleDownloadReport = () => {
    if (!analysis) return;
    
    const report = `CONTRACT RISK ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

OVERALL RISK: ${analysis.overallRisk.toUpperCase()}
RISK SCORE: ${analysis.score}/100

CATEGORY ANALYSIS:
${analysis.categories.map(cat => `- ${cat.name}: ${cat.status.toUpperCase()} (${cat.issues} issues)`).join('\n')}

DETAILED ISSUES:
${analysis.issues.map((issue, i) => `
${i + 1}. ${issue.title}
   Severity: ${issue.severity.toUpperCase()}
   Category: ${issue.category}
   
   Description: ${issue.description}
   
   Recommendation: ${issue.recommendation}
`).join('\n')}`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract_risk_analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded!');
  };

  const toggleIssue = (id: string) => {
    setExpandedIssues((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getCategoryIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-5 h-5 text-low" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-medium" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-critical" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground mb-2">Review Contract</h2>
        <p className="text-muted-foreground">
          Upload a contract to analyze risks and identify potential issues
        </p>
      </div>

      <div className="space-y-8">
        {/* Upload Section */}
        <div className="animate-slide-up">
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            onClear={() => {
              setSelectedFile(null);
              setAnalysis(null);
            }}
          />

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="h-12 px-8 text-base font-semibold"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Contract...
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Analyze Contract
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6 animate-fade-in">
            {/* Overall Risk Score */}
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Overall Risk Assessment</h3>
                  <RiskBadge level={analysis.overallRisk as RiskLevel} />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-foreground">{analysis.score}</div>
                  <div className="text-sm text-muted-foreground">Risk Score</div>
                </div>
              </div>

              <Button onClick={handleDownloadReport} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
            </div>

            {/* Category Checklist */}
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Risk Categories</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analysis.categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(category.status)}
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    {category.issues > 0 && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                        {category.issues} {category.issues === 1 ? 'issue' : 'issues'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Issues */}
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Detailed Issues ({analysis.issues.length})
              </h3>
              <div className="space-y-4">
                {analysis.issues.map((issue) => {
                  const isExpanded = expandedIssues.has(issue.id);
                  return (
                    <div
                      key={issue.id}
                      className="border border-border rounded-lg overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleIssue(issue.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start gap-3 text-left flex-1">
                          <RiskBadge level={issue.severity} className="mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{issue.title}</h4>
                            <p className="text-sm text-muted-foreground">{issue.category}</p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-4 border-t border-border bg-muted/20">
                          <div className="pt-4">
                            <h5 className="text-sm font-semibold text-foreground mb-2">Description</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {issue.description}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-foreground mb-2">Recommendation</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {issue.recommendation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
