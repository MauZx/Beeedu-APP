import React, { useState } from 'react';

function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  valid,
  loading,
  icon,
  touched,
  formSubmitted,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' || name.toLowerCase().includes('senha');
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <input
          id={name}
          name={name}
          type={isPassword && !showPassword ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={isPassword ? 'new-password' : 'off'}
          style={isPassword ? { paddingRight: 32 } : {}}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute',
              right: 8,
              background: showPassword ? '#e6f7ff' : '#f5f5f5',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              borderRadius: 16,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#e6f7ff'}
            onMouseOut={e => e.currentTarget.style.background = showPassword ? '#e6f7ff' : '#f5f5f5'}
          >
            {showPassword ? (
              <span role="img" aria-label="Senha visível" title="Senha visível">🙉</span>
            ) : (
              <span role="img" aria-label="Senha oculta" title="Senha oculta">🙈</span>
            )}
          </button>
        )}
        {icon}
      </div>
      {error && (touched || formSubmitted) && (
        <div style={{ color: valid ? 'green' : 'red', fontSize: 13 }}>{error}</div>
      )}
    </div>
  );
}

export default FormField; 