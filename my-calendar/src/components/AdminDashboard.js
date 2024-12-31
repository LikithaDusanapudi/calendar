import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Inline styles for maintainability and modularity
const styles = {
  dashboard: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '2.25rem',
    fontWeight: '600'
  },
  nav: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  navList: {
    display: 'flex',
    gap: '1.5rem',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  navLink: {
    textDecoration: 'none',
    color: '#3498db',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#e9ecef'
    }
  },
  sectionHeader: {
    color: '#34495e',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: '500'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  th: {
    backgroundColor: '#f8f9fa',
    color: '#495057',
    fontWeight: '600',
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6'
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #dee2e6',
    color: '#495057'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  communicationsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  communicationItem: {
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  }
};

function AdminDashboard() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`)
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.header}>Admin Dashboard</h2>
      
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li>
            <Link to="/admin/companies" style={styles.navLink}>
              Company Management
            </Link>
          </li>
          <li>
            <Link to="/admin/communication-methods" style={styles.navLink}>
              Communication Method Management
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <h3 style={styles.sectionHeader}>Existing Companies</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Company Name', 'Location', 'LinkedIn', 'Communication Periodicity', 
                'Emails', 'Phone Numbers', 'Comments', 'Communications'].map(header => (
                <th key={header} style={styles.th}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td style={styles.td}>{company.name}</td>
                <td style={styles.td}>{company.location}</td>
                <td style={styles.td}>
                  {company.linkedInProfile ? (
                    <a 
                      href={company.linkedInProfile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      View Profile
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td style={styles.td}>
                  {company.communicationPeriodicity && company.communicationPeriodicity.value && company.communicationPeriodicity.unit
                    ? `${company.communicationPeriodicity.value} ${company.communicationPeriodicity.unit}`
                    : 'N/A'}
                </td>
                <td style={styles.td}>{company.emails.join(', ')}</td>
                <td style={styles.td}>{company.phoneNumbers}</td>
                <td style={styles.td}>{company.comments}</td>
                <td style={styles.td}>
                  {company.communications && company.communications.length > 0 ? (
                    <ul style={styles.communicationsList}>
                      {company.communications.map((comm, index) => (
                        <li key={index} style={styles.communicationItem}>
                          <strong>{comm.type}</strong> - {new Date(comm.date).toLocaleDateString()}:
                          {` ${comm.notes}`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'Not Completed'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;