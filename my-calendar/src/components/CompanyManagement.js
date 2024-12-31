import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Linkedin, Mail, Phone, Calendar, MessageSquare, Pencil, Trash2 } from "lucide-react";

const styles = {
  container: {
    maxWidth: '1200px',
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
  cardHeader: {
    marginBottom: '20px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: 0
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '20px'
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '100px',
    fontSize: '14px',
    gridColumn: '1 / -1'
  },
  button: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  destructiveButton: {
    backgroundColor: '#dc2626',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gridColumn: '1 / -1'
  },
  companyList: {
    display: 'grid',
    gap: '16px'
  },
  companyCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start'
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  companyName: {
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: 0
  },
  companyDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#666'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  icon: {
    width: '16px',
    height: '16px',
    color: '#666'
  }
};

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: [],
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: {
      value: 2,
      unit: 'weeks',
    },
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/companies`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out any undefined or incomplete entries
        const validCompanies = data.filter((company) => company && company.name);

        // Ensure communicationPeriodicity is in the correct format
        const formattedCompanies = validCompanies.map((company) => ({
          ...company,
          communicationPeriodicity:
            typeof company.communicationPeriodicity === 'string'
              ? { value: 2, unit: 'weeks' } // default value
              : company.communicationPeriodicity,
        }));

        setCompanies(formattedCompanies);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'emails') {
      const emails = e.target.value.split(',').map((email) => email.trim());
      setNewCompany({ ...newCompany, emails });
    } else if (e.target.name === 'periodicityValue' || e.target.name === 'periodicityUnit') {
      setNewCompany({
        ...newCompany,
        communicationPeriodicity: {
          ...newCompany.communicationPeriodicity,
          value: e.target.name === 'periodicityValue' ? parseInt(e.target.value) : newCompany.communicationPeriodicity.value,
          unit: e.target.name === 'periodicityUnit' ? e.target.value : newCompany.communicationPeriodicity.unit,
        },
      });
    } else {
      setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
    }
  };

  const formatPeriodicity = (periodicity) => {
    return `Every ${periodicity.value} ${periodicity.unit}`;
  };

  const handleAddCompany = () => {
    const url = newCompany._id
      ? `${process.env.REACT_APP_API_BASE_URL}/api/companies/${newCompany._id}`
      : `${process.env.REACT_APP_API_BASE_URL}/api/companies`;
    const method = newCompany._id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCompany),
    })
      .then((res) => res.json())
      .then((data) => {
        if (method === 'PUT') {
          setCompanies(
            companies.map((company) =>
              company._id === newCompany._id ? data.updatedCompany : company
            )
          );
        } else {
          setCompanies([...companies, data.company]);
        }
        setNewCompany({
          name: '',
          location: '',
          linkedInProfile: '',
          emails: [],
          phoneNumbers: '',
          comments: '',
          communicationPeriodicity: {
            value: 2,
            unit: 'weeks',
          },
        });
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleDeleteCompany = (id) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${id}`, { method: 'DELETE' })
      .then(() => {
        setCompanies(companies.filter((company) => company._id !== id));
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleEditCompany = (id) => {
    const companyToEdit = companies.find((company) => company._id === id);
    setNewCompany(companyToEdit);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.title}>
            <Building2 style={styles.icon} />
            Company Management
          </h2>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <Building2 style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Company Name"
              value={newCompany.name}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <MapPin style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="location"
              placeholder="Location"
              value={newCompany.location}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <Linkedin style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="linkedInProfile"
              placeholder="LinkedIn Profile"
              value={newCompany.linkedInProfile}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <Mail style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="emails"
              placeholder="Emails (comma separated)"
              value={newCompany.emails.join(', ')}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <Phone style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="phoneNumbers"
              placeholder="Phone Numbers"
              value={newCompany.phoneNumbers}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <Calendar style={styles.icon} />
            <input
              style={{ ...styles.input, width: '80px' }}
              type="number"
              name="periodicityValue"
              min="1"
              value={newCompany.communicationPeriodicity.value}
              onChange={handleChange}
            />
            <select
              style={styles.select}
              name="periodicityUnit"
              value={newCompany.communicationPeriodicity.unit}
              onChange={handleChange}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <MessageSquare style={styles.icon} />
            <textarea
              style={styles.textarea}
              name="comments"
              placeholder="Comments"
              value={newCompany.comments}
              onChange={handleChange}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleAddCompany}>
              {newCompany._id ? 'Update Company' : 'Add Company'}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>Existing Companies</h3>
        <div style={styles.companyList}>
          {companies.map((company) => {
            if (!company || !company.name) {
              return null; // Skip invalid companies
            }

            return (
              <div key={company._id} style={styles.companyCard}>
                <div style={styles.companyInfo}>
                  <h3 style={styles.companyName}>
                    <Building2 style={styles.icon} />
                    {company.name}
                  </h3>
                  <div style={styles.companyDetail}>
                    <MapPin style={styles.icon} />
                    {company.location}
                  </div>
                  <div style={styles.companyDetail}>
                    <Calendar style={styles.icon} />
                    {formatPeriodicity(company.communicationPeriodicity)}
                  </div>
                </div>
                <div style={styles.actions}>
                  <button style={styles.button} onClick={() => handleEditCompany(company._id)}>
                    <Pencil style={styles.icon} />
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.destructiveButton }}
                    onClick={() => handleDeleteCompany(company._id)}
                  >
                    <Trash2 style={styles.icon} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CompanyManagement;