export const contractTemplates = [
  { value: 'service', label: 'Service Agreement' },
  { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
  { value: 'licensing', label: 'Licensing Agreement' },
  { value: 'partnership', label: 'Partnership Agreement' },
];

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
