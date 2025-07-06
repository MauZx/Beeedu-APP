import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import FormSelect from './FormSelect';
import FormAutoComplete from './FormAutoComplete';

const ESCOLAS = [
  'Escola Estadual de Ensino Fundamental e Médio Caetano de Campos - Aclimação',
];

const RACES = [
  'Branca',
  'Preta',
  'Amarela',
  'Parda',
  'Indígena',
];

const SEX_AT_BIRTH = ['Masculino', 'Feminino'];

const GENDERS = [
  'Mulher cisgênero',
  'Homem cisgênero',
  'Mulher transgênero',
  'Homem transgênero',
  'Travesti',
  'Pessoa não binária',
  'Agênero',
  'Prefere não dizer',
];

const EDUCATION_LEVELS = [
  'Educação Infantil',
  'Ensino Fundamental (incompleto)',
  'Ensino Fundamental (completo)',
  'Ensino Médio (incompleto)',
  'Ensino Médio (completo)',
  'Técnico',
  'Graduação (incompleta)',
  'Graduação (completa)',
  'Pós-graduação (lato sensu)',
  'Mestrado',
  'Doutorado',
];

const INTERESTS = [
  'Design',
  'Programação',
  'Ciências',
  'Educação',
  'Marketing',
  'Engenharia',
];

const STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const SOCIAL_CLASSES = [
  { value: 'A', label: 'Classe A: Renda familiar mensal superior a R$ 23.200,00.' },
  { value: 'B', label: 'Classe B: Renda familiar mensal entre R$ 7.500,00 e R$ 23.200,00.' },
  { value: 'C', label: 'Classe C: Renda familiar mensal entre R$ 3.100,00 e R$ 7.500,00.' },
  { value: 'D', label: 'Classe D: Renda familiar mensal entre R$ 1.804,00 e R$ 3.100,00.' },
  { value: 'F', label: 'Classe F: Renda familiar mensal até R$ 1.804,00.' },
];

// Função de validação matemática de CPF
function validateCPF(cpf) {
  cpf = String(cpf).replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  if (firstCheck !== parseInt(cpf.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  if (secondCheck !== parseInt(cpf.charAt(10))) return false;
  return true;
}

// Funções de validação
const validateEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
const validatePhone = (phone) => /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/.test(phone);
const validateUsername = (username) => username.length >= 3;
const validatePassword = (password) => {
  if (!password || password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
};

// Simulação de checagem assíncrona (mock)
const mockCheckAsync = (value, type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        (type === 'username' && value === 'usuarioexiste') ||
        (type === 'cpf' && value === '111.111.111-11') ||
        (type === 'email' && value === 'emailexiste@teste.com') ||
        (type === 'phone' && value === '(11) 99999-9999')
      ) {
        resolve(false);
      } else {
        resolve(true);
      }
    }, 1000);
  });
};

// Funções de máscara
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

function maskPhone(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

function isFutureDate(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  const input = new Date(dateStr);
  return input > today;
}

function getAge(dateStr) {
  if (!dateStr) return 0;
  const today = new Date();
  const birth = new Date(dateStr);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function maskCEP(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}

function maskDate(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1')
    .slice(0, 10);
}

const MASKS = {
  cpf: maskCPF,
  phone: maskPhone,
  zip: maskCEP,
  birthDate: maskDate,
};

const VALIDATORS = {
  username: validateUsername,
  cpf: validateCPF,
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
};

const validateBirthDate = (value) => {
  if (!value) return { valid: false, msg: 'Campo obrigatório.' };
  const [d, m, y] = value.split('/');
  if (!d || !m || !y || y.length !== 4) return { valid: false, msg: 'Data inválida.' };
  const date = new Date(`${y}-${m}-${d}`);
  if (isNaN(date.getTime())) return { valid: false, msg: 'Data inválida.' };
  if (isFutureDate(`${y}-${m}-${d}`)) return { valid: false, msg: 'Data de nascimento não pode ser futura.' };
  const age = getAge(`${y}-${m}-${d}`);
  if (age < 14) return { valid: false, msg: 'A idade mínima para cadastro é 14 anos.' };
  return { valid: true, msg: '' };
};

export default function StudentRegistrationForm({ onCancel }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    username: '',
    cpf: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    placeOfBirth: '',
    stateOfBirth: '',
    zip: '',
    address: '',
    neighborhood: '',
    state: '',
    houseNumber: '',
    school: '',
    race: '',
    sexAtBirth: '',
    gender: '',
    phone: '',
    education: '',
    residenceState: '',
    interest: '',
    email: '',
    repeatEmail: '',
    recoveryEmail: '',
    password: '',
    repeatPassword: '',
    city: '',
    socialClass: '',
    pis: '',
    tituloEleitor: '',
    certificadoReservista: '',
  });

  const [validation, setValidation] = useState({
    username: null,
    cpf: null,
    email: null,
    phone: null,
    password: null,
    repeatPassword: null,
    repeatEmail: null,
  });

  const [loading, setLoading] = useState({
    username: false,
    cpf: false,
    email: false,
    phone: false,
  });

  const [messages, setMessages] = useState({
    username: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    repeatEmail: '',
  });

  const [requiredValidation, setRequiredValidation] = useState({
    firstName: null,
    lastName: null,
    birthDate: null,
    email: null,
    repeatEmail: null,
    password: null,
    repeatPassword: null,
    phone: null,
    cpf: null,
    username: null,
  });

  // Estados auxiliares para auto-complete de escola
  const [schoolInput, setSchoolInput] = useState('');
  const [filteredSchools, setFilteredSchools] = useState(ESCOLAS);
  const [showRequestButton, setShowRequestButton] = useState(false);

  const [cityOptions, setCityOptions] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [requiredMessages, setRequiredMessages] = useState({});
  const [underageConfirmed, setUnderageConfirmed] = useState(false);
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cepError, setCepError] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  // Buscar cidades do IBGE ao mudar o UF de nascimento
  useEffect(() => {
    if (form.stateOfBirth) {
      setLoadingCities(true);
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.stateOfBirth}/municipios`)
        .then(res => res.json())
        .then(data => {
          setCityOptions(data.map(c => c.nome));
          setLoadingCities(false);
        })
        .catch(() => {
          setCityOptions([]);
          setLoadingCities(false);
        });
      // Limpa cidade ao trocar UF
      setForm(prev => ({ ...prev, placeOfBirth: '' }));
    } else {
      setCityOptions([]);
      setForm(prev => ({ ...prev, placeOfBirth: '' }));
    }
  }, [form.stateOfBirth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maskedValue = MASKS[name] ? MASKS[name](value) : value;
    setForm((prev) => ({ ...prev, [name]: maskedValue }));
    
    if (requiredValidation.hasOwnProperty(name)) {
      handleRequired(name, maskedValue);
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
    
    if (VALIDATORS[name]) {
      setValidation((v) => ({ ...v, [name]: null }));
      setMessages((m) => ({ ...m, [name]: '' }));
      if (!VALIDATORS[name](maskedValue)) {
        setValidation((v) => ({ ...v, [name]: false }));
        setMessages((m) => ({ ...m, [name]: getErrorMessage(name) }));
      } else if (["username", "cpf", "email", "phone"].includes(name)) {
        setLoading((l) => ({ ...l, [name]: true }));
        mockCheckAsync(maskedValue, name).then((available) => {
          setLoading((l) => ({ ...l, [name]: false }));
          if (!available) {
            setValidation((v) => ({ ...v, [name]: false }));
            setMessages((m) => ({ ...m, [name]: getUnavailableMessage(name) }));
          } else {
            setValidation((v) => ({ ...v, [name]: true }));
            setMessages((m) => ({ ...m, [name]: getAvailableMessage(name) }));
          }
        });
      } else {
        setValidation((v) => ({ ...v, [name]: true }));
        setMessages((m) => ({ ...m, [name]: '' }));
      }
    }
    
    if (name === 'repeatEmail') {
      setValidation((v) => ({ ...v, repeatEmail: maskedValue === form.email }));
      setMessages((m) => ({ ...m, repeatEmail: maskedValue === form.email ? '' : 'Os e-mails não coincidem.' }));
    }
    if (name === 'repeatPassword') {
      setValidation((v) => ({ ...v, repeatPassword: maskedValue === form.password }));
      setMessages((m) => ({ ...m, repeatPassword: maskedValue === form.password ? '' : 'As senhas não coincidem.' }));
    }
    if (name === 'password' && form.repeatPassword) {
      setValidation((v) => ({ ...v, repeatPassword: maskedValue === form.repeatPassword }));
      setMessages((m) => ({ ...m, repeatPassword: maskedValue === form.repeatPassword ? '' : 'As senhas não coincidem.' }));
    }
  };

  function getErrorMessage(name) {
    const messages = {
      username: 'Nome de usuário deve ter pelo menos 3 caracteres.',
      cpf: 'CPF inválido.',
      email: 'E-mail inválido.',
      phone: 'Telefone inválido.',
      password: 'Senha deve ter pelo menos 8 caracteres, conter letras, números e caracteres especiais.',
    };
    return messages[name] || 'Campo inválido.';
  }

  function getUnavailableMessage(name) {
    const messages = {
      username: 'Nome de usuário já existe!',
      cpf: 'CPF de Aluno já cadastrado!',
      email: 'E-mail já cadastrado!',
      phone: 'Telefone já cadastrado!',
    };
    return messages[name] || 'Campo já existe.';
  }

  function getAvailableMessage(name) {
    const messages = {
      username: 'Nome de usuário disponível!',
      cpf: 'CPF disponível!',
      email: 'E-mail disponível!',
      phone: 'Telefone disponível!',
    };
    return messages[name] || 'Campo disponível.';
  }

  const handleRequired = (name, value) => {
    let valid = !!value;
    let msg = valid ? '' : 'Campo obrigatório.';
    
    if (name === 'birthDate') {
      const result = validateBirthDate(value);
      valid = result.valid;
      msg = result.msg;
    }
    
    if (['email', 'repeatEmail', 'password', 'repeatPassword', 'phone', 'cpf', 'username'].includes(name)) {
      if (!value) {
        valid = false;
        msg = 'Campo obrigatório.';
      }
    }
    
    setRequiredValidation((v) => ({ ...v, [name]: valid }));
    setRequiredMessages((m) => ({ ...m, [name]: msg }));
  };

  // Handler específico para escola (auto-complete)
  const handleSchoolChange = (e) => {
    const value = e.target.value;
    setSchoolInput(value);
    setForm((prev) => ({ ...prev, school: value }));
    const filtered = ESCOLAS.filter((escola) =>
      escola.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSchools(filtered);
    setShowRequestButton(value && filtered.length === 0);
    setTouched((prev) => ({ ...prev, school: true }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (requiredValidation.hasOwnProperty(name)) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
    // Busca automática de endereço pelo CEP
    if (name === "zip") {
      const cep = value.replace(/\D/g, "");
      if (cep.length === 8) {
        setLoadingCep(true);
        setCepError("");
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          if (data.erro) throw new Error("CEP não encontrado");
          setForm((prev) => ({
            ...prev,
            address: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            residenceState: data.uf || "",
          }));
        } catch (err) {
          setCepError("CEP não encontrado ou inválido.");
        } finally {
          setLoadingCep(false);
        }
      }
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return requiredValidation.firstName && requiredValidation.lastName && requiredValidation.birthDate;
      case 2:
        return validation.username && validation.cpf && validation.phone;
      case 3:
        return true; // Endereço é opcional
      case 4:
        return true; // Informações sociais são opcionais
      case 5:
        return validation.email && validation.repeatEmail && validation.password && validation.repeatPassword;
      default:
        return false;
    }
  };

  const canGoNext = () => isStepValid(currentStep);
  const canGoPrevious = () => currentStep > 1;
  const isLastStep = () => currentStep === 5;

  const handleNext = () => {
    if (canGoNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious()) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    let age = 0;
    if (form.birthDate && form.birthDate.includes('/')) {
      const [d, m, y] = form.birthDate.split('/');
      if (d && m && y) age = getAge(`${y}-${m}-${d}`);
    }
    
    if (age < 18) {
      if (!underageConfirmed) {
        alert('Você deve confirmar que seu responsável está de acordo com o cadastro.');
        return;
      }
    }
    
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      localStorage.setItem('userData', JSON.stringify(form));
      setTimeout(() => {
        if (onCancel) onCancel(); // Fecha o modal
        navigate('/interesses');
      }, 2000);
    }, 1500);
  };

  const renderIcon = (valid, loading, field) => {
    if (loading) return <span style={{ marginLeft: 8 }}>⏳</span>;
    if (valid === true) return <span style={{ color: 'green', marginLeft: 8 }}>✔️</span>;
    if (valid === false && (touched[field] || formSubmitted)) return <span style={{ color: 'red', marginLeft: 8 }}>❌</span>;
    return null;
  };

  const steps = [
    { title: 'Informações Pessoais', icon: '👤' },
    { title: 'Dados de Acesso', icon: '🔐' },
    { title: 'Endereço', icon: '🏠' },
    { title: 'Informações Sociais', icon: '👥' },
    { title: 'Contato', icon: '📧' }
  ];

  return (
    <div style={{
      maxWidth: 600,
      margin: '0 auto',
      padding: '32px 24px',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 700, 
          color: '#6699FF', 
          marginBottom: '8px' 
        }}>
          Criar Conta
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#666', 
          marginBottom: '24px' 
        }}>
          Preencha seus dados para começar
        </p>
        
        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
          marginBottom: '32px',
          width: '100%',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 70,
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: currentStep > index + 1 ? '#6699FF' : 
                            currentStep === index + 1 ? '#6699FF' : '#E5E7EB',
                  color: currentStep > index + 1 ? '#fff' : 
                         currentStep === index + 1 ? '#fff' : '#9CA3AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 600,
                  boxShadow: currentStep === index + 1 ? '0 0 0 4px #eaf2ff' : 'none',
                  transition: 'box-shadow 0.2s',
                }}>
                  {currentStep > index + 1 ? '✓' : step.icon}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: currentStep > index + 1 ? '#6699FF' : '#E5E7EB',
                  margin: '0 0px',
                  minWidth: 32,
                  maxWidth: 60,
                  alignSelf: 'center',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600, 
          color: '#374151',
          marginBottom: '24px'
        }}>
          {steps[currentStep - 1].title}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Informações Pessoais */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <FormField 
                label="Nome" 
                name="firstName" 
                value={form.firstName} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error={requiredMessages.firstName} 
                valid={requiredValidation.firstName} 
                icon={renderIcon(requiredValidation.firstName, null, 'firstName')} 
                touched={touched.firstName} 
                placeholder="Seu nome" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              <FormField 
                label="Sobrenome" 
                name="lastName" 
                value={form.lastName} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error={requiredMessages.lastName} 
                valid={requiredValidation.lastName} 
                icon={renderIcon(requiredValidation.lastName, null, 'lastName')} 
                touched={touched.lastName} 
                placeholder="Seu sobrenome" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
            
            <FormField 
              label="Data de nascimento" 
              name="birthDate" 
              value={form.birthDate} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={requiredMessages.birthDate} 
              valid={requiredValidation.birthDate} 
              icon={renderIcon(requiredValidation.birthDate, null, 'birthDate')} 
              touched={touched.birthDate} 
              placeholder="DD/MM/AAAA" 
              type="text" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            {(() => {
              let age = 0;
              if (form.birthDate && form.birthDate.includes('/')) {
                const [d, m, y] = form.birthDate.split('/');
                if (d && m && y) age = getAge(`${y}-${m}-${d}`);
              }
              return (age < 18 && age >= 14) ? (
                <div style={{ 
                  padding: '16px', 
                  background: '#FEF3C7', 
                  borderRadius: '8px', 
                  border: '1px solid #F59E0B' 
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <input 
                      type="checkbox" 
                      checked={underageConfirmed} 
                      onChange={e => setUnderageConfirmed(e.target.checked)} 
                    />
                    Confirmo que meu responsável está de acordo com meu cadastro.
                  </label>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Step 2: Dados de Acesso */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField 
              label="Nome de usuário" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.username} 
              valid={validation.username} 
              loading={loading.username} 
              icon={renderIcon(validation.username, loading.username, 'username')} 
              touched={touched.username} 
              placeholder="Escolha um nome de usuário" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="CPF" 
              name="cpf" 
              value={form.cpf} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.cpf} 
              valid={validation.cpf} 
              loading={loading.cpf} 
              icon={renderIcon(validation.cpf, loading.cpf, 'cpf')} 
              touched={touched.cpf} 
              placeholder="Digite seu CPF" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="Celular" 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.phone} 
              valid={validation.phone} 
              loading={loading.phone} 
              icon={renderIcon(validation.phone, loading.phone, 'phone')} 
              touched={touched.phone} 
              placeholder="(99) 99999-9999" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
          </div>
        )}

        {/* Step 3: Endereço */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField 
              label="CEP da Residência" 
              name="zip" 
              value={form.zip} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={cepError} 
              valid={true} 
              loading={loadingCep} 
              icon={null} 
              touched={touched.zip} 
              placeholder="00000-000" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="Endereço da Residência" 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error="" 
              valid={true} 
              icon={null} 
              touched={touched.address} 
              placeholder="Endereço" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <FormField 
                label="Bairro da Residência" 
                name="neighborhood" 
                value={form.neighborhood} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.neighborhood} 
                placeholder="Bairro" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              
              <FormField 
                label="Número da Residência" 
                name="houseNumber" 
                value={form.houseNumber} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.houseNumber} 
                placeholder="Número da casa/apto" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <FormField 
                label="Cidade da Residência" 
                name="city" 
                value={form.city} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.city} 
                placeholder="Cidade" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              
              <FormSelect 
                label="UF da Residência" 
                name="residenceState" 
                value={form.residenceState} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.residenceState} 
                options={STATES} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Informações Sociais */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <FormSelect 
                label="UF de nascimento" 
                name="stateOfBirth" 
                value={form.stateOfBirth} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.stateOfBirth} 
                options={STATES} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              <FormSelect 
                label="Cidade de nascimento" 
                name="placeOfBirth" 
                value={form.placeOfBirth} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.placeOfBirth} 
                options={cityOptions} 
                disabled={!form.stateOfBirth || loadingCities} 
                placeholder={loadingCities ? 'Carregando cidades...' : 'Selecione'} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <FormSelect 
                label="Cor" 
                name="race" 
                value={form.race} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.race} 
                options={RACES} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              <FormSelect 
                label="Sexo ao nascer" 
                name="sexAtBirth" 
                value={form.sexAtBirth} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.sexAtBirth} 
                options={SEX_AT_BIRTH} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <FormSelect 
                label="Gênero" 
                name="gender" 
                value={form.gender} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.gender} 
                options={GENDERS} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              <FormSelect 
                label="Escolaridade" 
                name="education" 
                value={form.education} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.education} 
                options={EDUCATION_LEVELS} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <FormSelect 
                label="Classe Social" 
                name="socialClass" 
                value={form.socialClass} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.socialClass} 
                options={SOCIAL_CLASSES} 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              <FormField 
                label="PIS (Programa de Integração Social)" 
                name="pis" 
                value={form.pis} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.pis} 
                placeholder="Opcional" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <FormField 
                label="Título de Eleitor" 
                name="tituloEleitor" 
                value={form.tituloEleitor} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.tituloEleitor} 
                placeholder="Opcional" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
              <FormField 
                label="Certificado de Reservista" 
                name="certificadoReservista" 
                value={form.certificadoReservista} 
                onChange={handleChange} 
                onBlur={handleBlur} 
                error="" 
                valid={true} 
                icon={null} 
                touched={touched.certificadoReservista} 
                placeholder="Opcional" 
                formSubmitted={formSubmitted} 
                style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              />
            </div>
          </div>
        )}

        {/* Step 5: Contato */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField 
              label="E-mail" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.email} 
              valid={validation.email} 
              loading={loading.email} 
              icon={renderIcon(validation.email, loading.email, 'email')} 
              touched={touched.email} 
              placeholder="Seu e-mail" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="Repita o e-mail" 
              name="repeatEmail" 
              value={form.repeatEmail} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.repeatEmail} 
              valid={validation.repeatEmail} 
              icon={renderIcon(validation.repeatEmail, null, 'repeatEmail')} 
              touched={touched.repeatEmail} 
              placeholder="Repita o e-mail" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="E-mail de recuperação" 
              name="recoveryEmail" 
              value={form.recoveryEmail} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error="" 
              valid={true} 
              icon={null} 
              touched={touched.recoveryEmail} 
              placeholder="E-mail alternativo (opcional)" 
              formSubmitted={formSubmitted} 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="Senha" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.password} 
              valid={validation.password} 
              loading={null} 
              icon={renderIcon(validation.password, null, 'password')} 
              touched={touched.password} 
              placeholder="Mínimo 8 caracteres, conter letras, números e caracteres especiais" 
              formSubmitted={formSubmitted} 
              type="password" 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
            
            <FormField 
              label="Repita a senha" 
              name="repeatPassword" 
              value={form.repeatPassword} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              error={messages.repeatPassword} 
              valid={validation.repeatPassword} 
              icon={renderIcon(validation.repeatPassword, null, 'repeatPassword')} 
              touched={touched.repeatPassword} 
              placeholder="Repita a senha" 
              formSubmitted={formSubmitted} 
              type="password" 
              style={{ maxWidth: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '32px',
          gap: '16px'
        }}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!canGoPrevious()}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              background: '#fff',
              color: canGoPrevious() ? '#374151' : '#9CA3AF',
              fontSize: '14px',
              fontWeight: 500,
              cursor: canGoPrevious() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
          >
            ← Anterior
          </button>
          
          {isLastStep() ? (
            <button
              type="submit"
              disabled={!canGoNext() || submitting}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                background: canGoNext() && !submitting ? '#6699FF' : '#E5E7EB',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: canGoNext() && !submitting ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              {submitting ? 'Enviando...' : 'Finalizar Cadastro'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext()}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                background: canGoNext() ? '#6699FF' : '#E5E7EB',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: canGoNext() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Próximo →
            </button>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: '#D1FAE5', 
            borderRadius: '8px', 
            border: '1px solid #10B981',
            textAlign: 'center',
            color: '#065F46',
            fontWeight: 600
          }}>
            Cadastro realizado com sucesso! Redirecionando para seleção de interesses...
          </div>
        )}
      </form>
    </div>
  );
} 