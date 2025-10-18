import { useState } from 'react';
import {
  Loader2,
  Download,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileDiff,
  ClipboardCheck,
  ClipboardList,
  Users,
  ListTodo,
  Wand2,
  LineChart,
  History,
  UserCheck,
  Shield,
  DownloadCloud,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/FileUpload';
import { RiskBadge, type RiskLevel } from '@/components/ui/risk-badge';
import {
  sampleRiskAnalysis,
  reviewBrief,
  versionComparisons,
  complianceChecklist,
  approvalWorkflow,
  reviewActionItems,
  aiRemediationSuggestions,
  counterpartyIntel,
  riskTrend,
  negotiationTimeline,
  reviewerRecommendations,
  playbookCompliance,
  executionChecklist,
  auditExports,
} from '@/lib/mockData';

type ChecklistStatus = 'pass' | 'warning' | 'todo';
type WorkflowStatus = 'complete' | 'in-progress' | 'blocked';
type TaskStatus = 'open' | 'in-progress' | 'blocked';
type TaskPriority = 'high' | 'medium' | 'low';
type ChecklistState = 'open' | 'in-progress' | 'blocked' | 'complete';

const checklistStatusConfig: Record<
  ChecklistStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  pass: {
    label: 'Complete',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  warning: {
    label: 'Pending info',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: AlertTriangle,
  },
  todo: {
    label: 'Action needed',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: AlertCircle,
  },
};

const workflowStatusConfig: Record<
  WorkflowStatus,
  { label: string; dotClass: string; badgeClass: string }
> = {
  complete: {
    label: 'Complete',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'in-progress': {
    label: 'In progress',
    dotClass: 'bg-primary',
    badgeClass: 'bg-primary/10 text-primary border-primary',
  },
  blocked: {
    label: 'Blocked',
    dotClass: 'bg-rose-500',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

const taskPriorityConfig: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  high: {
    label: 'High',
    className: 'bg-destructive/10 text-destructive border-destructive',
  },
  medium: {
    label: 'Medium',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  low: {
    label: 'Low',
    className: 'bg-muted text-muted-foreground border-border',
  },
};

const taskStatusConfig: Record<TaskStatus, { label: string; className: string }> = {
  open: {
    label: 'Open',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  'in-progress': {
    label: 'In progress',
    className: 'bg-primary/10 text-primary border-primary',
  },
  blocked: {
    label: 'Blocked',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

const remediationStatusMap: Record<string, string> = {
  critical: 'border-l-4 border-destructive',
  high: 'border-l-4 border-high',
  medium: 'border-l-4 border-medium',
  low: 'border-l-4 border-low',
};

const executionStatusConfig: Record<
  ChecklistState,
  { label: string; className: string }
> = {
  open: {
    label: 'Open',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  'in-progress': {
    label: 'In progress',
    className: 'bg-primary/10 text-primary border-primary',
  },
  blocked: {
    label: 'Blocked',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  complete: {
    label: 'Complete',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

export default function ReviewContract() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof sampleRiskAnalysis | null>(null);
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [expandedDiffs, setExpandedDiffs] = useState<Set<string>>(new Set());

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload a contract first.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setAnalysis(sampleRiskAnalysis);
      setIsAnalyzing(false);
      toast.success('Contract analysis complete.');
    }, 2500);
  };

  const handleDownloadReport = () => {
    if (!analysis) return;

    const report = `CONTRACT RISK ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

OVERALL RISK: ${analysis.overallRisk.toUpperCase()}
RISK SCORE: ${analysis.score}/100

CATEGORY ANALYSIS:
${analysis.categories
        .map(
          (cat) =>
            `- ${cat.name}: ${cat.status.toUpperCase()} (${cat.issues} ${cat.issues === 1 ? 'issue' : 'issues'})`,
        )
        .join('\n')}

DETAILED ISSUES:
${analysis.issues
        .map(
          (issue, i) => `
${i + 1}. ${issue.title}
   Severity: ${issue.severity.toUpperCase()}
   Category: ${issue.category}

   Description: ${issue.description}

   Recommendation: ${issue.recommendation}
`,
        )
        .join('\n')}`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract_risk_analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded.');
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

  const toggleDiff = (id: string) => {
    setExpandedDiffs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyPosition = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success('Position copied to clipboard.');
      } else {
        toast.success('Position ready to share.');
      }
    } catch (error) {
      toast.error('Unable to copy the position. Please copy manually.');
    }
  };

  const handleTaskReminder = (task: string) => {
    toast.success(`Reminder scheduled for "${task}".`);
  };

  const handleAcceptRemediation = (clause: string) => {
    toast.success(`Applied AI suggestion to ${clause}.`);
  };

  const handleRejectRemediation = (clause: string) => {
    toast.message(`Marked ${clause} for manual rewrite.`);
  };

  const handleExport = (label: string) => {
    toast.success(`${label} export queued.`);
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
    <div className="mx-auto max-w-[1320px] space-y-10">
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card via-primary/5 to-background px-8 py-10 text-foreground shadow-xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-14 h-64 w-64 rounded-full bg-primary/30 blur-[140px]" />
          <div className="absolute -bottom-28 right-12 h-72 w-72 rounded-full bg-primary/20 blur-[160px]" />
        </div>
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-5">
            <Badge variant="outline" className="w-fit border-primary/30 bg-primary/10 text-primary">
              Review workspace
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              AI-assisted legal review built for faster approvals.
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Compare redlines, apply firm-approved remediations, and coordinate partner sign-off
              without leaving the matter. AI keeps risk, compliance, and workflow signals in sync.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => toast.message('AI brief export coming soon.')}
                className="h-11 px-6 text-sm font-semibold shadow-md shadow-primary/25"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI briefing
              </Button>
              <Button
                variant="outline"
                className="h-11 px-5 text-sm font-semibold border-primary/40 bg-background/80 backdrop-blur"
                onClick={() => toast.message('Partner review workflow coming soon.')}
              >
                <Users className="mr-2 h-4 w-4" />
                Request partner review
              </Button>
            </div>
          </div>
          {(
            analysis || playbookCompliance || reviewActionItems.length > 0
          ) && (
            <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  id: 'risk-score',
                  label: 'Current risk score',
                  value: analysis ? analysis.score : '--',
                  caption: analysis ? `Overall ${analysis.overallRisk}` : 'Run analysis to score',
                },
                {
                  id: 'open-issues',
                  label: 'Open issues',
                  value: analysis ? analysis.issues.length : reviewActionItems.length,
                  caption: analysis
                    ? `${analysis.issues.length} flagged clauses`
                    : 'Awaiting first analysis',
                },
                {
                  id: 'compliance',
                  label: 'Playbook alignment',
                  value: `${playbookCompliance.alignment}%`,
                  caption: playbookCompliance.summary,
                },
                {
                  id: 'tasks',
                  label: 'Outstanding tasks',
                  value: reviewActionItems.filter((item) => item.status !== 'complete').length,
                  caption: 'Action items before sign-off',
                },
              ].map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex flex-col gap-2 rounded-lg bg-background/90 p-5 text-left shadow-lg backdrop-blur-sm"
                >
                  <div className="text-xs uppercase tracking-wide text-primary">{highlight.label}</div>
                  <span className="text-2xl font-semibold text-foreground">{highlight.value}</span>
                  <p className="text-xs leading-relaxed text-muted-foreground">{highlight.caption}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="space-y-8">
        <div className="animate-slide-up">
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            onClear={() => {
              setSelectedFile(null);
              setAnalysis(null);
              setExpandedIssues(new Set());
              setExpandedDiffs(new Set());
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

        {analysis && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Overall Risk Assessment
                    </h3>
                    <RiskBadge level={analysis.overallRisk as RiskLevel} />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-foreground">
                      {analysis.score}
                    </div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                  </div>
                </div>

                <Button onClick={handleDownloadReport} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      AI Review Brief
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share a partner-ready summary of opposing changes.
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reviewBrief.overview}
                </p>

                <div className="mt-5 space-y-3">
                  {reviewBrief.topRisks.map((risk) => (
                    <div
                      key={risk.id}
                      className="flex items-start gap-3 p-3 border border-border bg-muted/20"
                    >
                      <RiskBadge level={risk.impact as RiskLevel} className="shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{risk.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {risk.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-foreground">New obligations</h4>
                  <ul className="mt-2 space-y-2">
                    {reviewBrief.newObligations.map((item) => (
                      <li
                        key={item.id}
                        className="text-sm text-muted-foreground leading-relaxed border border-border bg-muted/20 px-3 py-2"
                      >
                        <span className="font-semibold text-foreground">{item.owner}:</span>{' '}
                        {item.detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-foreground">Recommendations</h4>
                  <ul className="mt-2 space-y-2 list-disc list-inside text-sm text-muted-foreground leading-relaxed">
                    {reviewBrief.recommendations.map((recommendation) => (
                      <li key={recommendation}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
                </div>
              </div>

            <div className="bg-card p-6 shadow-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    AI Remediation Suggestions
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Apply firm-approved counter positions and log rationale automatically.
                  </p>
                </div>
                <Wand2 className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {aiRemediationSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`rounded-lg border ${remediationStatusMap[suggestion.severity]} p-5 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{suggestion.clause}</p>
                        <p className="text-xs text-muted-foreground mt-1">{suggestion.summary}</p>
                      </div>
                      <RiskBadge level={suggestion.severity as RiskLevel} />
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Counterparty text
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {suggestion.currentText}
                        </p>
                      </div>
                      <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                          AI proposed response
                        </p>
                        <p className="mt-2 text-sm text-foreground leading-relaxed">
                          {suggestion.proposedText}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {suggestion.rationale}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        className="rounded-lg"
                        onClick={() => handleAcceptRemediation(suggestion.clause)}
                      >
                        Accept suggestion
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => handleRejectRemediation(suggestion.clause)}
                      >
                        Mark for manual rewrite
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 shadow-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Version Comparison & Redlines
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track opposing edits against the firm baseline and prepare responses.
                  </p>
                </div>
                <FileDiff className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {versionComparisons.map((diff) => {
                  const isExpanded = expandedDiffs.has(diff.id);
                  return (
                    <div key={diff.id} className="border border-border bg-muted/20">
                      <button
                        onClick={() => toggleDiff(diff.id)}
                        className="w-full p-4 flex items-start justify-between gap-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-foreground">{diff.clause}</p>
                          <p className="text-xs text-muted-foreground mt-1">{diff.changeType}</p>
                          <p className="text-xs text-primary mt-2">{diff.aiNote}</p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border p-4 grid gap-4 md:grid-cols-2 bg-card/40">
                          <div>
                            <h4 className="text-xs uppercase font-semibold text-muted-foreground">
                              Firm Baseline
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                              {diff.baseline}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase font-semibold text-muted-foreground">
                              Counterparty Proposal
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                              {diff.counterparty}
                            </p>
                          </div>
                          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {diff.firmPosition}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopyPosition(diff.firmPosition)}
                            >
                              Copy position
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Counterparty Intelligence
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Insights from prior negotiations to anticipate next moves.
                    </p>
                  </div>
                  <History className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Deals closed</p>
                    <p className="text-2xl font-semibold text-foreground">{counterpartyIntel.previousDeals}</p>
                    <p className="text-xs text-muted-foreground mt-1">with this counterparty</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Median cycle</p>
                    <p className="text-2xl font-semibold text-foreground">{counterpartyIntel.medianCloseTime}</p>
                    <p className="text-xs text-muted-foreground mt-1">send to signature</p>
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  {counterpartyIntel.clausesFrequentlyContested.map((item) => (
                    <div
                      key={item.clause}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <span className="text-sm font-medium text-foreground">{item.clause}</span>
                      <span className="text-xs font-semibold text-muted-foreground">{item.successRate} success</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  {counterpartyIntel.comments}
                </p>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <h3 className="text-lg font-semibold text-foreground mb-6">Risk Categories</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-4 border border-border bg-muted/30 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(category.status)}
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      {category.issues > 0 && (
                        <span className="text-xs font-semibold px-2 py-1 bg-destructive/10 text-destructive">
                          {category.issues} {category.issues === 1 ? 'issue' : 'issues'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Risk Score Trend</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track improvement across each revision cycle.
                    </p>
                  </div>
                  <LineChart className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {riskTrend.map((point) => (
                    <div key={point.label}>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{point.label}</span>
                        <span className="font-semibold text-foreground">{point.score}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${Math.min(point.score, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Compliance Checklist
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track regulatory and commercial prerequisites before sign-off.
                    </p>
                  </div>
                  <ClipboardCheck className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  {complianceChecklist.map((section) => (
                    <div key={section.section} className="border border-border bg-muted/20">
                      <div className="px-4 py-3 border-b border-border bg-muted/40">
                        <p className="text-sm font-semibold text-foreground">{section.section}</p>
                      </div>
                      <div className="p-4 space-y-3">
                        {section.items.map((item) => {
                          const config = checklistStatusConfig[item.status as ChecklistStatus];
                          const Icon = config.icon;
                          return (
                            <div key={item.id} className="flex items-start gap-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold border ${config.className}`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {config.label}
                              </span>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {item.note}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 shadow-lg border border-border xl:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Negotiation Timeline
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Recent activity across internal, client, and AI stakeholders.
                    </p>
                  </div>
                  <History className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-5">
                  {negotiationTimeline.map((event, index) => {
                    const isLast = index === negotiationTimeline.length - 1;
                    return (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="h-3 w-3 rounded-full bg-primary" />
                          {!isLast && <span className="mt-1 flex-1 w-px bg-border" />}
                        </div>
                        <div className="flex-1 rounded-lg border border-border bg-muted/20 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {event.timestamp}
                            </span>
                            <span className="text-xs text-muted-foreground">{event.channel}</span>
                          </div>
                          <p className="mt-2 text-sm font-semibold text-foreground">{event.actor}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                            {event.summary}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-card p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Detailed Issues ({analysis.issues.length})
              </h3>
              <div className="space-y-4">
                {analysis.issues.map((issue) => {
                  const isExpanded = expandedIssues.has(issue.id);
                  return (
                    <div
                      key={issue.id}
                      className="border border-border overflow-hidden transition-all"
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
                            <h5 className="text-sm font-semibold text-foreground mb-2">
                              Description
                            </h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {issue.description}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-foreground mb-2">
                              Recommendation
                            </h5>
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

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Approval Workflow
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track internal sign-offs and dependencies before client delivery.
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="space-y-5">
                  {approvalWorkflow.map((step, index) => {
                    const status = workflowStatusConfig[step.status as WorkflowStatus];
                    const isLast = index === approvalWorkflow.length - 1;
                    return (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className={`w-3 h-3 rounded-full ${status.dotClass}`} />
                          {!isLast && <span className="flex-1 w-px bg-border mt-1" />}
                        </div>
                        <div className="flex-1 border border-border bg-muted/20 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {step.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {step.role}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={`border ${status.badgeClass} whitespace-nowrap`}
                            >
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                            {step.notes}
                          </p>
                          <p className="text-xs text-foreground mt-2 font-medium">{step.due || step.completedAt}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Action Items
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Assign follow-ups to close out partner feedback.
                    </p>
                  </div>
                  <ListTodo className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  {reviewActionItems.map((item) => {
                    const priority = taskPriorityConfig[item.priority as TaskPriority];
                    const status = taskStatusConfig[item.status as TaskStatus];
                    return (
                      <div key={item.id} className="border border-border bg-muted/20 p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-foreground">{item.task}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`border ${priority.className}`}>
                              {priority.label}
                            </Badge>
                            <Badge variant="outline" className={`border ${status.className}`}>
                              {status.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                          <span>Owner: {item.owner}</span>
                          <span>{item.due}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="px-0 h-8 text-xs font-semibold text-primary w-fit"
                          onClick={() => handleTaskReminder(item.task)}
                        >
                          Schedule reminder
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Reviewer Recommendations
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Suggested experts based on workload and clause types.
                    </p>
                  </div>
                  <UserCheck className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {reviewerRecommendations.map((reviewer) => (
                    <div
                      key={reviewer.id}
                      className="rounded-lg bg-muted/50 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{reviewer.name}</p>
                          <p className="text-xs text-muted-foreground">{reviewer.practice}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            reviewer.recommended
                              ? 'border-primary/40 bg-primary/10 text-primary'
                              : 'border-border/60 text-muted-foreground'
                          }
                        >
                          {reviewer.recommended ? 'Recommended' : 'Optional'}
                        </Badge>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">{reviewer.availability}</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{reviewer.reason}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="px-0 text-xs font-semibold text-primary"
                        onClick={() => toast.success(`Looped in ${reviewer.name}.`)}
                      >
                        Invite to workspace
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Playbook Compliance
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Alignment with firm guardrails for the current revision.
                    </p>
                  </div>
                  <Shield className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="rounded-lg bg-muted/50 p-5">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Alignment</p>
                  <div className="mt-2 text-3xl font-semibold text-foreground">
                    {playbookCompliance.alignment}%
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min(playbookCompliance.alignment, 100)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {playbookCompliance.summary}
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {playbookCompliance.deviations.map((deviation) => (
                    <div
                      key={deviation.id}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-foreground">{deviation.title}</p>
                        <p className="text-xs text-muted-foreground">{deviation.owner}</p>
                      </div>
                      <RiskBadge level={deviation.impact} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Execution Readiness
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Confirm sign-off prerequisites before moving to signature.
                    </p>
                  </div>
                  <ClipboardList className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {executionChecklist.map((item) => {
                    const status = executionStatusConfig[item.status as ChecklistState];
                    return (
                      <div key={item.id} className="rounded-lg bg-muted/50 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-foreground">{item.item}</p>
                          <Badge variant="outline" className={`border ${status.className}`}>
                            {status.label}
                          </Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">Owner: {item.owner}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-card p-6 shadow-lg rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Export & Evidence
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Package the latest review state for partners, clients, or compliance.
                    </p>
                  </div>
                  <DownloadCloud className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {auditExports.map((exportItem) => (
                    <div key={exportItem.id} className="rounded-lg bg-muted/50 p-4">
                      <p className="text-sm font-semibold text-foreground">{exportItem.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {exportItem.description}
                      </p>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-3 rounded-lg"
                        onClick={() => handleExport(exportItem.label)}
                      >
                        Prepare export
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
