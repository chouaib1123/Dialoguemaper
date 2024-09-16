import React from 'react';

const Dialogue = ({ dialogue, onChange, onDelete }) => {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    onChange({
      ...dialogue,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOptionChange = (optionId, e) => {
    const { name, value } = e.target;
    const updatedOptions = dialogue.options.map(option =>
      option.id === optionId ? { ...option, [name]: value } : option
    );
    onChange({ ...dialogue, options: updatedOptions });
  };

  const addOption = () => {
    const newOption = {
      id: Date.now(),
      text: '',
      nextDialogue: '',
      purpose: ''
    };
    onChange({
      ...dialogue,
      options: [...dialogue.options, newOption]
    });
  };

  const deleteOption = (optionId) => {
    const updatedOptions = dialogue.options.filter(option => option.id !== optionId);
    onChange({ ...dialogue, options: updatedOptions });
  };

  // Function to clear and hide content based on checkbox states
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({
      ...dialogue,
      [name]: checked,
      // Clear the associated content if checkbox is unchecked
      ...(name === 'haveOptions' && !checked ? { options: [] } : {}),
      ...(name === 'giveItem' && !checked ? { itemId: '' } : {}),
      ...(name === 'haveCutscene' && !checked ? { cutsceneName: '' } : {})
    });
  };

  return (
    <div className="dialogue">
      <div className="DialogueHeader">
        <h3>Dialogue ID: {dialogue.id}</h3>
        <button onClick={() => onDelete(dialogue.id)}>Delete Dialogue</button>
      </div>

      <label htmlFor={`dialogue-text-${dialogue.id}`}>Dialogue Text:</label>
      <input
        type="text"
        id={`dialogue-text-${dialogue.id}`}
        name="text"
        value={dialogue.text}
        onChange={handleChange}
      />

      <div className="checkbox-container">
        <label className="checkbox-item">
          <input
            type="checkbox"
            id={`give-item-${dialogue.id}`}
            name="giveItem"
            checked={dialogue.giveItem}
            onChange={handleCheckboxChange}
          />
          Give Item?
        </label>
        <label className="checkbox-item">
          <input
            type="checkbox"
            id={`have-cutscene-${dialogue.id}`}
            name="haveCutscene"
            checked={dialogue.haveCutscene}
            onChange={handleCheckboxChange}
          />
          Have Cutscene?
        </label>
        <label className="checkbox-item">
          <input
            type="checkbox"
            id={`have-options-${dialogue.id}`}
            name="haveOptions"
            checked={dialogue.haveOptions}
            onChange={handleCheckboxChange}
          />
          Have Options?
        </label>
      </div>

      {dialogue.giveItem && (
        <div id={`item-section-${dialogue.id}`}>
          <label htmlFor={`item-id-${dialogue.id}`}>Item to Give:</label>
          <input
            type="text"
            id={`item-id-${dialogue.id}`}
            name="itemId"
            value={dialogue.itemId}
            onChange={handleChange}
          />
        </div>
      )}

      {dialogue.haveCutscene && (
        <div id={`cutscene-section-${dialogue.id}`}>
          <label htmlFor={`cutscene-name-${dialogue.id}`}>Cutscene Name:</label>
          <input
            type="text"
            id={`cutscene-name-${dialogue.id}`}
            name="cutsceneName"
            value={dialogue.cutsceneName}
            onChange={handleChange}
          />
        </div>
      )}

      {dialogue.haveOptions && (
        <div id={`add-option-container-${dialogue.id}`}>
          <button onClick={addOption}>Add Option</button>
        </div>
      )}

      {dialogue.haveOptions && (
        <div className="options-container">
          {dialogue.options.map(option => (
            <div key={option.id} className="option">
              <label htmlFor={`option-text-${option.id}`}>Option Text:</label>
              <input
                type="text"
                id={`option-text-${option.id}`}
                name="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e)}
              />
              <label htmlFor={`next-dialogue-${option.id}`}>Next Dialogue ID:</label>
              <input
                type="text"
                id={`next-dialogue-${option.id}`}
                name="nextDialogue"
                value={option.nextDialogue}
                onChange={(e) => handleOptionChange(option.id, e)}
              />
              <label htmlFor={`purpose-${option.id}`}>Purpose:</label>
              <input
                type="text"
                id={`purpose-${option.id}`}
                name="purpose"
                value={option.purpose}
                onChange={(e) => handleOptionChange(option.id, e)}
              />
              <button onClick={() => deleteOption(option.id)}>Delete Option</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dialogue;
