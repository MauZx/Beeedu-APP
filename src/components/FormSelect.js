import React from 'react';

function FormSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Selecione',
  error,
  valid,
  icon,
  touched,
  formSubmitted,
  ...props
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>{opt}</option>
            ) : (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )
          ))}
        </select>
        {icon}
      </div>
      {error && (touched || formSubmitted) && (
        <div style={{ color: valid ? 'green' : 'red', fontSize: 13 }}>{error}</div>
      )}
    </div>
  );
}

export default FormSelect; 