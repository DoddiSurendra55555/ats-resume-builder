import { useAppContext } from '../context/AppContext';

const InterviewQA = () => {
    const { interviewQA, loadingQA, apiKey, generatedData, jobDescription, setInterviewQA, setLoadingQA } = useAppContext();

    // HARDCODED PRODUCTION URL
    const API_BASE_URL = 'https://ats-resume-builder-backend-9dj5.onrender.com';

    const generateQA = async () => {
        setLoadingQA(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/generate-interview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    apiKey, 
                    resumeData: generatedData, 
                    jobDescription 
                })
            });
            
            if (!response.ok) throw new Error("Failed to generate questions");
            const data = await response.json();
            setInterviewQA(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoadingQA(false);
        }
    };

    return (
        <div style={{ maxWidth: '850px', margin: '40px auto', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>Interview Preparation</h2>
                <button 
                    onClick={generateQA}
                    disabled={loadingQA}
                    style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: loadingQA ? 'not-allowed' : 'pointer', opacity: loadingQA ? 0.7 : 1 }}
                >
                    {loadingQA ? 'Analyzing...' : (interviewQA ? 'Regenerate Q&A' : 'Generate Q&A')}
                </button>
            </div>

            {!interviewQA && !loadingQA && (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
                    Click "Generate Q&A" to predict interview questions based on your tailored resume.
                </p>
            )}

            {interviewQA && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {interviewQA.map((item, index) => (
                        <div key={index} style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
                                Q{index + 1}: {item.question}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6', fontSize: '14px' }}>
                                <span style={{ fontWeight: 'bold', color: '#10b981' }}>Suggested Answer:</span> <br/>
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InterviewQA;