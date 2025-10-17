export const contractTemplates = [
  { value: 'service', label: 'Service Agreement' },
  { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
  { value: 'licensing', label: 'Licensing Agreement' },
  { value: 'partnership', label: 'Partnership Agreement' },
];

export const draftPlaybook = [
  {
    id: 'intake',
    title: 'Matter Intake',
    owner: 'Associate',
    status: 'in-progress',
    due: 'Before drafting',
    guidance: [
      'Confirm client legal entities and signatories.',
      'Capture governing law and preferred dispute venue.',
      'Document any pre-agreed commercial concessions from sales or client success.',
    ],
  },
  {
    id: 'guardrails',
    title: 'Policy Guardrails',
    owner: 'Risk',
    status: 'pending',
    due: 'Prior to partner review',
    guidance: [
      'Run automated playbook checks for liability, privacy, and insurance thresholds.',
      'Escalate if counterparty requests deviation from firm standard clauses.',
    ],
    escalation: 'Partner approval required for liability caps above 2x annual fees.',
  },
  {
    id: 'partner-review',
    title: 'Partner Review',
    owner: 'Partner',
    status: 'upcoming',
    due: 'Before release to client',
    guidance: [
      'Summarize major deviations and open issues.',
      'Prepare fallback positions aligned with practice group playbook.',
    ],
  },
  {
    id: 'client-hand-off',
    title: 'Client Hand-Off',
    owner: 'Client Success',
    status: 'upcoming',
    due: 'Post approval',
    guidance: [
      'Share execution-ready draft and negotiation brief with client GC.',
      'Log assumptions and outstanding questions in matter workspace.',
    ],
  },
];

export const draftClauseLibrary = [
  {
    id: 'data-security',
    title: 'Data Security and Privacy',
    riskLevel: 'high',
    standardText:
      'Service Provider shall implement and maintain industry-standard administrative, physical, and technical safeguards (including ISO 27001-aligned controls) to protect Client Data. Breach notification shall occur within seventy-two (72) hours of discovery.',
    fallbackText:
      'If counterparty refuses ISO 27001 alignment, require SOC 2 Type II certification and annual penetration testing attestation delivered to Client.',
    triggers: ['Personal data processing', 'Cross-border transfers', 'Regulated industries'],
  },
  {
    id: 'liability-cap',
    title: 'Liability Cap',
    riskLevel: 'critical',
    standardText:
      'Each Party\'s aggregate liability under this Agreement shall not exceed the fees paid or payable under this Agreement in the twelve (12) months preceding the claim, excluding liability for gross negligence, willful misconduct, or infringement.',
    fallbackText:
      'Offer a 1.5x fees cap if counterparty provides reciprocal uncapped IP indemnity and adds service credits for SLA breaches.',
    triggers: ['Unlimited liability request', 'Mission critical systems'],
  },
  {
    id: 'service-levels',
    title: 'Service Levels and Remedies',
    riskLevel: 'medium',
    standardText:
      'Provider shall maintain 99.5% monthly uptime. Repeated failure to meet service levels for two consecutive months shall permit Client to terminate for cause and receive a pro-rated refund.',
    fallbackText:
      'If counterparty requests lower uptime, ensure service credits escalate and termination right remains after third consecutive miss.',
    triggers: ['Managed services', 'Mission critical workloads'],
  },
  {
    id: 'data-residency',
    title: 'Data Residency',
    riskLevel: 'medium',
    standardText:
      'Client Data shall be stored and processed solely within the United States unless Client provides written consent for alternative jurisdictions meeting equivalent safeguards.',
    fallbackText:
      'If global deployment required, enumerate approved regions and oblige Provider to notify Client thirty (30) days prior to changes.',
    triggers: ['International operations', 'Personal data'],
  },
];

export const prebuiltDrafts = [
  {
    id: 'enterprise-saas-msa',
    name: 'Enterprise SaaS Master Service Agreement',
    summary:
      'Production-ready MSA for regulated financial services clients with 99.9% uptime commitments and SOC 2 reporting.',
    industry: 'Fintech · North America',
    updated: 'Updated 5 days ago',
    readiness: 92,
    highlights: ['99.9% uptime SLA', 'SOC 2 Type II reporting', 'Liability cap at 12 months fees'],
    formDefaults: {
      contractType: 'service',
      clientName: 'NorthBridge Capital',
      industry: 'Financial Services',
      firstParty: 'CloudFathom Technologies, Inc.',
      secondParty: 'NorthBridge Capital Partners LLC',
      termDuration: '24 months',
      businessPurpose: 'Provision of cloud-based portfolio analytics platform and managed reporting services.',
      governingLaw: 'New York',
      negotiationFocus:
        'Maintain 12-month liability cap; confirm acceptance of SOC 2 Type II reporting cadence; align breach notification at 48 hours.',
      riskProfile: 'standard',
    },
    contract: `ENTERPRISE SAAS MASTER SERVICE AGREEMENT

This Master Service Agreement (the "Agreement") is entered into as of March 1, 2024 (the "Effective Date") by and between:

Provider: CloudFathom Technologies, Inc., a Delaware corporation with principal offices at 1550 Mission Street, San Francisco, CA 94103 ("Provider")

Client: NorthBridge Capital Partners LLC, a New York limited liability company with principal offices at 270 Park Avenue, New York, NY 10017 ("Client")

1. Services and Service Levels

1.1 Scope. Provider shall grant Client access to the CloudFathom portfolio analytics platform and provide related managed reporting services as detailed in Statement of Work #1.

1.2 Availability. Provider shall maintain monthly platform availability of 99.9%. Chronic failure to meet service levels for two (2) consecutive months allows Client to terminate for cause and receive a pro-rated refund of prepaid fees.

1.3 Support. Provider shall offer 24x7 incident response with response times defined in Exhibit B.

2. Data Protection

2.1 Security Program. Provider shall maintain an information security program aligned with SOC 2 Type II requirements and shall provide an annual SOC 2 Type II report within forty-five (45) days of issuance.

2.2 Breach Notification. Provider shall notify Client within forty-eight (48) hours of confirming any Security Incident impacting Client Data.

2.3 Data Residency. Client Data shall be processed within approved AWS regions in the United States unless Client provides prior written consent.

3. Fees and Payment

3.1 Fees. Client shall pay the subscription and managed services fees specified in Exhibit A.

3.2 Payment Terms. All undisputed invoices are due within thirty (30) days of receipt.

4. Intellectual Property

4.1 Ownership. Provider retains ownership of the platform and related IP. Client retains ownership of all Client Data and derived analytics produced for Client.

4.2 License. Provider grants Client a non-exclusive, worldwide license to use the platform during the term.

5. Limitation of Liability

Except for indemnification obligations, breaches of confidentiality, or gross negligence, each Party's aggregate liability shall not exceed the fees paid in the prior twelve (12) months.

6. Term and Termination

This Agreement commences on the Effective Date and continues for twenty-four (24) months, renewing annually unless either Party provides sixty (60) days' written notice.

IN WITNESS WHEREOF, the Parties execute this Agreement as of the Effective Date.`,
  },
  {
    id: 'professional-services-sow',
    name: 'Professional Services Statement of Work',
    summary:
      'Sprint-based implementation SOW for customer success teams delivering onboarding and integration projects.',
    industry: 'SaaS · Global',
    updated: 'Updated 12 days ago',
    readiness: 88,
    highlights: ['Milestone-based billing', 'Change control workflow', 'Shared project tracker'],
    formDefaults: {
      contractType: 'service',
      clientName: 'Helios Analytics',
      industry: 'Technology',
      firstParty: 'Versant Solutions LLC',
      secondParty: 'Helios Analytics Ltd.',
      termDuration: '16 weeks',
      businessPurpose:
        'Delivery of onboarding, configuration, and bespoke data integrations for Helios Analytics global rollout.',
      governingLaw: 'Delaware',
      negotiationFocus:
        'Protect scope boundaries and ensure travel expenses capped at USD 10K; emphasize remote-first delivery.',
      riskProfile: 'growth',
    },
    contract: `PROFESSIONAL SERVICES STATEMENT OF WORK

This Statement of Work ("SOW") is issued pursuant to the Master Services Agreement dated January 5, 2024 between Versant Solutions LLC ("Provider") and Helios Analytics Ltd. ("Client").

1. Project Summary

Provider shall deliver onboarding, configuration, and custom data integrations to enable Client's global deployment of the Versant platform.

2. Deliverables and Timeline

Phase 1 (Weeks 1-4): Discovery workshops, architecture blueprint, integration inventory.
Phase 2 (Weeks 5-10): API integrations, sandbox validation, user acceptance testing.
Phase 3 (Weeks 11-16): Production cutover, hypercare support, knowledge transfer.

3. Fees

Total services fee: USD 180,000, billed 30% upon signature, 40% at Phase 2 completion, 30% at project sign-off. Travel expenses capped at USD 10,000 with Client pre-approval.

4. Change Control

Scope adjustments must be documented via change request form, reviewed within five (5) business days, and priced using the rate card in Exhibit A.

5. Client Responsibilities

Client shall provide subject matter experts, data extracts, and integration sandbox credentials according to the timeline in Appendix 1.

6. Term

This SOW commences on April 8, 2024 and concludes no later than July 26, 2024 unless extended by mutual agreement.

All other terms originate from the Master Services Agreement.`,
  },
  {
    id: 'mutual-nda-shortform',
    name: 'Mutual NDA (Short Form)',
    summary:
      'Two-page mutual confidentiality agreement aligned with EU/US data-sharing requirements and 30-day survival.',
    industry: 'Cross-border · All industries',
    updated: 'Updated 3 weeks ago',
    readiness: 96,
    highlights: ['Mutual obligations', '30-day destruction window', 'GDPR-ready definitions'],
    formDefaults: {
      contractType: 'nda',
      clientName: 'Brightline Ventures',
      industry: 'Venture Capital',
      firstParty: 'Brightline Ventures GmbH',
      secondParty: 'Riverframe Labs, Inc.',
      termDuration: '1 year',
      businessPurpose:
        'Evaluation of potential investment and commercial partnership opportunities in data analytics products.',
      governingLaw: 'England & Wales',
      negotiationFocus:
        'Ensure GDPR Article 28 terms are appended if personal data exchange occurs; confirm destruction timeline acceptance.',
      riskProfile: 'conservative',
    },
    contract: `MUTUAL NON-DISCLOSURE AGREEMENT (SHORT FORM)

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of February 15, 2024 by and between Brightline Ventures GmbH ("Company") and Riverframe Labs, Inc. ("Counterparty").

1. Purpose

The Parties wish to explore a potential investment and strategic partnership. In connection with this evaluation, each Party may disclose Confidential Information.

2. Confidential Information

Confidential Information includes all non-public information disclosed in oral, written, or tangible form related to the exploration, except information that is (a) publicly available without breach; (b) received from a third party without duty of confidentiality; or (c) independently developed without reference to the Confidential Information.

3. Obligations

Each Party shall (i) use the Confidential Information solely to evaluate the Opportunity; (ii) restrict disclosure to representatives with a need to know who are bound by confidentiality obligations; and (iii) protect the Confidential Information with the same degree of care it uses to protect its own similar information, but in no event less than reasonable care.

4. Data Protection

If personal data subject to GDPR or UK GDPR is exchanged, the Parties shall execute the Data Processing Addendum attached as Appendix A prior to the transfer.

5. Term

This Agreement commences on the Effective Date and continues for one (1) year. Confidentiality obligations survive for three (3) years following expiration or termination.

6. Return or Destruction

Upon written request, the receiving Party shall destroy or return Confidential Information within thirty (30) days, except archival copies maintained for legal compliance, which remain protected.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.`,
  },
];

export const draftInsights = {
  summary:
    'Draft establishes a 12-month initial term with mutual confidentiality and ownership transfer of engagement-specific work product. Liability limitations and data handling guardrails still require confirmation.',
  obligations: [
    {
      party: 'First Party',
      items: [
        'Provide onboarding materials within five (5) business days of the Effective Date.',
        'Remit invoices net thirty (30) days with late fees accruing thereafter.',
        'Deliver change requests in writing with ten (10) day review periods.',
      ],
    },
    {
      party: 'Second Party',
      items: [
        'Meet delivery milestones defined in Exhibit A and provide weekly status reports.',
        'Maintain commercial general liability insurance of USD 2M per occurrence.',
        'Notify First Party of security incidents affecting Client Data within seventy-two (72) hours.',
      ],
    },
  ],
  negotiationFlags: [
    {
      id: 'liability',
      level: 'high',
      text: 'Insert explicit liability cap tied to twelve (12) months of fees; current draft lacks monetary limitation.',
    },
    {
      id: 'privacy',
      level: 'medium',
      text: 'Confirm whether personal data will be processed and append the firm-standard Data Processing Addendum if needed.',
    },
    {
      id: 'termination',
      level: 'low',
      text: 'Consider adding mutual termination-for-convenience language if commercial team anticipates short-term pilots.',
    },
  ],
};

export const sampleContract = `PROFESSIONAL SERVICES AGREEMENT

This Professional Services Agreement ("Agreement") is entered into as of [DATE] ("Effective Date") by and between:

FIRST PARTY: [First Party Name]
A [jurisdiction] [entity type] with principal offices at [address]

AND

SECOND PARTY: [Second Party Name]  
A [jurisdiction] [entity type] with principal offices at [address]

(Each a "Party" and collectively, the "Parties")

RECITALS

WHEREAS, First Party is engaged in the business of [business purpose];

WHEREAS, Second Party possesses expertise in [industry] and is desirous of providing services to First Party;

WHEREAS, the Parties wish to establish the terms and conditions pursuant to which Second Party shall provide certain professional services to First Party;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. SCOPE OF SERVICES

1.1 Services. Second Party shall provide to First Party the professional services more particularly described in Exhibit A attached hereto (the "Services").

1.2 Performance Standards. Second Party shall perform the Services in a professional and workmanlike manner, consistent with industry standards and in compliance with all applicable laws, regulations, and professional codes of conduct.

2. TERM AND TERMINATION

2.1 Term. This Agreement shall commence on the Effective Date and shall continue for a period of [Term Duration] (the "Initial Term"), unless earlier terminated in accordance with this Section 2.

2.2 Termination for Convenience. Either Party may terminate this Agreement without cause upon thirty (30) days' prior written notice to the other Party.

2.3 Termination for Cause. Either Party may terminate this Agreement immediately upon written notice if the other Party materially breaches any provision of this Agreement and fails to cure such breach within fifteen (15) days after receiving written notice thereof.

3. COMPENSATION AND PAYMENT TERMS

3.1 Fees. In consideration for the Services, First Party shall pay Second Party the fees set forth in Exhibit B (the "Fees").

3.2 Payment Terms. Unless otherwise specified in Exhibit B, all invoices shall be paid within thirty (30) days of receipt.

3.3 Expenses. First Party shall reimburse Second Party for all reasonable, pre-approved, out-of-pocket expenses incurred in connection with the performance of the Services, provided that such expenses are properly documented.

4. INTELLECTUAL PROPERTY RIGHTS

4.1 Ownership. All work product, deliverables, inventions, and intellectual property created by Second Party in the course of performing the Services (collectively, "Work Product") shall be the sole and exclusive property of First Party.

4.2 Assignment. Second Party hereby assigns to First Party all right, title, and interest in and to the Work Product, including all intellectual property rights therein.

4.3 License Grant. Second Party grants First Party a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and distribute the Work Product.

5. CONFIDENTIALITY

5.1 Confidential Information. Each Party acknowledges that in the course of this Agreement, it may obtain confidential and proprietary information of the other Party ("Confidential Information").

5.2 Non-Disclosure. Each Party agrees to maintain the confidentiality of the other Party's Confidential Information and not to disclose such information to any third party without prior written consent.

5.3 Exceptions. The obligations of confidentiality shall not apply to information that: (a) is or becomes publicly available through no breach of this Agreement; (b) is rightfully received from a third party without breach of any confidentiality obligation; or (c) is independently developed without use of the Confidential Information.

6. REPRESENTATIONS AND WARRANTIES

6.1 Authority. Each Party represents and warrants that it has the full right, power, and authority to enter into this Agreement and to perform its obligations hereunder.

6.2 No Conflicts. Each Party represents that the execution and performance of this Agreement does not and will not conflict with any other agreement to which it is a party.

6.3 Compliance. Second Party represents that it will comply with all applicable federal, state, and local laws and regulations in performing the Services.

7. INDEMNIFICATION

7.1 By Second Party. Second Party shall indemnify, defend, and hold harmless First Party from and against any and all claims, damages, losses, and expenses arising out of or resulting from Second Party's breach of this Agreement or negligent performance of the Services.

7.2 By First Party. First Party shall indemnify, defend, and hold harmless Second Party from and against any and all claims, damages, losses, and expenses arising out of First Party's breach of this Agreement.

8. LIMITATION OF LIABILITY

8.1 Cap on Liability. Except for breaches of confidentiality or indemnification obligations, each Party's total liability under this Agreement shall not exceed the total Fees paid or payable hereunder.

8.2 Consequential Damages. Neither Party shall be liable for any indirect, incidental, consequential, or punitive damages.

9. DISPUTE RESOLUTION

9.1 Negotiation. In the event of any dispute arising out of or relating to this Agreement, the Parties shall first attempt to resolve the dispute through good faith negotiations.

9.2 Arbitration. Any dispute that cannot be resolved through negotiation shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association.

9.3 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflicts of law principles.

10. GENERAL PROVISIONS

10.1 Entire Agreement. This Agreement, including all exhibits, constitutes the entire agreement between the Parties and supersedes all prior agreements and understandings.

10.2 Amendments. This Agreement may be amended only by a written instrument signed by both Parties.

10.3 Severability. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

10.4 Waiver. No waiver of any provision of this Agreement shall be deemed or shall constitute a waiver of any other provision.

10.5 Assignment. Neither Party may assign this Agreement without the prior written consent of the other Party.

10.6 Notices. All notices under this Agreement shall be in writing and delivered by certified mail, courier service, or electronic mail to the addresses set forth above.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

FIRST PARTY:                          SECOND PARTY:

_________________________           _________________________
Name: [First Party Name]             Name: [Second Party Name]
Title: [Title]                       Title: [Title]
Date: _______________                Date: _______________


EXHIBIT A - SCOPE OF SERVICES
[To be detailed based on specific engagement]

EXHIBIT B - FEES AND PAYMENT TERMS
[To be detailed based on agreed compensation structure]`;

export interface RiskIssue {
  id: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendation: string;
}

export const sampleRiskAnalysis = {
  overallRisk: 'medium' as const,
  score: 65,
  categories: [
    { name: 'Party Identification', status: 'pass', issues: 0 },
    { name: 'Financial Terms', status: 'warning', issues: 2 },
    { name: 'Liability & Indemnification', status: 'warning', issues: 1 },
    { name: 'Termination Rights', status: 'pass', issues: 0 },
    { name: 'Intellectual Property', status: 'critical', issues: 3 },
    { name: 'Confidentiality', status: 'pass', issues: 0 },
    { name: 'Regulatory Compliance', status: 'warning', issues: 1 },
    { name: 'Dispute Resolution', status: 'pass', issues: 0 },
    { name: 'Material Adverse Changes', status: 'critical', issues: 2 },
    { name: 'Conflicts of Interest', status: 'pass', issues: 0 },
  ],
  issues: [
    {
      id: '1',
      category: 'Intellectual Property',
      severity: 'critical' as const,
      title: 'Overly Broad IP Assignment',
      description: 'Section 4.2 contains an unconditional assignment of all IP rights without limitations or carve-outs for pre-existing intellectual property. This could inadvertently transfer ownership of Second Party\'s background IP and trade secrets.',
      recommendation: 'Revise Section 4.2 to explicitly exclude pre-existing intellectual property and limit the assignment to work product created specifically for this engagement. Add language: "excluding any pre-existing intellectual property owned by Second Party prior to the Effective Date."'
    },
    {
      id: '2',
      category: 'Intellectual Property',
      severity: 'high' as const,
      title: 'Missing IP Warranties',
      description: 'The agreement lacks representations and warranties from Second Party regarding non-infringement of third-party intellectual property rights.',
      recommendation: 'Add a warranty clause stating that Second Party represents that the Work Product will not infringe upon any third-party intellectual property rights and that Second Party has the right to assign all IP as contemplated.'
    },
    {
      id: '3',
      category: 'Intellectual Property',
      severity: 'medium' as const,
      title: 'Unclear License Scope',
      description: 'Section 4.3 grants a perpetual license but doesn\'t clearly define whether it\'s exclusive or non-exclusive, which could lead to disputes.',
      recommendation: 'Specify whether the license is exclusive or non-exclusive and clarify the scope of permitted use, modification, and distribution rights.'
    },
    {
      id: '4',
      category: 'Financial Terms',
      severity: 'high' as const,
      title: 'Vague Fee Structure',
      description: 'Exhibit B is referenced but not included, leaving compensation terms undefined. This creates significant uncertainty and potential for disputes.',
      recommendation: 'Complete Exhibit B with detailed fee schedules, payment milestones, late payment penalties, and any variable compensation terms before execution.'
    },
    {
      id: '5',
      category: 'Financial Terms',
      severity: 'medium' as const,
      title: 'Unlimited Expense Reimbursement',
      description: 'Section 3.3 allows for reimbursement of "reasonable" expenses without defining a cap or specific categories, potentially exposing First Party to unexpected costs.',
      recommendation: 'Define a monthly or project cap on reimbursable expenses and specify approved categories (travel, materials, etc.). Require itemized receipts for expenses over a certain threshold.'
    },
    {
      id: '6',
      category: 'Liability & Indemnification',
      severity: 'medium' as const,
      title: 'Asymmetric Indemnification',
      description: 'Section 7.1 places broader indemnification obligations on Second Party than Section 7.2 places on First Party, creating potential imbalance.',
      recommendation: 'Review and balance the indemnification obligations to ensure they are proportional to each party\'s risks and responsibilities. Consider adding mutual indemnification for certain claims.'
    },
    {
      id: '7',
      category: 'Material Adverse Changes',
      severity: 'critical' as const,
      title: 'No Force Majeure Clause',
      description: 'The agreement lacks any force majeure provisions, leaving parties vulnerable to liability for non-performance due to unforeseen circumstances like natural disasters, pandemics, or government actions.',
      recommendation: 'Add a comprehensive force majeure clause that excuses performance during events beyond either party\'s reasonable control and specifies the rights and obligations during such events.'
    },
    {
      id: '8',
      category: 'Material Adverse Changes',
      severity: 'high' as const,
      title: 'Missing Change of Control Provisions',
      description: 'No provisions address what happens if either party undergoes a merger, acquisition, or change of control during the term.',
      recommendation: 'Add change of control provisions that either require notice and consent or provide termination rights in the event of a change of control of either party.'
    },
    {
      id: '9',
      category: 'Regulatory Compliance',
      severity: 'medium' as const,
      title: 'No Data Privacy Provisions',
      description: 'If the Services involve processing personal data, the agreement lacks GDPR, CCPA, or other data privacy compliance provisions.',
      recommendation: 'If personal data will be processed, add comprehensive data protection provisions including data processing terms, security requirements, and breach notification procedures compliant with applicable privacy laws.'
    }
  ]
};

export const reviewBrief = {
  overview:
    'Counterparty revisions impact liability allocation, expand data hosting commitments, and introduce additional reporting duties. Primary negotiation focus should remain on restoring the liability cap and qualifying data residency obligations.',
  topRisks: [
    {
      id: 'liability-cap',
      title: 'Removed Liability Cap',
      impact: 'critical',
      detail: 'Section 8.2 deletes the aggregate liability cap, exposing the client to uncapped damages including consequential losses.',
    },
    {
      id: 'data-residency',
      title: 'Strict Data Residency Commitment',
      impact: 'high',
      detail: 'Revised Section 5.4 requires all client data to remain in-country with penalties for any transfer, conflicting with provider infrastructure.',
    },
    {
      id: 'reporting-duty',
      title: 'Monthly Executive Reporting',
      impact: 'medium',
      detail: 'New Exhibit C obligates monthly executive briefings and KPI reporting within three business days, increasing delivery costs.',
    },
  ],
  recommendations: [
    'Reinstate liability cap at fees paid in the prior 12 months with carve-outs for indemnity and confidentiality breaches.',
    'Offer data residency commitment limited to certified regions; require 45-day cure period before penalties apply.',
    'Convert executive reporting to quarterly cadence or make it subject to reasonable efforts.',
  ],
  newObligations: [
    {
      id: 'sla-reporting',
      owner: 'Engagement Manager',
      detail: 'Provide monthly SLA performance packets and executive summary within three business days of month end.',
    },
    {
      id: 'security-attest',
      owner: 'Security Team',
      detail: 'Deliver annual SOC 2 Type II report and penetration test summary to client compliance lead.',
    },
    {
      id: 'data-audit',
      owner: 'Data Protection Officer',
      detail: 'Support client-requested audits with ten business days\' notice once per calendar year.',
    },
  ],
};

export const versionComparisons = [
  {
    id: 'liability',
    clause: 'Limitation of Liability (Section 8.2)',
    changeType: 'Liability cap removed',
    baseline:
      'Neither Party\'s aggregate liability shall exceed the fees paid in the twelve (12) months preceding the claim, excluding liability arising from gross negligence or willful misconduct.',
    counterparty:
      'Liability of each Party shall be unlimited for any damages arising out of or relating to this Agreement, including indirect and consequential losses.',
    firmPosition: 'Reject removal; counter with 1x annual fees cap plus mutual carve-outs.',
    aiNote: 'High severity: exposes client to uncapped consequential damages.',
  },
  {
    id: 'data-residency',
    clause: 'Data Residency (Section 5.4)',
    changeType: 'Mandated single-country hosting',
    baseline:
      'Provider may process Client Data within approved regions offering equivalent safeguards, subject to Client notice.',
    counterparty:
      'Provider shall store and process all Client Data exclusively within the Client\'s country of incorporation. Any transfer constitutes material breach.',
    firmPosition: 'Propose limited list of compliant regions and notice/cure period before material breach.',
    aiNote: 'Medium severity: infrastructure impact and potential SLA breach risk.',
  },
  {
    id: 'reporting',
    clause: 'Executive Reporting (Exhibit C)',
    changeType: 'Added monthly reporting obligation',
    baseline:
      'Provider will furnish quarterly performance summaries upon Client request, subject to reasonable efforts.',
    counterparty:
      'Provider shall deliver detailed KPI dashboards and executive briefings within three (3) business days after each month end. Failure triggers service credits.',
    firmPosition: 'Negotiate quarterly cadence or extend delivery timeline to ten (10) business days.',
    aiNote: 'Medium severity: operational overhead and risk of automatic service credits.',
  },
];

export const complianceChecklist = [
  {
    section: 'Data Protection',
    items: [
      {
        id: 'dpa',
        label: 'Attach firm-standard Data Processing Addendum',
        status: 'todo',
        note: 'Required if personal data processed; opposing draft omits reference.',
      },
      {
        id: 'breach',
        label: 'Confirm breach notification window ≤ 72 hours',
        status: 'pass',
        note: 'Counterparty accepted original language.',
      },
      {
        id: 'subprocessors',
        label: 'Disclose approved subprocessors list',
        status: 'warning',
        note: 'Need updated schedule from provider by closing.',
      },
    ],
  },
  {
    section: 'Commercial Terms',
    items: [
      {
        id: 'fees',
        label: 'Exhibit B fee table complete',
        status: 'warning',
        note: 'Awaiting pricing confirmation from finance.',
      },
      {
        id: 'credits',
        label: 'Service credit schedule aligned with SLA policy',
        status: 'pass',
        note: 'Matches managed services playbook.',
      },
    ],
  },
  {
    section: 'Regulatory',
    items: [
      {
        id: 'export',
        label: 'Export control statement included',
        status: 'pass',
        note: 'Section 11.4 unchanged from standard.',
      },
      {
        id: 'industry',
        label: 'Industry-specific addenda (HIPAA, PCI) needed',
        status: 'todo',
        note: 'Confirm with client if PHI or card data involved.',
      },
    ],
  },
];

export const approvalWorkflow = [
  {
    id: 'associate',
    title: 'Associate Review',
    role: 'Alex Morgan',
    status: 'complete',
    completedAt: 'Today · 9:12 AM',
    notes: 'Initial risk assessment logged. Awaiting partner guidance on liability position.',
  },
  {
    id: 'partner',
    title: 'Partner Sign-off',
    role: 'Priya Patel',
    status: 'in-progress',
    due: 'Today · 5:00 PM',
    notes: 'Needs proposed fallback language for liability and data residency before approval.',
  },
  {
    id: 'client',
    title: 'Client Counsel Approval',
    role: 'Jordan Lee (Client GC)',
    status: 'blocked',
    due: 'Tomorrow · 12:00 PM',
    notes: 'Send updated draft after partner review. Prepare summary email highlighting redlines.',
  },
];

export const reviewActionItems = [
  {
    id: 'task-liability',
    task: 'Draft response language reinstating liability cap and carve-outs.',
    owner: 'Alex Morgan',
    priority: 'high',
    due: 'Today · 3:00 PM',
    status: 'open',
  },
  {
    id: 'task-data',
    task: 'Coordinate with infrastructure team on regional hosting capabilities.',
    owner: 'Sam Rivera',
    priority: 'medium',
    due: 'Tomorrow · 10:00 AM',
    status: 'in-progress',
  },
  {
    id: 'task-dpa',
    task: 'Attach Data Processing Addendum and align breach definitions.',
    owner: 'Morgan Blake',
    priority: 'high',
    due: 'Today · 5:00 PM',
    status: 'open',
  },
  {
    id: 'task-client',
    task: 'Prepare client-facing negotiation brief summarizing changes and recommendations.',
    owner: 'Priya Patel',
    priority: 'medium',
    due: 'Tomorrow · 9:00 AM',
    status: 'blocked',
  },
];

export const aiRemediationSuggestions = [
  {
    id: 'remediation-liability',
    clause: 'Limitation of Liability (Section 8.2)',
    severity: 'critical' as const,
    summary: 'Counterparty removed liability cap and added consequential damages.',
    currentText:
      'Liability of each Party shall be unlimited for any damages arising out of or relating to this Agreement, including indirect and consequential losses.',
    proposedText:
      'Except for liability arising from confidentiality breaches, indemnification obligations, or gross negligence, each Party\'s aggregate liability shall not exceed the fees paid under this Agreement in the twelve (12) months preceding the claim, and neither Party shall be liable for consequential, incidental, or punitive damages.',
    rationale:
      'Restores firm playbook cap, adds mutual carve-outs, and reintroduces consequential damages exclusion.',
  },
  {
    id: 'remediation-data',
    clause: 'Data Residency (Section 5.4)',
    severity: 'high' as const,
    summary: 'Mandated single-country hosting conflicts with provider infrastructure.',
    currentText:
      'Provider shall store and process all Client Data exclusively within the Client\'s country of incorporation. Any transfer constitutes material breach.',
    proposedText:
      'Provider shall process Client Data within AWS regions certified under ISO 27001 and TISAX. Provider will notify Client forty-five (45) days before onboarding a new region and allow good-faith discussions prior to deployment.',
    rationale:
      'Offers region list aligned with infrastructure while preserving notice and governance controls.',
  },
  {
    id: 'remediation-reporting',
    clause: 'Executive Reporting (Exhibit C)',
    severity: 'medium' as const,
    summary: 'New monthly executive briefing requirements exceed managed services playbook.',
    currentText:
      'Provider shall deliver detailed KPI dashboards and executive briefings within three (3) business days after each month end. Failure triggers service credits.',
    proposedText:
      'Provider shall deliver executive KPI summaries on a quarterly basis within ten (10) business days of quarter end. Monthly reports are provided on request, subject to mutually agreed timelines.',
    rationale:
      'Aligns cadence with delivery capacity and removes automatic service credit trigger for schedule slips.',
  },
];

export const counterpartyIntel = {
  previousDeals: 4,
  medianCloseTime: '18 days',
  lastEscalation: 'Data residency (resolved with regional list)',
  clausesFrequentlyContested: [
    { clause: 'Limitation of Liability', successRate: '60%' },
    { clause: 'Data Processing Addendum', successRate: '75%' },
    { clause: 'Service Credits', successRate: '40%' },
  ],
  comments:
    'Counterparty typically concedes on liability after partner-to-partner discussion. Expect resistance on single-region hosting until infrastructure review is completed.',
};

export const riskTrend = [
  { label: 'Initial Draft', score: 48 },
  { label: 'Opponent Markup', score: 63 },
  { label: 'AI Remediation', score: 58 },
  { label: 'Partner Review', score: 54 },
];

export const negotiationTimeline = [
  {
    id: 'event-1',
    timestamp: 'Today · 08:45 AM',
    actor: 'Alex Morgan (Associate)',
    channel: 'Internal note',
    summary: 'Logged liability cap removal and routed to partner for guidance.',
  },
  {
    id: 'event-2',
    timestamp: 'Today · 10:10 AM',
    actor: 'Priya Patel (Partner)',
    channel: 'Comment',
    summary:
      'Approved fallback position on liability provided counterparty accepts 45-day notice on residency.',
  },
  {
    id: 'event-3',
    timestamp: 'Today · 11:35 AM',
    actor: 'Jordan Lee (Client GC)',
    channel: 'Client call summary',
    summary:
      'Client comfortable with quarterly executive reporting; wants confirmation on SOC 2 delivery cadence.',
  },
  {
    id: 'event-4',
    timestamp: 'Today · 12:05 PM',
    actor: 'AI Briefing',
    channel: 'Automated summary',
    summary:
      'Generated briefing deck draft with top three counterparty changes and recommended counter-offers.',
  },
];

export const reviewerRecommendations = [
  {
    id: 'reviewer-1',
    name: 'Camila Duarte',
    practice: 'Privacy & Data Protection',
    availability: 'Light load · 6h free',
    reason: 'Aligns with data residency negotiation; previously handled 3 similar matters.',
    recommended: true,
  },
  {
    id: 'reviewer-2',
    name: 'Daniel Cho',
    practice: 'Commercial Technology',
    availability: 'Moderate load · 3h free',
    reason: 'Experience with executive reporting obligations and service credit concessions.',
    recommended: true,
  },
  {
    id: 'reviewer-3',
    name: 'Leah Singh',
    practice: 'Regulatory Compliance',
    availability: 'Heavy load · next slot tomorrow',
    reason: 'Supports GDPR Article 28 addenda; limited bandwidth today.',
    recommended: false,
  },
];

export const playbookCompliance = {
  alignment: 82,
  summary: 'Most clauses align with technology playbook; deviations remain on liability and reporting cadence.',
  deviations: [
    {
      id: 'deviation-liability',
      title: 'Liability Cap above threshold',
      impact: 'critical' as const,
      owner: 'Partner sign-off required',
    },
    {
      id: 'deviation-reporting',
      title: 'Executive reporting cadence accelerated',
      impact: 'medium' as const,
      owner: 'Client success to confirm capacity',
    },
  ],
};

export const executionChecklist = [
  {
    id: 'signatories',
    item: 'Verify counterparty signatories and authority certificates',
    owner: 'Alex Morgan',
    status: 'in-progress',
  },
  {
    id: 'exhibits',
    item: 'Attach Exhibit B pricing table and SLA schedule',
    owner: 'Sam Rivera',
    status: 'open',
  },
  {
    id: 'dpa',
    item: 'Include Data Processing Addendum (EU/UK) once liability settled',
    owner: 'Morgan Blake',
    status: 'blocked',
  },
  {
    id: 'sign-platform',
    item: 'Prepare DocuSign envelope with partner and client GC routing',
    owner: 'Operations Team',
    status: 'open',
  },
];

export const auditExports = [
  {
    id: 'export-brief',
    label: 'Download negotiation brief (PDF)',
    description: 'Includes AI summary, risk snapshots, and recommended talking points.',
  },
  {
    id: 'export-log',
    label: 'Export action log (CSV)',
    description: 'Chronological list of edits, comments, AI suggestions, and approvals.',
  },
  {
    id: 'export-json',
    label: 'Download machine-readable package (JSON)',
    description: 'Structured payload with clause states and decision metadata.',
  },
];
