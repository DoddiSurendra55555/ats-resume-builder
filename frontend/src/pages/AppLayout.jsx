import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const AppLayout = () => {
    // We pull the theme and toggle logic directly into the app page!
    const { generatedData, theme, toggleTheme } = useAppContext();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* 1. Global Navbar for the Builder Route */}
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px 5%', 
                backgroundColor: 'var(--nav-bg)', 
                backdropFilter: 'blur(12px)', 
                borderBottom: '1px solid var(--border-color)', 
                position: 'sticky', 
                top: 0, 
                zIndex: 1000,
                transition: 'all 0.3s ease'
            }}>
                <Link to="/" style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', textDecoration: 'none' }}>
                    ATS Builder.
                </Link>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    
                    {/* The Theme Toggle is now available on the App page! */}
                    <button 
                        onClick={toggleTheme} 
                        style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
                        title="Toggle Light/Dark Mode"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                </div>
            </nav>

            {/* 2. Main Content Area */}
            <main style={{ padding: '40px 5%', flexGrow: 1 }}>
                
                {/* Headers now strictly use CSS variables so they never become invisible */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px', transition: 'color 0.3s ease' }}>
                        ATS Resume Builder
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px', transition: 'color 0.3s ease' }}>
                        Tailored by Google Gemini AI
                    </p>
                </div>

                {/* Conditional Rendering: Show Form OR Preview */}
                {!generatedData ? <ResumeForm /> : <ResumePreview />}
                
            </main>
        </div>
    );
};

export default AppLayout;