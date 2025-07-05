import React from 'react';

function FormAutoComplete({
  label,
  name,
  value,
  onChange,
  onBlur,
  suggestions = [],
  showRequestButton = false,
  onRequestSchool,
  error,
  valid,
  icon,
  touched,
  formSubmitted,
  onSuggestionClick,
  ...props
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          placeholder="Digite o nome da escola"
          {...props}
        />
        {icon}
      </div>
      {suggestions.length > 0 && value && (
        <ul style={{ border: '1px solid #ccc', padding: 0, margin: 0, listStyle: 'none', maxHeight: 120, overflowY: 'auto' }}>
          {suggestions.map((s) => (
            <li
              key={s}
              style={{ padding: 8, cursor: 'pointer' }}
              onClick={() => onSuggestionClick && onSuggestionClick(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      {showRequestButton && (
        <button type="button" style={{ marginTop: 8 }} onClick={onRequestSchool}>
          Solicitar cadastro da escola ao suporte
        </button>
      )}
      {error && (touched || formSubmitted) && (
        <div style={{ color: valid ? 'green' : 'red', fontSize: 13 }}>{error}</div>
      )}
    </div>
  );
}

export default FormAutoComplete; 