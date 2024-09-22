import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';

// Simple Alert component
const Alert = ({ variant, children }) => (
    <div className={`alert ${variant}`} style={{
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        color: variant === 'error' ? '#721c24' : '#155724',
        backgroundColor: variant === 'error' ? '#f8d7da' : '#d4edda',
        border: `1px solid ${variant === 'error' ? '#f5c6cb' : '#c3e6cb'}`
    }}>
        {children}
    </div>
);

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'settings':
                return <SettingsTab />;
            case 'appearance':
                return <AppearanceTab />;
            case 'security':
                return <SecurityTab />;
            default:
                return <OverviewTab />;
        }
    };

    return (
        <div className="user-dashboard">
            <aside className="sidebar">
                <div className="user-profile">
                    <div className="user-avatar">
                        <img src="/api/placeholder/100/100" alt="User Avatar" />
                    </div>
                    <h2>John Doe</h2>
                    <p>john.doe@example.com</p>
                </div>
                <nav className="dashboard-nav">
                    <ul>
                        <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
                        <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
                        <li className={activeTab === 'appearance' ? 'active' : ''} onClick={() => setActiveTab('appearance')}>Appearance</li>
                        <li className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>Security</li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-content">
                <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                {renderTabContent()}
            </main>
        </div>
    );
};

const OverviewTab = () => {
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await axios.get('http://localhost:3000/api/stats');
                setStats(statsResponse.data);

                const activitiesResponse = await axios.get('http://localhost:3000/api/activities');
                setActivities(activitiesResponse.data);
            } catch (error) {
                console.error('Error fetching overview data:', error);
            }
        };

        fetchData();
    }, []);

    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overview-tab">
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Vettings</h3>
                    <p className="stat-number">{stats.totalVettings}</p>
                </div>
                <div className="stat-card">
                    <h3>Completed</h3>
                    <p className="stat-number">{stats.completedVettings}</p>
                </div>
                <div className="stat-card">
                    <h3>In Progress</h3>
                    <p className="stat-number">{stats.inProgressVettings}</p>
                </div>
                <div className="stat-card">
                    <h3>Success Rate</h3>
                    <p className="stat-number">{stats.successRate}%</p>
                </div>
            </div>
            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const SettingsTab = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user-info');
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/update-user-info', userInfo);
            alert('User information updated successfully!');
        } catch (error) {
            console.error('Error updating user info:', error);
            alert('Failed to update user information. Please try again.');
        }
    };

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="settings-tab">
            <h2>Account Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={userInfo.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value={userInfo.phone} onChange={handleChange} />
                </div>
                <button type="submit" className="btn">Save Changes</button>
            </form>
        </div>
    );
};

const AppearanceTab = () => (
    <div className="appearance-tab">
        <h2>Appearance Settings</h2>
        <div className="theme-selector">
            <h3>Theme</h3>
            <div className="theme-options">
                <button className="theme-option active">Dark</button>
                <button className="theme-option">Light</button>
                <button className="theme-option">System</button>
            </div>
        </div>
        <div className="color-selector">
            <h3>Accent Color</h3>
            <div className="color-options">
                <button className="color-option" style={{backgroundColor: '#ff7a3d'}}></button>
                <button className="color-option" style={{backgroundColor: '#3d9fff'}}></button>
                <button className="color-option" style={{backgroundColor: '#ff3d9f'}}></button>
                <button className="color-option" style={{backgroundColor: '#3dff9f'}}></button>
            </div>
        </div>
    </div>
);

const SecurityTab = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://vettingapp1.politebeach-597682cf.westus2.azurecontainerapps.io/auth/update', {
                currentPassword,
                newPassword,
            });

            setSuccess('Password Updated Successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to update Password. Please try again');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="security-tab">
            <h2>Security Settings</h2>
            <div className="password-change">
                <h3>Change Password</h3>
                {error && <Alert variant="error">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <form onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Change Password'}
                    </button>
                </form>
            </div>
            <div className="two-factor-auth">
                <h3>Two-Factor Authentication</h3>
                <p>Enhance your account security by enabling two-factor authentication.</p>
                <button className="btn btn-secondary">Enable 2FA</button>
            </div>
        </div>
    );
};

export default UserDashboard;