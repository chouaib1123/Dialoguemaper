import React, { useState, useRef } from 'react';
import Dialogue from './Dialogue';

const DialogueEditor = () => {
  const [dialogues, setDialogues] = useState([]);
  const [nextDialogueId, setNextDialogueId] = useState(1);
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Create a new dialogue with a unique ID
  const addDialogue = () => {
    setDialogues([...dialogues, { id: nextDialogueId, text: '', giveItem: false, itemId: '', haveCutscene: false, cutsceneName: '', haveOptions: false, options: [] }]);
    setNextDialogueId(nextDialogueId + 1);
  };

  // Save dialogues to a JSON file
  const saveDialogues = () => {
    const filename = window.prompt("Enter the filename for your JSON file:", "dialogues.json");
    
    if (filename) {
      const dataStr = JSON.stringify(dialogues, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Handle dialogue changes
  const handleDialogueChange = (id, updatedDialogue) => {
    setDialogues(dialogues.map(dialogue => dialogue.id === id ? updatedDialogue : dialogue));
  };

  // Delete a dialogue by its ID
  const deleteDialogue = (id) => {
    setDialogues(dialogues.filter(dialogue => dialogue.id !== id));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/json') {
        alert('Please upload a valid JSON file.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log('Parsed JSON Data:', jsonData); // Debugging line to check the content
  
          // Ensure jsonData is an array
          if (Array.isArray(jsonData)) {
            setDialogues(jsonData);
  
            // Update nextDialogueId to ensure new IDs are unique
            if (jsonData.length > 0) {
              const maxId = Math.max(...jsonData.map(dialogue => dialogue.id));
              setNextDialogueId(maxId + 1);
            }
          } else {
            alert('Uploaded file does not contain an array of dialogues.');
          }
        } catch (error) {
          alert('Error parsing JSON file.');
          console.error('JSON Parsing Error:', error); // Debugging line for error details
        }
      };
      reader.readAsText(file);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className='buttonsMain'>
        <div>
          <button onClick={addDialogue}>Create Dialogue</button>
          <button onClick={handleButtonClick}>Upload Dialogues</button>
        </div>
        <button onClick={saveDialogues}>Save Dialogues</button>
      </div>
      
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }} // Hide the file input
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      <div id="dialogues-container">
        {Array.isArray(dialogues) && dialogues.map(dialogue => (
          <Dialogue
            key={dialogue.id}
            dialogue={dialogue}
            onChange={updatedDialogue => handleDialogueChange(dialogue.id, updatedDialogue)}
            onDelete={deleteDialogue}
          />
        ))}
      </div>
    </div>
  );
};

export default DialogueEditor;
