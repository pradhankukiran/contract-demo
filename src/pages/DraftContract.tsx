import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { SelectField } from '@/components/ui/select-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { contractTemplates, sampleContract } from '@/lib/mockData';
import { Download, Loader2, FileText, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function DraftContract() {
  const [formData, setFormData] = useState({
    contractType: 'service',
    clientName: '',
    industry: '',
    firstParty: '',
    secondParty: '',
    termDuration: '',
    businessPurpose: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.clientName || !formData.firstParty || !formData.secondParty) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const contract = sampleContract
        .replace(/\[DATE\]/g, new Date().toLocaleDateString())
        .replace(/\[First Party Name\]/g, formData.firstParty)
        .replace(/\[Second Party Name\]/g, formData.secondParty)
        .replace(/\[industry\]/g, formData.industry || 'general services')
        .replace(/\[business purpose\]/g, formData.businessPurpose || 'professional services')
        .replace(/\[Term Duration\]/g, formData.termDuration || '12 months');
      
      setGeneratedContract(contract);
      setIsGenerating(false);
      toast.success('Contract generated successfully!');
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.clientName}_contract.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Contract downloaded!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Draft New Contract</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Fill in the details below to generate a professional contract
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form Section - Takes 2 columns */}
        <div className="lg:col-span-2 animate-slide-up">
          <div className="bg-card p-8 shadow-xl border-l-4 border-primary">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-6">
                  Contract Information
                </h3>
                
                <div className="space-y-5">
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
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-6">
                  Party Details
                </h3>
                
                <div className="space-y-5">
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
              </div>

              <div className="pt-6 border-t border-border">
                <TextareaField
                  label="Business Purpose"
                  placeholder="Describe the purpose and scope of this agreement..."
                  value={formData.businessPurpose}
                  onChange={(e) => handleChange('businessPurpose', e.target.value)}
                  rows={5}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-14 text-base font-semibold mt-8"
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
            </div>
          </div>
        </div>

        {/* Results Section - Takes 3 columns */}
        <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {generatedContract ? (
            <div className="bg-card shadow-xl border border-border overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Generated Contract</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on: Professional Services Template
                    </p>
                  </div>
                  <Button onClick={handleDownload} variant="outline" className="h-10">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-8 overflow-y-auto flex-1">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedContract}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-card p-16 text-center border-2 border-dashed border-border h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-muted flex items-center justify-center">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                No Contract Generated Yet
              </h3>
              <p className="text-muted-foreground max-w-md">
                Fill in the form on the left and click "Generate Contract" to see your professionally drafted document appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
