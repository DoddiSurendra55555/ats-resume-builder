import { useAppContext } from '../context/AppContext';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

const Builder = () => {
  const { generatedData } = useAppContext();

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>ATS Resume Builder</h1>
        <p style={{ color: '#4b5563', marginTop: '8px' }}>Tailored by Google Gemini AI</p>
      </header>
      
      {/* If we have AI data, show Preview. Otherwise, show Form. */}
      {generatedData ? <ResumePreview /> : <ResumeForm />}
    </div>
  );
};

export default Builder;