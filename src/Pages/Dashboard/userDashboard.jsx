import React, { useState } from 'react';
import './UserDashboard.css';

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

const OverviewTab = () => (
    <div className="overview-tab">
        <div className="stats-grid">
            <div className="stat-card">
                <h3>Total Vettings</h3>
                <p className="stat-number">152</p>
            </div>
            <div className="stat-card">
                <h3>Completed</h3>
                <p className="stat-number">89</p>
            </div>
            <div className="stat-card">
                <h3>In Progress</h3>
                <p className="stat-number">63</p>
            </div>
            <div className="stat-card">
                <h3>Success Rate</h3>
                <p className="stat-number">78%</p>
            </div>
        </div>
        <div className="recent-activity">
            <h2>Recent Activity</h2>
            <ul>
                <li>Completed vetting for Project X</li>
                <li>Started new vetting process for Client Y</li>
                <li>Updated profile information</li>
            </ul>
        </div>
    </div>
);

const SettingsTab = () => (
    <div className="settings-tab">
        <h2>Account Settings</h2>
        <form>
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" defaultValue="John Doe" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <button type="submit" className="btn">Save Changes</button>
        </form>
    </div>
);

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

const SecurityTab = () => (
    <div className="security-tab">
        <h2>Security Settings</h2>
        <div className="password-change">
            <h3>Change Password</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" />
                </div>
                <button type="submit" className="btn">Change Password</button>
            </form>
        </div>
        <div className="two-factor-auth">
            <h3>Two-Factor Authentication</h3>
            <p>Enhance your account security by enabling two-factor authentication.</p>
            <button className="btn btn-secondary">Enable 2FA</button>
        </div>
    </div>
);

export default UserDashboard;