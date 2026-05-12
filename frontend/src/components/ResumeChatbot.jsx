import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ResumeChatbot = () => {
    const { apiKey, generatedData, setGeneratedData } = useAppContext();
    const [prompt, setPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // HARDCODED PRODUCTION URL
    const API_BASE_URL = 'https://ats-resume-builder-backend-9dj5.onrender.com';

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsEditing(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/chat-edit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    apiKey, 
                    resumeData: generatedData, 
                    prompt 
                })
            });
            
            if (!response.ok) throw new Error("Failed to apply changes");
            const updatedResume = await response.json();
            setGeneratedData(updatedResume); 
            setPrompt(''); 
        } catch (error) {
            alert(error.message);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content', position: 'sticky', top: '20px', transition: 'all 0.3s ease' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '16px', borderBottom: '2px solid var(--border-color)', paddingBottom: '8px' }}>
                🤖 AI Co-Pilot
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                Want changes? Ask the AI to rewrite bullets, make the tone more aggressive, or format the experience section!
            </p>
            
            <form onSubmit={handleChatSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                    rows="4"
                    placeholder='e.g., "Make my summary sound more technical" or "Shorten the bullets"'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: '14px', resize: 'none' }}
                />
                <button 
                    type="submit" 
                    disabled={isEditing}
                    style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: isEditing ? 'not-allowed' : 'pointer', opacity: isEditing ? 0.7 : 1 }}
                >
                    {isEditing ? 'Applying Changes...' : 'Ask AI to Update Resume'}
                </button>
            </form>
        </div>
    );
};

export default ResumeChatbot;