import React from 'react';
import MqttDashboard from '../components/Hook'
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <MqttDashboard />
    </div>
  );
}

export default Dashboard;