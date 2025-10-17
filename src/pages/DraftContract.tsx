import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { SelectField } from '@/components/ui/select-field';
import { TextareaField } from '@/components/ui/textarea-field';
import { contractTemplates, sampleContract } from '@/lib/mockData';
import { Download, Loader2, FileText } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-foreground mb-2">Draft New Contract</h2>
        <p className="text-muted-foreground">
          Fill in the details below to generate a professional contract
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6 animate-slide-up">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Contract Details</h3>
            
            <div className="space-y-4">
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

              <TextareaField
                label="Business Purpose"
                placeholder="Describe the purpose and scope of this agreement..."
                value={formData.businessPurpose}
                onChange={(e) => handleChange('businessPurpose', e.target.value)}
                rows={4}
              />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-12 text-base font-semibold"
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

        {/* Results Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {generatedContract ? (
            <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Generated Contract</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on: Professional Services Template
                    </p>
                  </div>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-6 max-h-[600px] overflow-y-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedContract}
                </pre>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl p-12 text-center border-2 border-dashed border-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Contract Generated Yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Fill in the form and click "Generate Contract" to see your document here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
