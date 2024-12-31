import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import Calendar from 'react-calendar';
import './UserDashboard.css';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [notifications, setNotifications] = useState({ overdue: 0, today: 0 });
  const [showCalendarView, setShowCalendarView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await axios.get('/api/companies');
        const communicationResponse = await axios.get('/api/communication-methods');
        setCompanies(companyResponse.data);
        setCommunicationMethods(communicationResponse.data);
        updateNotificationCounts(companyResponse.data);
        console.log('Company Data:', companyResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateNotificationCounts = (companyData) => {
    const today = new Date().toISOString().split('T')[0];
    const overdue = companyData.filter(c => new Date(c.communicationPeriodicity) < new Date(today)).length;
    const dueToday = companyData.filter(c => 
      new Date(c.communicationPeriodicity).toISOString().split('T')[0] === today
    ).length;
    setNotifications({ overdue, today: dueToday });
  };


const getHighlightClass = (company) => {
  return ''; // Since you're displaying the periodicity as is, no need to highlight based on dates
};


  const getLastFiveCommunications = (company) => {
    return company.communications?.slice(0, 5).map(comm => (
      <div key={comm._id} className="communication-pill" data-tooltip-id={`comm-${comm._id}`}>
        {`${comm.type} (${new Date(comm.date).toLocaleDateString()})`}
        <Tooltip id={`comm-${comm._id}`} content={comm.notes} />
      </div>
    ));
  };

  const CalendarView = () => {
    if (!showCalendarView) return null;

    const events = companies.flatMap(company => 
      company.communications?.map(comm => ({
        date: new Date(comm.date),
        title: `${company.name} - ${comm.type}`,
        notes: comm.notes
      }))
    ).filter(Boolean);

    return (
      <div className="calendar-view">
        <h2 className="card-title">Calendar View</h2>
        <Calendar
          value={new Date()}
          tileContent={({ date }) => {
            const dayEvents = events.filter(event => 
              event.date.toDateString() === date.toDateString()
            );
            return dayEvents.length > 0 ? (
              <div className="calendar-events">
                {dayEvents.map((event, i) => (
                  <div key={i} className="calendar-event-dot" 
                       data-tooltip-id={`event-${i}-${date}`}>
                    •
                    <Tooltip id={`event-${i}-${date}`} 
                            content={`${event.title}\n${event.notes}`} />
                  </div>
                ))}
              </div>
            ) : null;
          }}
        />
      </div>
    );
  };

  const handleCommunicationSubmit = async (formData) => {
    try {
      await Promise.all(selectedCompanies.map(companyId => 
        axios.post(`/api/companies/${companyId}/communications`, formData)
      ));
  
      const companyResponse = await axios.get('/api/companies');
      setCompanies(companyResponse.data);
      setShowCommunicationModal(false);
      setSelectedCompanies([]);
    } catch (error) {
      console.error('Error logging communication:', error);
    }
  };

  const CommunicationModal = () => {
    const [formData, setFormData] = useState({
      type: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });

    if (!showCommunicationModal) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">Log Communication</h2>
          <div className="modal-body">
            <div className="form-group">
              <label>Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="form-control"
              >
                <option value="">Select type...</option>
                {communicationMethods.map(method => (
                  <option key={method._id} value={method.name}>{method.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="form-control"
                rows={3}
              />
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowCommunicationModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleCommunicationSubmit(formData)}
                className="btn btn-primary"
                disabled={!formData.type || !formData.date || !formData.notes}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="notification-badges">
          <span className="badge badge-danger">
            {notifications.overdue} Overdue
          </span>
          <span className="badge badge-warning">
            {notifications.today} Due Today
          </span>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Companies</h2>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowCalendarView(!showCalendarView)}
          >
            {showCalendarView ? 'Hide Calendar' : 'Show Calendar'}
          </button>
        </div>
        <div className="card-content">
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        setSelectedCompanies(e.target.checked ? companies.map(c => c._id) : []); 
                      }}
                    />
                  </th>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>Last Five Communications</th>
                  <th>Next Due</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr
                    key={company._id}
                    className={getHighlightClass(company)}
                  >
                    <td>
                      <input 
                        type="checkbox"
                        checked={selectedCompanies.includes(company._id)}
                        onChange={(e) => {
                          setSelectedCompanies(e.target.checked 
                            ? [...selectedCompanies, company._id]
                            : selectedCompanies.filter(id => id !== company._id)
                          );
                        }}
                      />
                    </td>
                    <td>{company.name}</td>
                    <td>{company.location}</td>
                    <td className="communications-list">
                      {getLastFiveCommunications(company)}
                    </td>
                    <td>
  {/* Display periodicity value and unit as is */}
  {company.communicationPeriodicity 
    ? `${company.communicationPeriodicity.value} ${company.communicationPeriodicity.unit}`
    : 'N/A'}
</td>
               
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button
          className="btn btn-primary"
          disabled={selectedCompanies.length === 0}
          onClick={() => setShowCommunicationModal(true)}
        >
          Communication Performed
        </button>
      </div>

      <CommunicationModal />
      <CalendarView />
    </div>
  );
};

export default Dashboard;
