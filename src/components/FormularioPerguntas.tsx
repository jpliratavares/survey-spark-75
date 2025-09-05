import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import backgroundImage from '@/assets/background-instagram.jpg';

interface FormData {
  nome: string;
  whatsapp: string;
  possuiEmpresa: string;
  rendaMediaMensal: string;
  motivoInstagram: string;
  instagram: string;
  podeInvestir: string;
}

const FormularioPerguntas = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    whatsapp: '',
    possuiEmpresa: '',
    rendaMediaMensal: '',
    motivoInstagram: '',
    instagram: '',
    podeInvestir: ''
  });

  const opcoesRenda = [
    'Abaixo de R$ 3.000 por mês',
    'Entre R$ 3.000 e R$ 5.000 por mês',
    'Entre R$ 5.000 e R$ 10.000 por mês',
    'Entre R$ 10.000 e R$ 20.000 por mês',
    'Entre R$ 20.000 e R$ 50.000 por mês',
    'Acima de R$ 50.000 por mês'
  ];

  const steps = [
    {
      title: "Informações Pessoais",
      description: "Vamos começar com seus dados básicos"
    },
    {
      title: "Informações Profissionais", 
      description: "Conte-nos sobre sua situação profissional"
    },
    {
      title: "Instagram e Motivação",
      description: "Queremos entender seus objetivos"
    },
    {
      title: "Perfil do Instagram",
      description: "Qual seu perfil no Instagram?"
    },
    {
      title: "Capacidade de Investimento",
      description: "Última pergunta sobre investimento"
    }
  ];

  const totalSteps = steps.length;

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return formData.nome.trim() !== '';
      case 1:
        return formData.whatsapp.trim() !== '' && formData.possuiEmpresa !== '' && formData.rendaMediaMensal !== '';
      case 2:
        return formData.motivoInstagram.trim() !== '';
      case 3:
        return formData.instagram.trim() !== '';
      case 4:
        return formData.podeInvestir !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o campo antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o campo antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Formulário enviado!",
      description: "Suas informações foram registradas com sucesso.",
    });

    console.log('Dados do formulário:', formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium">
              Qual seu nome?
            </Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="transition-all duration-200 focus:shadow-glow"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-sm font-medium">
                Qual o seu WhatsApp?
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                className="transition-all duration-200 focus:shadow-glow"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Você possui uma empresa?
              </Label>
              <RadioGroup
                value={formData.possuiEmpresa}
                onValueChange={(value) => handleInputChange('possuiEmpresa', value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="sim" />
                  <Label htmlFor="sim" className="cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="nao" />
                  <Label htmlFor="nao" className="cursor-pointer">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Renda média mensal?
              </Label>
              <Select
                value={formData.rendaMediaMensal}
                onValueChange={(value) => handleInputChange('rendaMediaMensal', value)}
              >
                <SelectTrigger className="transition-all duration-200 focus:shadow-glow">
                  <SelectValue placeholder="Selecione sua faixa de renda" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {opcoesRenda.map((opcao, index) => (
                    <SelectItem key={index} value={opcao}>
                      {opcao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-2">
            <Label htmlFor="motivoInstagram" className="text-sm font-medium">
              Por que você quer crescer no Instagram e ganhar dinheiro com essa ferramenta?
            </Label>
            <Textarea
              id="motivoInstagram"
              placeholder="Conte-nos sua motivação e objetivos..."
              value={formData.motivoInstagram}
              onChange={(e) => handleInputChange('motivoInstagram', e.target.value)}
              className="transition-all duration-200 focus:shadow-glow min-h-[100px] resize-none"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-sm font-medium">
              Qual o seu Instagram?
            </Label>
            <Input
              id="instagram"
              type="text"
              placeholder="@seuusuario ou link completo"
              value={formData.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              className="transition-all duration-200 focus:shadow-glow"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Consegue investir 10K ou mais?
            </Label>
            <RadioGroup
              value={formData.podeInvestir}
              onValueChange={(value) => handleInputChange('podeInvestir', value)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="investir-sim" />
                <Label htmlFor="investir-sim" className="cursor-pointer">
                  SIM, consigo fazer esse investimento
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="investir-nao" />
                <Label htmlFor="investir-nao" className="cursor-pointer">
                  NÃO consigo fazer esse investimento
                </Label>
              </div>
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <Card className="w-full max-w-md bg-gradient-card/90 border-border shadow-card backdrop-blur-md relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} de {totalSteps}
            </div>
            <div className="w-24 bg-muted rounded-full h-1">
              <div 
                className="bg-gradient-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-4">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
              )}
              
              <div className="flex-1" />
              
              {currentStep < totalSteps - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-glow font-semibold flex items-center gap-2"
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-glow font-semibold"
                >
                  Finalizar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormularioPerguntas;