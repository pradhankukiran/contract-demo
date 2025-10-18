import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  Download,
  Loader2,
  FileText,
  Sparkles,
  ShieldCheck,
  ClipboardList,
  Target,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  Timer,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { SelectField } from '@/components/ui/select-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { Badge } from '@/components/ui/badge';
import { RiskBadge, type RiskLevel } from '@/components/ui/risk-badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ContractEditor } from '@/components/ContractEditor';
import { cn } from '@/lib/utils';
import {
  contractTemplates,
  draftClauseLibrary,
  draftInsights,
  draftPlaybook,
  prebuiltDrafts,
  sampleContract,
} from '@/lib/mockData';

const riskProfiles = [
  { value: 'standard', label: 'Standard · Follow playbook' },
  { value: 'growth', label: 'Growth · Faster close, higher flexibility' },
  { value: 'conservative', label: 'Conservative · Minimize exposure' },
];

const riskProfileLabels = Object.fromEntries(
  riskProfiles.map((profile) => [profile.value, profile.label]),
);

type RiskStatus = 'pass' | 'warning' | 'action';

const riskStatusConfig: Record<
  RiskStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  pass: {
    label: 'Ready',
    className: 'border-emerald-200 bg-emerald-500/10 text-emerald-700',
    icon: CheckCircle2,
  },
  warning: {
    label: 'Needs review',
    className: 'border-amber-300 bg-amber-500/10 text-amber-800',
    icon: AlertTriangle,
  },
  action: {
    label: 'Missing',
    className: 'border-rose-300 bg-rose-500/10 text-rose-700',
    icon: AlertCircle,
  },
};

const guardrailTone: Record<RiskStatus, string> = {
  pass: 'border-emerald-200 bg-emerald-50',
  warning: 'border-amber-300 bg-amber-50',
  action: 'border-rose-300 bg-rose-50',
};

const playbookStatusConfig: Record<string, { label: string; className: string }> = {
  'in-progress': {
    label: 'In progress',
    className: 'border-primary bg-primary/10 text-primary',
  },
  pending: {
    label: 'Pending input',
    className: 'border-amber-400 bg-amber-500/10 text-amber-800',
  },
  upcoming: {
    label: 'Queued',
    className: 'border-border bg-muted/50 text-muted-foreground',
  },
};

const clauseAccent: Record<RiskLevel, string> = {
  critical: 'border-l-4 border-destructive',
  high: 'border-l-4 border-high',
  medium: 'border-l-4 border-medium',
  low: 'border-l-4 border-low',
};

export default function DraftContract() {
  const [formData, setFormData] = useState({
    contractType: 'service',
    clientName: '',
    industry: '',
    firstParty: '',
    secondParty: '',
    termDuration: '',
    businessPurpose: '',
    governingLaw: '',
    riskProfile: 'standard',
    negotiationFocus: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState('');
  const [insertedClauses, setInsertedClauses] = useState<Set<string>>(() => new Set());

  const selectedTemplate = useMemo(
    () => contractTemplates.find((template) => template.value === formData.contractType),
    [formData.contractType],
  );

  const selectedRiskProfile = useMemo(
    () => riskProfiles.find((profile) => profile.value === formData.riskProfile),
    [formData.riskProfile],
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.clientName || !formData.firstParty || !formData.secondParty) {
      toast.error('Please populate the matter parties before generating a draft.');
      return;
    }

    setIsGenerating(true);
    setInsertedClauses(new Set());

    setTimeout(() => {
      const plainContract = sampleContract
        .replace(/\[DATE\]/g, new Date().toLocaleDateString())
        .replace(/\[First Party Name\]/g, formData.firstParty)
        .replace(/\[Second Party Name\]/g, formData.secondParty)
        .replace(/\[industry\]/g, formData.industry || 'general services')
        .replace(/\[business purpose\]/g, formData.businessPurpose || 'professional services')
        .replace(/\[Term Duration\]/g, formData.termDuration || '12 months');

      // Convert plain text to HTML
      const htmlContract = plainContract
        .split('\n\n')
        .map(paragraph => {
          const trimmed = paragraph.trim();
          if (!trimmed) return '';

          // Check if it's a title (all caps or starts with number)
          if (trimmed === trimmed.toUpperCase() && trimmed.length < 100) {
            return `<h2>${trimmed}</h2>`;
          }

          return `<p>${trimmed}</p>`;
        })
        .join('');

      setGeneratedContract(htmlContract);
      setIsGenerating(false);
      toast.success('Contract generated successfully.');
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedContract) {
      toast.error('Generate the contract before downloading.');
      return;
    }

    const filename = formData.clientName
      ? `${formData.clientName.replace(/\s+/g, '_')}_contract.html`
      : 'contract_draft.html';

    // Create a styled HTML document
    const styledHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${formData.clientName || 'Contract'}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      max-width: 8.5in;
      margin: 1in auto;
      padding: 0;
      line-height: 1.6;
      color: #000;
    }
    h1 { font-size: 18pt; font-weight: bold; margin-top: 24pt; margin-bottom: 12pt; }
    h2 { font-size: 16pt; font-weight: bold; margin-top: 18pt; margin-bottom: 10pt; }
    h3 { font-size: 14pt; font-weight: bold; margin-top: 14pt; margin-bottom: 8pt; }
    p { margin-bottom: 12pt; text-align: justify; }
    ul, ol { margin-left: 1.5in; margin-bottom: 12pt; }
    li { margin-bottom: 6pt; }
    strong { font-weight: bold; }
    em { font-style: italic; }
    u { text-decoration: underline; }
  </style>
</head>
<body>
  ${generatedContract}
</body>
</html>`;

    const blob = new Blob([styledHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Contract downloaded.');
  };

  const handleInsertClause = (clauseId: string, title: string, text: string) => {
    if (!generatedContract) {
      toast.error('Generate the base draft before inserting clauses.');
      return;
    }

    setGeneratedContract((prev) => {
      const clauseHTML = `<h2>${title.toUpperCase()}</h2><p>${text}</p>`;
      // Check if clause already exists
      if (prev.includes(title.toUpperCase())) {
        return prev;
      }
      return prev + clauseHTML;
    });

    setInsertedClauses((prev) => {
      const next = new Set(prev);
      next.add(clauseId);
      return next;
    });

    toast.success(`${title} clause inserted into the draft.`);
  };

  const handleLoadPrebuiltDraft = (
    template: (typeof prebuiltDrafts)[number],
  ) => {
    setFormData((prev) => ({
      ...prev,
      ...template.formDefaults,
    }));

    // Convert plain text contract to HTML
    const htmlContract = template.contract
      .split('\n\n')
      .map(paragraph => {
        const trimmed = paragraph.trim();
        if (!trimmed) return '';

        // Check if it's a title (all caps or starts with number)
        if (trimmed === trimmed.toUpperCase() && trimmed.length < 100) {
          return `<h2>${trimmed}</h2>`;
        }

        return `<p>${trimmed}</p>`;
      })
      .join('');

    setGeneratedContract(htmlContract);
    setInsertedClauses(new Set());
    toast.success(`${template.name} loaded into the draft preview.`);
  };

  const riskChecks = [
    {
      id: 'party-identification',
      label: 'Legal entities captured',
      status:
        formData.firstParty && formData.secondParty && formData.clientName
          ? ('pass' as RiskStatus)
          : ('action' as RiskStatus),
      detail: 'Record exact legal names and signatories for enforcement-ready execution.',
    },
    {
      id: 'term',
      label: 'Term structured',
      status: formData.termDuration ? ('pass' as RiskStatus) : ('warning' as RiskStatus),
      detail: 'Anchor initial term and renewal cadence before the draft leaves the firm.',
    },
    {
      id: 'purpose',
      label: 'Purpose documented',
      status: formData.businessPurpose ? ('pass' as RiskStatus) : ('warning' as RiskStatus),
      detail: 'Clarity on scope informs confidentiality, IP ownership, and insurance thresholds.',
    },
    {
      id: 'liability-cap',
      label: 'Liability guardrail',
      status: insertedClauses.has('liability-cap') ? ('pass' as RiskStatus) : ('action' as RiskStatus),
      detail: 'Drop in the firm-standard limitation of liability clause prior to partner review.',
    },
  ];

  const totalChecks = riskChecks.length;
  const completedChecks = riskChecks.filter((check) => check.status === 'pass').length;
  const readiness = totalChecks ? Math.round((completedChecks / totalChecks) * 100) : 0;

  const riskProfileLabel = selectedRiskProfile?.label ?? riskProfiles[0].label;
  const [riskHeadline, riskNarrative] = riskProfileLabel.split(' · ');
  const inProgressStep = draftPlaybook.find((step) => step.status === 'in-progress');
  const nextStep = draftPlaybook.find((step) => step.status === 'pending' || step.status === 'upcoming');
  const highlightedStep = inProgressStep ?? nextStep ?? draftPlaybook[0];

  const heroHighlights = [
    {
      id: 'readiness',
      label: 'Readiness score',
      value: `${readiness}%`,
      caption: `${completedChecks}/${totalChecks} guardrails satisfied`,
      icon: ShieldCheck,
    },
    {
      id: 'risk-profile',
      label: 'Risk posture',
      value: riskHeadline ?? 'Standard',
      caption: riskNarrative ?? 'Follow playbook guardrails',
      icon: Target,
    },
    {
      id: 'milestone',
      label: 'Next milestone',
      value: highlightedStep?.title ?? 'Playbook ready',
      caption: highlightedStep ? `${highlightedStep.owner} • ${highlightedStep.due}` : 'All steps queued',
      icon: ClipboardList,
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-12">
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card via-primary/5 to-background p-10 text-foreground shadow-xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-16 h-64 w-64 rounded-full bg-primary/30 blur-[140px]" />
          <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-primary/20 blur-[160px]" />
        </div>
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-6">
            <Badge variant="outline" className="w-fit border-primary/30 bg-primary/10 text-primary">
              {selectedTemplate?.label ?? 'Service Agreement'}
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Intelligent contract drafting built for deal velocity.
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Align intake, guardrails, and playbooks before the first draft reaches the counterparty.
              Keep partners informed and clients confident with every iteration.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => toast.message('AI brief generation coming soon.')}
                className="h-11 px-6 text-sm font-semibold shadow-md shadow-primary/25"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate negotiation brief
              </Button>
              <Button
                variant="outline"
                className="h-11 px-5 text-sm font-semibold border-primary/40 bg-background/80 backdrop-blur"
                onClick={() =>
                  toast.message('Partner review scheduling will be available soon.')
                }
              >
                <Timer className="mr-2 h-4 w-4" />
                Schedule partner review
              </Button>
            </div>
          </div>
          <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heroHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={highlight.id}
                  className="flex flex-col gap-2 rounded-lg bg-background/90 p-5 text-left shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                    <Icon className="h-4 w-4" />
                    {highlight.label}
                  </div>
                  <span className="text-2xl font-semibold text-foreground">{highlight.value}</span>
                  <p className="text-xs leading-relaxed text-muted-foreground">{highlight.caption}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          <div className="rounded-xl bg-card p-8 shadow-lg">
            <div className="flex flex-col gap-2 border-b border-border pb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Guided intake
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-foreground">Configure the brief</h2>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                  {readiness}% ready
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Capture the commercial context once—AI, partners, and clients stay aligned from the first draft.
              </p>
            </div>

            <Accordion
              type="multiple"
              defaultValue={['overview', 'parties', 'strategy']}
              className="mt-6 space-y-3"
            >
              <AccordionItem
                value="overview"
                className="rounded-lg border-none bg-muted/50 px-4 overflow-visible"
              >
                <AccordionTrigger className="text-left text-base font-semibold leading-tight">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Step 01
                    </span>
                    Matter overview
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0">
                  <div className="grid gap-5 border-t border-border/30 pt-6 px-2 md:grid-cols-2">
                    <SelectField
                      label="Contract Type"
                      options={contractTemplates}
                      value={formData.contractType}
                      onChange={(e) => handleChange('contractType', e.target.value)}
                    />
                    <InputField
                      label="Client Name *"
                      placeholder="Acme Corporation"
                      value={formData.clientName}
                      onChange={(e) => handleChange('clientName', e.target.value)}
                    />
                    <InputField
                      label="Industry"
                      placeholder="Technology, Healthcare, Finance..."
                      value={formData.industry}
                      onChange={(e) => handleChange('industry', e.target.value)}
                    />
                    <InputField
                      label="Governing Law"
                      placeholder="Delaware, England & Wales..."
                      value={formData.governingLaw}
                      onChange={(e) => handleChange('governingLaw', e.target.value)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="parties"
                className="rounded-lg border-none bg-muted/50 px-4 overflow-visible"
              >
                <AccordionTrigger className="text-left text-base font-semibold leading-tight">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Step 02
                    </span>
                    Parties & commercial terms
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0">
                  <div className="grid gap-5 border-t border-border/30 pt-6 px-2 md:grid-cols-2">
                    <InputField
                      label="First Party (Provider) *"
                      placeholder="Your Company Name"
                      value={formData.firstParty}
                      onChange={(e) => handleChange('firstParty', e.target.value)}
                    />
                    <InputField
                      label="Second Party (Client) *"
                      placeholder="Client Company Name"
                      value={formData.secondParty}
                      onChange={(e) => handleChange('secondParty', e.target.value)}
                    />
                    <InputField
                      label="Term Duration"
                      placeholder="12 months, 2 years, etc."
                      value={formData.termDuration}
                      onChange={(e) => handleChange('termDuration', e.target.value)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="strategy"
                className="rounded-lg border-none bg-muted/50 px-4 overflow-visible"
              >
                <AccordionTrigger className="text-left text-base font-semibold leading-tight">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Step 03
                    </span>
                    Strategy & scope
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0">
                  <div className="grid gap-5 border-t border-border/30 pt-6 px-2 md:grid-cols-2">
                    <SelectField
                      label="Risk Profile"
                      options={riskProfiles}
                      value={formData.riskProfile}
                      onChange={(e) => handleChange('riskProfile', e.target.value)}
                    />
                    <div className="md:col-span-2">
                      <TextareaField
                        label="Key Negotiation Focus"
                        placeholder="List critical concessions, deal-breakers, or regulatory concerns."
                        value={formData.negotiationFocus}
                        onChange={(e) => handleChange('negotiationFocus', e.target.value)}
                        rows={formData.negotiationFocus ? 4 : 3}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <TextareaField
                        label="Business Purpose"
                        placeholder="Describe the purpose and scope of this agreement..."
                        value={formData.businessPurpose}
                        onChange={(e) => handleChange('businessPurpose', e.target.value)}
                        rows={5}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="h-14 w-full rounded-lg text-base font-semibold shadow-lg shadow-primary/25"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Contract...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Contract
                  </>
                )}
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Drafts stay private to this workspace. AI guardrails run instantly once the base agreement is ready.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-card p-8 shadow-lg">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Prebuilt agreements
                </p>
                <h3 className="text-xl font-semibold text-foreground">Launch-ready contracts</h3>
                <p className="text-sm text-muted-foreground">
                  Start from a production-tested draft tuned for common client scenarios.
                </p>
              </div>
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                {prebuiltDrafts.length} available
              </Badge>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {prebuiltDrafts.map((template) => (
                <div
                  key={template.id}
                  className="flex flex-col gap-4 rounded-lg bg-muted/50 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{template.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{template.industry}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                      {template.readiness}% ready
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{template.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.highlights.map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span>{template.updated}</span>
                    <span>
                      Loads risk profile:{' '}
                      <span className="font-medium text-foreground">
                        {riskProfileLabels[template.formDefaults.riskProfile] ??
                          template.formDefaults.riskProfile}
                      </span>
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full rounded-lg"
                    onClick={() => handleLoadPrebuiltDraft(template)}
                  >
                    Use this draft
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {generatedContract && (
            <>
              <div className="overflow-hidden rounded-xl bg-card shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/50 px-8 py-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Generated contract
                    </p>
                    <h3 className="text-xl font-semibold text-foreground">
                      {formData.clientName || 'Untitled matter'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Based on {selectedTemplate?.label ?? 'Service Agreement'}
                    </p>
                  </div>
                  <Button onClick={handleDownload} variant="outline" className="h-10 rounded-lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <ContractEditor
                  content={generatedContract}
                  onChange={setGeneratedContract}
                  editable={true}
                  placeholder="Your contract will appear here..."
                />
              </div>

              <div className="rounded-xl bg-card p-8 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">AI Draft Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Ready-to-share obligations, checkpoints, and negotiation emphasis.
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {draftInsights.summary}
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {draftInsights.obligations.map((obligation) => (
                    <div
                      key={obligation.party}
                      className="rounded-lg bg-muted/50 p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {obligation.party}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {obligation.items.map((item) => (
                          <li key={item} className="leading-relaxed">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Negotiation flags</h4>
                  {draftInsights.negotiationFlags.map((flag) => (
                    <div
                      key={flag.id}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"
                    >
                      <RiskBadge level={flag.level as RiskLevel} className="shrink-0" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{flag.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24">
          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Matter snapshot
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {formData.clientName || 'Awaiting client'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Counterparty: {formData.secondParty || 'Pending input'}
                </p>
              </div>
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 text-sm text-muted-foreground">
              <div className="flex flex-col rounded-lg bg-muted/50 p-4">
                <dt className="text-xs uppercase tracking-widest">Contract type</dt>
                <dd className="mt-1 text-foreground">
                  {selectedTemplate?.label ?? 'Service Agreement'}
                </dd>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-4">
                <dt className="text-xs uppercase tracking-widest">Term</dt>
                <dd className="mt-1 text-foreground">{formData.termDuration || 'Not set'}</dd>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-4">
                <dt className="text-xs uppercase tracking-widest">Governing law</dt>
                <dd className="mt-1 text-foreground">{formData.governingLaw || 'Not set'}</dd>
              </div>
              <div className="flex flex-col rounded-lg bg-muted/50 p-4">
                <dt className="text-xs uppercase tracking-widest">Risk profile</dt>
                <dd className="mt-1 text-foreground">
                  {selectedRiskProfile?.label ?? 'Standard · Follow playbook'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Guardrails
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">AI readiness scan</h3>
              </div>
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-5 space-y-3">
              {riskChecks.map((check) => {
                const config = riskStatusConfig[check.status];
                const Icon = config.icon;
                return (
                  <div
                    key={check.id}
                    className={cn(
                      'rounded-lg border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md',
                      guardrailTone[check.status],
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold',
                        config.className,
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </span>
                    <p className="mt-2 text-sm font-medium text-foreground">{check.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{check.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Playbook
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Workflow checkpoints</h3>
              </div>
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-5 space-y-5">
              {draftPlaybook.map((step, index) => {
                const status = playbookStatusConfig[step.status] ?? playbookStatusConfig.upcoming;
                const isLast = index === draftPlaybook.length - 1;
                return (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="h-3 w-3 rounded-full bg-primary" />
                      {!isLast && <span className="mt-1 flex-1 w-px bg-border" />}
                    </div>
                    <div className="flex-1 rounded-lg bg-muted/50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{step.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {step.owner} • {step.due}
                          </p>
                        </div>
                        <Badge variant="outline" className={cn('border', status.className)}>
                          {status.label}
                        </Badge>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
                        {step.guidance.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                      {step.escalation && (
                        <p className="mt-3 text-xs font-semibold text-primary">
                          Escalation: {step.escalation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Clause library
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">Firm-approved language</h3>
                <p className="text-sm text-muted-foreground">
                  Drop in standard or fallback clauses without leaving the workspace.
                </p>
              </div>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-6 space-y-4">
              {draftClauseLibrary.map((clause) => (
                <div
                  key={clause.id}
                  className={cn(
                    'rounded-lg bg-muted/50 p-5 transition-all hover:-translate-y-1 hover:shadow-md',
                    clauseAccent[clause.riskLevel as RiskLevel],
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{clause.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {clause.standardText}
                      </p>
                    </div>
                    <RiskBadge level={clause.riskLevel as RiskLevel} className="shrink-0" />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {clause.triggers.map((trigger) => (
                      <Badge key={trigger} variant="outline" className="text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-3 rounded-lg bg-background/50 p-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">Fallback:</span> {clause.fallbackText}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-lg"
                      onClick={() => handleInsertClause(clause.id, clause.title, clause.standardText)}
                      disabled={insertedClauses.has(clause.id)}
                    >
                      {insertedClauses.has(clause.id) ? (
                        'Inserted'
                      ) : (
                        <>
                          Insert clause
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    {!generatedContract && (
                      <span className="text-xs text-muted-foreground">
                        Generate draft to enable clause insertion.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
