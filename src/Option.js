import React from 'react';

const Option = ({ option, onChange }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field = id.split('-')[0];
    onChange({ ...option, [field]: value });
  };

  return (
    <div className="option" data-id={option.id}>
      <label htmlFor={`option-text-${option.id}`}>Option Text:</label>
      <input type="text" id={`option-text-${option.id}`} value={option.text} onChange={handleInputChange} />
      <label htmlFor={`next-dialogue-${option.id}`}>Next Dialogue ID:</label>
      <input type="text" id={`next-dialogue-${option.id}`} value={option.nextDialogue} onChange={handleInputChange} />
      <label htmlFor={`purpose-${option.id}`}>Purpose:</label>
      <input type="text" id={`purpose-${option.id}`} value={option.purpose} onChange={handleInputChange} />
    </div>
  );
};

export default Option;
