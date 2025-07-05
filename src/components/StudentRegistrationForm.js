import React, { useState, useEffect } from 'react';
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
  // Letras, números e caracteres especiais
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
};

// Simulação de checagem assíncrona (mock)
const mockCheckAsync = (value, type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula que "usuarioexiste", "cpfexiste", "emailexiste", "foneexiste" já existem
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

// Adicionar função de máscara para CEP
function maskCEP(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
}

// Função para aplicar máscara DD/MM/AAAA
function maskDate(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1')
    .slice(0, 10);
}

// Centralizar regras de máscara e validação por campo
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
  // Converter DD/MM/AAAA para Date
  const [d, m, y] = value.split('/');
  if (!d || !m || !y || y.length !== 4) return { valid: false, msg: 'Data inválida.' };
  const date = new Date(`${y}-${m}-${d}`);
  if (isNaN(date.getTime())) return { valid: false, msg: 'Data inválida.' };
  if (isFutureDate(`${y}-${m}-${d}`)) return { valid: false, msg: 'Data de nascimento não pode ser futura.' };
  const age = getAge(`${y}-${m}-${d}`);
  if (age < 14) return { valid: false, msg: 'A idade mínima para cadastro é 14 anos.' };
  return { valid: true, msg: '' };
};

function StudentRegistrationForm({ onCancel }) {
  // Estados dos campos do formulário
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

  // Estados auxiliares para auto-complete de escola
  const [schoolInput, setSchoolInput] = useState('');
  const [filteredSchools, setFilteredSchools] = useState(ESCOLAS);
  const [showRequestButton, setShowRequestButton] = useState(false);

  // Estados de validação e loading
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
    zip: false,
  });
  const [messages, setMessages] = useState({
    username: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    repeatEmail: '',
    zip: '',
  });

  // Adiciona validação obrigatória para campos extras
  const [requiredValidation, setRequiredValidation] = useState({
    firstName: null,
    lastName: null,
    birthDate: null,
    placeOfBirth: null,
    stateOfBirth: null,
    zip: null,
    address: null,
    neighborhood: null,
    state: null,
    houseNumber: null,
    school: null,
    race: null,
    sexAtBirth: null,
    gender: null,
    education: null,
    residenceState: null,
    interest: null,
    socialClass: null,
    email: null,
    repeatEmail: null,
    password: null,
    repeatPassword: null,
    city: null,
  });
  const [requiredMessages, setRequiredMessages] = useState({});

  const [underageConfirmed, setUnderageConfirmed] = useState(false);

  const [cityOptions, setCityOptions] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
      handleRequired('placeOfBirth', '');
    } else {
      setCityOptions([]);
      setForm(prev => ({ ...prev, placeOfBirth: '' }));
      handleRequired('placeOfBirth', '');
    }
    // eslint-disable-next-line
  }, [form.stateOfBirth]);

  // Novo handleChange genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Aplicar máscara se existir
    const maskedValue = MASKS[name] ? MASKS[name](value) : value;
    setForm((prev) => ({ ...prev, [name]: maskedValue }));
    if (requiredValidation.hasOwnProperty(name)) {
      handleRequired(name, maskedValue);
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
    // Validação crítica
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
    // Campos dependentes
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
    // Busca automática de endereço por CEP
    if (name === 'zip' && maskedValue.replace(/\D/g, '').length === 8) {
      setLoading((l) => ({ ...l, zip: true }));
      setMessages((m) => ({ ...m, zip: '' }));
      const cleanCep = maskedValue.replace(/\D/g, '');
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setLoading((l) => ({ ...l, zip: false }));
          if (data.erro) {
            setMessages((m) => ({ ...m, zip: 'CEP não encontrado.' }));
            setForm((prev) => ({ ...prev, address: '', neighborhood: '', state: '', city: '', houseNumber: '', residenceState: '' }));
          } else {
            setForm((prev) => ({
              ...prev,
              address: data.logradouro || '',
              neighborhood: data.bairro || '',
              state: data.uf || '',
              city: data.localidade || '',
              houseNumber: data.numero || '',
              residenceState: data.uf || prev.residenceState,
            }));
            setMessages((m) => ({ ...m, zip: '' }));
            handleRequired('address', data.logradouro || '');
            handleRequired('neighborhood', data.bairro || '');
            handleRequired('city', data.localidade || '');
            handleRequired('state', data.uf || '');
            handleRequired('residenceState', data.uf || '');
          }
        })
        .catch(() => {
          setLoading((l) => ({ ...l, zip: false }));
          setMessages((m) => ({ ...m, zip: 'Erro ao buscar o CEP.' }));
        });
    }
  };

  // Mensagens de erro e disponibilidade centralizadas
  function getErrorMessage(name) {
    switch (name) {
      case 'username': return 'O nome de usuário deve ter pelo menos 3 caracteres.';
      case 'cpf': return 'CPF inválido. Por favor, insira um número de CPF válido.';
      case 'email': return 'Digite um e-mail válido.';
      case 'phone': return 'Digite um telefone válido (ex: (11) 99999-9999).';
      case 'password': return 'A senha deve ter no mínimo 8 caracteres, conter letras, números e caracteres especiais.';
      default: return 'Campo inválido.';
    }
  }
  function getUnavailableMessage(name) {
    switch (name) {
      case 'username': return 'Nome de usuário não disponível. Tente: nome.123, nome_bidu ou outro.';
      case 'cpf': return 'CPF de Aluno já cadastrado!';
      case 'email': return 'E-mail de estudante já cadastrado!';
      case 'phone': return 'Telefone já cadastrado!';
      default: return 'Já cadastrado!';
    }
  }
  function getAvailableMessage(name) {
    switch (name) {
      case 'username': return 'Nome de usuário disponível!';
      case 'cpf': return 'CPF válido e disponível';
      case 'email': return 'E-mail disponível!';
      case 'phone': return 'Telefone disponível!';
      default: return 'Disponível!';
    }
  }

  // handleRequired mais enxuto
  const handleRequired = (name, value) => {
    let valid = !!value;
    let msg = valid ? '' : 'Campo obrigatório.';
    if (name === 'birthDate') {
      const result = validateBirthDate(value);
      valid = result.valid;
      msg = result.msg;
    }
    if (['email', 'repeatEmail', 'password', 'repeatPassword'].includes(name)) {
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
    handleRequired('school', value);
    setTouched((prev) => ({ ...prev, school: true }));
  };

  // Adicionar onBlur para marcar campo como tocado
  const handleBlur = (e) => {
    const { name } = e.target;
    if (requiredValidation.hasOwnProperty(name)) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  // O formulário só é válido se todos os campos obrigatórios e críticos estiverem validados
  const isFormValid =
    validation.username &&
    validation.cpf &&
    validation.email &&
    validation.phone &&
    validation.password &&
    validation.repeatPassword &&
    validation.repeatEmail &&
    Object.values(requiredValidation).every((v) => v === true);

  // Função para renderizar ícone de validação
  const renderIcon = (valid, loading, field) => {
    if (loading) return <span style={{ marginLeft: 8 }}>⏳</span>;
    if (valid === true) return <span style={{ color: 'green', marginLeft: 8 }}>✔️</span>;
    if (valid === false && (touched[field] || formSubmitted)) return <span style={{ color: 'red', marginLeft: 8 }}>❌</span>;
    return null;
  };

  // Handler de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Converter birthDate para Date
    let age = 0;
    if (form.birthDate && form.birthDate.includes('/')) {
      const [d, m, y] = form.birthDate.split('/');
      if (d && m && y) age = getAge(`${y}-${m}-${d}`);
    }
    if (age < 18) {
      if (!underageConfirmed) {
        alert('Você deve confirmar que seu responsável está de acordo com o cadastro.');
        if (typeof onCancel === 'function') onCancel();
        return;
      }
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      // Aqui você pode chamar a API real de cadastro
    }, 1500);
  };

  return (
    <form style={{ maxWidth: 600, margin: '0 auto', padding: 24 }} onSubmit={handleSubmit}>
      {/* Username */}
      <FormField label="Nome de usuário" name="username" value={form.username} onChange={handleChange} onBlur={handleBlur} error={messages.username} valid={validation.username} loading={loading.username} icon={renderIcon(validation.username, loading.username, 'username')} touched={touched.username} placeholder="Escolha um nome de usuário" formSubmitted={formSubmitted} />

      {/* CPF */}
      <FormField label="CPF" name="cpf" value={form.cpf} onChange={handleChange} onBlur={handleBlur} error={messages.cpf} valid={validation.cpf} loading={loading.cpf} icon={renderIcon(validation.cpf, loading.cpf, 'cpf')} touched={touched.cpf} placeholder="Digite seu CPF" formSubmitted={formSubmitted} />
      {!validation.cpf && messages.cpf === 'CPF de Aluno já cadastrado!' && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button type="button">Esqueceu a senha?</button>
          <button type="button">Acha que é um erro? Contate o suporte.</button>
        </div>
      )}

      {/* Nome e sobrenome */}
      <FormField label="Nome" name="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.firstName} valid={requiredValidation.firstName} icon={renderIcon(requiredValidation.firstName, null, 'firstName')} touched={touched.firstName} placeholder="Seu nome" formSubmitted={formSubmitted} />
      <FormField label="Sobrenome" name="lastName" value={form.lastName} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.lastName} valid={requiredValidation.lastName} icon={renderIcon(requiredValidation.lastName, null, 'lastName')} touched={touched.lastName} placeholder="Seu sobrenome" formSubmitted={formSubmitted} />

      {/* Data de nascimento */}
      <FormField label="Data de nascimento" name="birthDate" value={form.birthDate} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.birthDate} valid={requiredValidation.birthDate} icon={renderIcon(requiredValidation.birthDate, null, 'birthDate')} touched={touched.birthDate} placeholder="DD/MM/AAAA" type="text" formSubmitted={formSubmitted} />
      {(() => {
        let age = 0;
        if (form.birthDate && form.birthDate.includes('/')) {
          const [d, m, y] = form.birthDate.split('/');
          if (d && m && y) age = getAge(`${y}-${m}-${d}`);
        }
        return (age < 18 && age >= 14) ? (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={underageConfirmed} onChange={e => setUnderageConfirmed(e.target.checked)} />
              Confirmo que meu responsável está de acordo com meu cadastro.
            </label>
          </div>
        ) : null;
      })()}

      {/* Naturalidade e UF de nascimento */}
      <FormSelect label="UF de nascimento" name="stateOfBirth" value={form.stateOfBirth} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.stateOfBirth} valid={requiredValidation.stateOfBirth} icon={renderIcon(requiredValidation.stateOfBirth, null, 'stateOfBirth')} touched={touched.stateOfBirth} options={STATES} formSubmitted={formSubmitted} />

      {/* Cidade de nascimento */}
      <FormSelect label="Cidade de nascimento" name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.placeOfBirth} valid={requiredValidation.placeOfBirth} icon={renderIcon(requiredValidation.placeOfBirth, null, 'placeOfBirth')} touched={touched.placeOfBirth} options={cityOptions} disabled={!form.stateOfBirth || loadingCities} placeholder={loadingCities ? 'Carregando cidades...' : 'Selecione'} formSubmitted={formSubmitted} />

      {/* CEP da Residência */}
      <FormField label="CEP da Residência" name="zip" value={form.zip} onChange={handleChange} onBlur={handleBlur} error={messages.zip} valid={requiredValidation.zip} loading={loading.zip} icon={renderIcon(requiredValidation.zip, null, 'zip')} touched={touched.zip} placeholder="00000-000" formSubmitted={formSubmitted} />

      {/* Endereço da Residência */}
      <FormField label="Endereço da Residência" name="address" value={form.address} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.address} valid={requiredValidation.address} icon={renderIcon(requiredValidation.address, null, 'address')} touched={touched.address} placeholder="Endereço" formSubmitted={formSubmitted} />

      {/* Bairro da Residência */}
      <FormField label="Bairro da Residência" name="neighborhood" value={form.neighborhood} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.neighborhood} valid={requiredValidation.neighborhood} icon={renderIcon(requiredValidation.neighborhood, null, 'neighborhood')} touched={touched.neighborhood} placeholder="Bairro" formSubmitted={formSubmitted} />

      {/* Número da Residência */}
      <FormField label="Número da Residência" name="houseNumber" value={form.houseNumber} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.houseNumber} valid={requiredValidation.houseNumber} icon={renderIcon(requiredValidation.houseNumber, null, 'houseNumber')} touched={touched.houseNumber} placeholder="Número da casa/apto" formSubmitted={formSubmitted} />

      {/* Cidade da Residência */}
      <FormField label="Cidade da Residência" name="city" value={form.city} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.city} valid={requiredValidation.city} icon={renderIcon(requiredValidation.city, null, 'city')} touched={touched.city} placeholder="Cidade" formSubmitted={formSubmitted} />

      {/* UF da Residência */}
      <FormSelect label="UF da Residência" name="residenceState" value={form.residenceState} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.residenceState} valid={requiredValidation.residenceState} icon={renderIcon(requiredValidation.residenceState, null, 'residenceState')} touched={touched.residenceState} options={STATES} formSubmitted={formSubmitted} />

      {/* Escola (auto-complete) */}
      <FormAutoComplete label="Escola em que estuda" name="school" value={schoolInput} onChange={handleSchoolChange} onBlur={handleBlur} error={requiredMessages.school} valid={requiredValidation.school} icon={renderIcon(requiredValidation.school, null, 'school')} touched={touched.school} suggestions={filteredSchools} showRequestButton={showRequestButton} onRequestSchool={() => {}} onSuggestionClick={(escola) => {
        setSchoolInput(escola);
        setForm((prev) => ({ ...prev, school: escola }));
        setFilteredSchools([]);
        setShowRequestButton(false);
        handleRequired('school', escola);
      }} formSubmitted={formSubmitted} />

      {/* Campo de Interesse */}
      <FormSelect label="Interesse" name="interest" value={form.interest} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.interest} valid={requiredValidation.interest} icon={renderIcon(requiredValidation.interest, null, 'interest')} touched={touched.interest} options={INTERESTS} formSubmitted={formSubmitted} />

      {/* Cor */}
      <FormSelect label="Cor" name="race" value={form.race} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.race} valid={requiredValidation.race} icon={renderIcon(requiredValidation.race, null, 'race')} touched={touched.race} options={RACES} formSubmitted={formSubmitted} />

      {/* Sexo ao nascer */}
      <FormSelect label="Sexo ao nascer" name="sexAtBirth" value={form.sexAtBirth} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.sexAtBirth} valid={requiredValidation.sexAtBirth} icon={renderIcon(requiredValidation.sexAtBirth, null, 'sexAtBirth')} touched={touched.sexAtBirth} options={SEX_AT_BIRTH} formSubmitted={formSubmitted} />

      {/* Gênero */}
      <FormSelect label="Gênero" name="gender" value={form.gender} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.gender} valid={requiredValidation.gender} icon={renderIcon(requiredValidation.gender, null, 'gender')} touched={touched.gender} options={GENDERS} formSubmitted={formSubmitted} />

      {/* Telefone celular */}
      <FormField label="Celular" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} error={messages.phone} valid={validation.phone} loading={loading.phone} icon={renderIcon(validation.phone, loading.phone, 'phone')} touched={touched.phone} placeholder="(99) 99999-9999" formSubmitted={formSubmitted} />

      {/* Escolaridade */}
      <FormSelect label="Escolaridade" name="education" value={form.education} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.education} valid={requiredValidation.education} icon={renderIcon(requiredValidation.education, null, 'education')} touched={touched.education} options={EDUCATION_LEVELS} formSubmitted={formSubmitted} />

      {/* Classe Social */}
      <FormSelect label="Classe Social" name="socialClass" value={form.socialClass} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.socialClass} valid={requiredValidation.socialClass} icon={renderIcon(requiredValidation.socialClass, null, 'socialClass')} touched={touched.socialClass} options={SOCIAL_CLASSES} formSubmitted={formSubmitted} />

      {/* PIS (Programa de Integração Social) */}
      <FormField label="PIS (Programa de Integração Social)" name="pis" value={form.pis} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.pis} valid={requiredValidation.pis} icon={renderIcon(requiredValidation.pis, null, 'pis')} touched={touched.pis} placeholder="Opcional" formSubmitted={formSubmitted} />

      {/* Título de Eleitor */}
      <FormField label="Título de Eleitor" name="tituloEleitor" value={form.tituloEleitor} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.tituloEleitor} valid={requiredValidation.tituloEleitor} icon={renderIcon(requiredValidation.tituloEleitor, null, 'tituloEleitor')} touched={touched.tituloEleitor} placeholder="Opcional" formSubmitted={formSubmitted} />

      {/* Certificado de Reservista */}
      <FormField label="Certificado de Reservista" name="certificadoReservista" value={form.certificadoReservista} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.certificadoReservista} valid={requiredValidation.certificadoReservista} icon={renderIcon(requiredValidation.certificadoReservista, null, 'certificadoReservista')} touched={touched.certificadoReservista} placeholder="Opcional" formSubmitted={formSubmitted} />

      {/* E-mail */}
      <FormField label="E-mail" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={messages.email} valid={validation.email} loading={loading.email} icon={renderIcon(validation.email, loading.email, 'email')} touched={touched.email} placeholder="Seu e-mail" formSubmitted={formSubmitted} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button type="button">Esqueceu a senha?</button>
        <button type="button">Acha que é um engano? Fale com o suporte.</button>
      </div>
      <FormField label="Repita o e-mail" name="repeatEmail" value={form.repeatEmail} onChange={handleChange} onBlur={handleBlur} error={messages.repeatEmail} valid={validation.repeatEmail} icon={renderIcon(validation.repeatEmail, null, 'repeatEmail')} touched={touched.repeatEmail} placeholder="Repita o e-mail" formSubmitted={formSubmitted} />
      <FormField label="E-mail de recuperação" name="recoveryEmail" value={form.recoveryEmail} onChange={handleChange} onBlur={handleBlur} error={requiredMessages.recoveryEmail} valid={requiredValidation.recoveryEmail} icon={renderIcon(requiredValidation.recoveryEmail, null, 'recoveryEmail')} touched={touched.recoveryEmail} placeholder="E-mail alternativo (opcional)" formSubmitted={formSubmitted} />

      {/* Senha */}
      <FormField label="Senha" name="password" value={form.password} onChange={handleChange} onBlur={handleBlur} error={messages.password} valid={validation.password} loading={null} icon={renderIcon(validation.password, null, 'password')} touched={touched.password} placeholder="Mínimo 8 caracteres, conter letras, números e caracteres especiais" formSubmitted={formSubmitted} type="password" />
      <FormField label="Repita a senha" name="repeatPassword" value={form.repeatPassword} onChange={handleChange} onBlur={handleBlur} error={messages.repeatPassword} valid={validation.repeatPassword} icon={renderIcon(validation.repeatPassword, null, 'repeatPassword')} touched={touched.repeatPassword} placeholder="Repita a senha" formSubmitted={formSubmitted} type="password" />

      {/* Botão de ação */}
      <button
        type="submit"
        disabled={!isFormValid || submitting}
        style={{
          marginTop: 24,
          width: '100%',
          padding: 12,
          fontWeight: 700,
          fontSize: 18,
          position: 'sticky',
          bottom: 0,
          background: isFormValid && !submitting ? '#6699FF' : '#F2F4F7',
          color: isFormValid && !submitting ? '#fff' : '#aaa',
          border: 'none',
          borderRadius: 8,
          cursor: isFormValid && !submitting ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s, color 0.2s',
          boxShadow: '0 4px 24px rgba(47,74,96,0.08)'
        }}
      >
        {submitting ? 'Enviando...' : 'CONFIRMAR'}
      </button>

      {/* DEBUG: Exibir campos obrigatórios e seus estados se o formulário não for válido */}
      {!isFormValid && (
        <div style={{ marginTop: 32, background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 8, padding: 16, color: '#ad6800', fontSize: 14 }}>
          <strong>Debug: Campos obrigatórios e seus estados</strong>
          <ul style={{ columns: 2, margin: 0, padding: 0, listStyle: 'none' }}>
            {Object.entries(requiredValidation).map(([campo, valido]) => (
              <li key={campo} style={{ color: valido ? 'green' : 'red', marginBottom: 4 }}>
                {campo}: {valido ? '✔️' : '❌'}
              </li>
            ))}
          </ul>
        </div>
      )}
      {success && (
        <div style={{ marginTop: 24, color: '#6699FF', fontWeight: 700, fontSize: 18, textAlign: 'center' }}>
          Cadastro realizado com sucesso!
        </div>
      )}
    </form>
  );
}

export default StudentRegistrationForm; 