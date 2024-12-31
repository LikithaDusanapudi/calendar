import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'grid',
    gap: '16px',
    marginBottom: '24px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '80px',
    fontSize: '14px'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  button: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    padding: '4px 8px'
  },
  methodsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  methodItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '4px',
    marginBottom: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    gap: '12px'
  },
  methodContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  methodName: {
    fontWeight: 'bold',
    color: '#333'
  },
  methodDescription: {
    color: '#666',
    fontSize: '14px'
  },
  sequence: {
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#666'
  }
};

function CommunicationMethodManagement() {
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: '0',
    mandatory: false
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/communication-methods`)
      .then(res => res.json())
      .then(setCommunicationMethods)
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAddMethod = () => {
    if (!newMethod.name.trim() || !newMethod.description.trim() || !newMethod.sequence.trim()) {
      alert('Please fill all the required fields before submitting.');
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/communication-methods `, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMethod)
    })
      .then(res => res.json())
      .then(data => {
        setCommunicationMethods([...communicationMethods, data.method]);
        setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteMethod = (id) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/communication-methods/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setCommunicationMethods(prev => prev.filter(method => method._id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMethod({
      ...newMethod,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Communication Method</h2>
        <div style={styles.form}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Method Name"
            value={newMethod.name}
            onChange={handleChange}
          />
          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Description"
            value={newMethod.description}
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="number"
            name="sequence"
            placeholder="Sequence"
            value={newMethod.sequence}
            onChange={handleChange}
          />
          <label style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="mandatory"
              checked={newMethod.mandatory}
              onChange={handleChange}
            />
            Mandatory
          </label>
          <button style={styles.button} onClick={handleAddMethod}>
            Add Method
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Communication Methods</h2>
        {communicationMethods.length > 0 ? (
          <ul style={styles.methodsList}>
            {communicationMethods.map((method, index) => (
              <li key={method._id} style={styles.methodItem}>
                <div style={styles.methodContent}>
                  <div style={styles.methodName}>{method.name}</div>
                  <div style={styles.methodDescription}>{method.description}</div>
                </div>
                <div style={styles.sequence}>#{index + 1}</div>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => handleDeleteMethod(method._id)}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No communication methods found</p>
        )}
      </div>
    </div>
  );
}

export default CommunicationMethodManagement;
