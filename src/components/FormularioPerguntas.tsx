import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  nome: string;
  whatsapp: string;
  possuiEmpresa: string;
  rendaMediaMensal: string;
}

const FormularioPerguntas = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    whatsapp: '',
    possuiEmpresa: '',
    rendaMediaMensal: ''
  });

  const opcoesRenda = [
    'Abaixo de R$ 3.000 por mês',
    'Entre R$ 3.000 e R$ 5.000 por mês',
    'Entre R$ 5.000 e R$ 10.000 por mês',
    'Entre R$ 10.000 e R$ 20.000 por mês',
    'Entre R$ 20.000 e R$ 50.000 por mês',
    'Acima de R$ 50.000 por mês'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.whatsapp || !formData.possuiEmpresa || !formData.rendaMediaMensal) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
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

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-border shadow-card backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Informações Pessoais
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha os dados abaixo para continuar
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-glow font-semibold"
            >
              Enviar Informações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormularioPerguntas;