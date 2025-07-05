import React, { useState } from 'react';
import FormField from './FormField';

const SOCIALS = [
  { name: 'Google', icon: '🟢', provider: 'google' },
  { name: 'Microsoft', icon: '🟦', provider: 'microsoft' },
  { name: 'Adobe', icon: '🟥', provider: 'adobe' },
  { name: 'GitHub', icon: '⚫', provider: 'github' },
];

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
function validatePhone(phone) {
  return /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/.test(phone);
}
function validateCPF(cpf) {
  cpf = String(cpf).replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  if (firstCheck !== parseInt(cpf.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  if (secondCheck !== parseInt(cpf.charAt(10))) return false;
  return true;
}
function validateUsername(username) {
  return username && username.length >= 3;
}
function validatePassword(password) {
  if (!password || password.length < 8) return false;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  return hasLetter && hasNumber && hasSpecial;
}

function detectType(value) {
  if (validateEmail(value)) return 'email';
  if (validatePhone(value)) return 'phone';
  if (validateCPF(value)) return 'cpf';
  if (validateUsername(value)) return 'username';
  return null;
}

export default function StudentLoginForm({ onLogin, onSocialLogin, error }) {
  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const type = detectType(form.identifier);
  const identifierValid = !!form.identifier && !!type;
  const passwordValid = validatePassword(form.password);

  const isFormValid = identifierValid && passwordValid;

  const renderIcon = (valid, field) => {
    if (valid === true) return <span style={{ color: 'green', marginLeft: 8 }}>✔️</span>;
    if (valid === false && (touched[field] || formSubmitted)) return <span style={{ color: 'red', marginLeft: 8 }}>❌</span>;
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin(form);
    }, 1200);
  };

  return (
    <form style={{ maxWidth: 480, minWidth: 380, margin: '0 auto', padding: 40, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0001', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, width: '100%' }}>Login do Aluno</h2>
      <FormField
        label="E-mail, Celular, CPF ou Nome de Usuário"
        name="identifier"
        value={form.identifier}
        onChange={handleChange}
        onBlur={handleChange}
        error={
          !form.identifier
            ? (touched.identifier || formSubmitted) && 'Campo obrigatório.'
            : (!identifierValid && (touched.identifier || formSubmitted) && 'Digite um e-mail, celular, CPF ou nome de usuário válido.')
        }
        valid={identifierValid}
        icon={renderIcon(identifierValid, 'identifier')}
        touched={touched.identifier}
        formSubmitted={formSubmitted}
        placeholder="Digite seu e-mail, celular, CPF ou nome de usuário"
        style={{ width: 340 }}
      />
      <FormField
        label="Senha"
        name="password"
        value={form.password}
        onChange={handleChange}
        onBlur={handleChange}
        error={
          !form.password
            ? (touched.password || formSubmitted) && 'Campo obrigatório.'
            : (!passwordValid && (touched.password || formSubmitted) && 'A senha deve ter no mínimo 8 caracteres, conter letras, números e caracteres especiais.')
        }
        valid={passwordValid}
        icon={renderIcon(passwordValid, 'password')}
        touched={touched.password}
        formSubmitted={formSubmitted}
        placeholder="Digite sua senha"
        type="password"
        style={{ width: 340 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 12, fontWeight: 500 }}>{error}</div>}
      <button
        type="submit"
        disabled={!isFormValid || loading}
        style={{
          marginTop: 16,
          width: 340,
          padding: 12,
          fontWeight: 700,
          fontSize: 18,
          background: isFormValid && !loading ? '#6699FF' : '#F2F4F7',
          color: isFormValid && !loading ? '#fff' : '#aaa',
          border: 'none',
          borderRadius: 8,
          cursor: isFormValid && !loading ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s, color 0.2s',
          boxShadow: '0 2px 8px #0001',
          textAlign: 'center',
        }}
      >
        {loading ? 'Entrando...' : 'ENTRAR'}
      </button>
      <div style={{ textAlign: 'center', margin: '24px 0 8px', color: '#888', width: '100%' }}>ou entre com</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, width: '100%' }}>
        {SOCIALS.map((s) => (
          <button
            key={s.provider}
            type="button"
            onClick={() => onSocialLogin && onSocialLogin(s.provider)}
            style={{
              fontSize: 32,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 8,
              transition: 'background 0.2s',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={`Entrar com ${s.name}`}
            aria-label={`Entrar com ${s.name}`}
          >
            {s.icon}
          </button>
        ))}
      </div>
    </form>
  );
} 