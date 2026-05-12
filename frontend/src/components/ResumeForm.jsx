import { useAppContext } from '../context/AppContext';
import styles from './ResumeForm.module.css';

const ResumeForm = () => {
    const { 
        theme, apiKey, setApiKey, personalInfo, setPersonalInfo,
        education, setEducation, experience, setExperience,
        skills, setSkills, jobDescription, setJobDescription, 
        setGeneratedData, setLoading, loading, streamText, setStreamText
    } = useAppContext();

    // Use the Vercel Environment Variable for the API URL
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    const handleInfoChange = (e) => setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });

    const handleArrayChange = (index, field, value, setter, array) => {
        const newArray = [...array];
        newArray[index][field] = value;
        setter(newArray);
    };

    const addArrayItem = (setter, array, emptyObj) => setter([...array, emptyObj]);
    const removeArrayItem = (index, setter, array) => setter(array.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStreamText(''); 
        
        try {
            const combinedBaseResume = `
                Name: ${personalInfo.name}
                Email: ${personalInfo.email}
                Phone: ${personalInfo.phone}
                LinkedIn: ${personalInfo.linkedin}
                GitHub: ${personalInfo.github}

                EDUCATION:
                ${education.map(ed => `- Degree: ${ed.degree}, School: ${ed.school}, Grad Date: ${ed.graduationDate}`).join('\n')}

                EXPERIENCE & PROJECTS:
                ${experience.map(ex => `- Role: ${ex.role}, Company: ${ex.company}, Dates: ${ex.dates}\n  Details: ${ex.description}`).join('\n')}

                SKILLS:
                ${skills}
            `;

            const response = await fetch(`${API_BASE_URL}/api/optimize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey, baseResume: combinedBaseResume, jobDescription }),
            });

            if (!response.ok) throw new Error("Connection failed. Please try again.");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullStream = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                fullStream += chunk;
                setStreamText(fullStream); 
            }

            const finalData = JSON.parse(fullStream);
            setGeneratedData(finalData);

        } catch (error) {
            alert("The server is waking up or connection failed. Please wait 30 seconds and try again!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ maxWidth: '900px', margin: '40px auto', backgroundColor: '#111827', borderRadius: '8px', padding: '30px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #374151', paddingBottom: '16px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                    <span style={{ color: '#9ca3af', marginLeft: '8px', fontFamily: 'monospace', fontSize: '14px' }}>Gemini 2.5 Agent Streaming...</span>
                </div>
                <pre style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap', minHeight: '300px', maxHeight: '500px', overflowY: 'auto' }}>
                    {streamText || "Establishing secure connection to Render Backend...\nWaiting for AI Cold Boot...\nAnalyzing Input...\n\n"}
                    <span className="cursor-blink">|</span>
                </pre>
                <style>{`@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } } .cursor-blink { animation: blink 1s step-end infinite; }`}</style>
            </div>
        );
    }

    return (
        <div className={styles['form-container']}>
            <h2 className={styles['form-title']}>Optimize Your Resume</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>Gemini API Key (BYOK)</label>
                    <input type="password" className={styles['form-input']} placeholder="Paste your API key..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} required />
                </div>

                <h3 className={styles['section-title']}>Personal Information</h3>
                <div className={styles['grid-2-col']}>
                    <div className={styles['form-group']}><label className={styles['form-label']}>Full Name</label><input type="text" name="name" className={styles['form-input']} value={personalInfo.name} onChange={handleInfoChange} required /></div>
                    <div className={styles['form-group']}><label className={styles['form-label']}>Email</label><input type="email" name="email" className={styles['form-input']} value={personalInfo.email} onChange={handleInfoChange} required /></div>
                    <div className={styles['form-group']}><label className={styles['form-label']}>Phone</label><input type="tel" name="phone" className={styles['form-input']} value={personalInfo.phone} onChange={handleInfoChange} required /></div>
                    <div className={styles['form-group']}><label className={styles['form-label']}>LinkedIn</label><input type="url" name="linkedin" className={styles['form-input']} value={personalInfo.linkedin} onChange={handleInfoChange} /></div>
                </div>

                <div style={{ backgroundColor: theme === 'dark' ? '#451a03' : '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '12px', marginTop: '24px', marginBottom: '16px', borderRadius: '4px', fontSize: '13px', color: theme === 'dark' ? '#fde68a' : '#92400e' }}>
                    <strong>💡 Pro Tip:</strong> Include <strong>Dates</strong> and <strong>Metrics</strong> for a 90+ ATS score!
                </div>

                {/* EDUCATION SECTION */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 className={styles['section-title']} style={{ margin: 0, border: 'none' }}>Education</h3>
                    <button type="button" onClick={() => addArrayItem(setEducation, education, { degree: '', school: '', graduationDate: '' })} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>+ Add Education</button>
                </div>
                {education.map((ed, index) => (
                    <div key={index} style={{ border: '1px solid var(--border-color)', padding: '15px', borderRadius: '8px', marginBottom: '10px', position: 'relative', backgroundColor: 'var(--bg-secondary)' }}>
                        {index > 0 && <button type="button" onClick={() => removeArrayItem(index, setEducation, education)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Remove</button>}
                        <div className={styles['grid-2-col']}>
                            <div className={styles['form-group']}><label className={styles['form-label']}>Degree / Certification</label><input type="text" className={styles['form-input']} placeholder="e.g. B.Tech Computer Science" value={ed.degree} onChange={(e) => handleArrayChange(index, 'degree', e.target.value, setEducation, education)} required /></div>
                            <div className={styles['form-group']}><label className={styles['form-label']}>College / Institution</label><input type="text" className={styles['form-input']} placeholder="e.g. Kalasalingam Academy" value={ed.school} onChange={(e) => handleArrayChange(index, 'school', e.target.value, setEducation, education)} required /></div>
                            <div className={styles['form-group']}><label className={styles['form-label']}>Graduation Date</label><input type="text" className={styles['form-input']} placeholder="e.g. May 2027" value={ed.graduationDate} onChange={(e) => handleArrayChange(index, 'graduationDate', e.target.value, setEducation, education)} required /></div>
                        </div>
                    </div>
                ))}

                {/* EXPERIENCE SECTION */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', marginBottom: '16px' }}>
                    <h3 className={styles['section-title']} style={{ margin: 0, borderBottom: 'none' }}>Experience & Projects</h3>
                    <button type="button" onClick={() => addArrayItem(setExperience, experience, { role: '', company: '', dates: '', description: '' })} style={{ background: '#3b82f6', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Experience</button>
                </div>
                {experience.map((exp, index) => (
                    <div key={index} style={{ border: '1px solid var(--border-color)', padding: '20px', borderRadius: '8px', marginBottom: '16px', position: 'relative', backgroundColor: 'var(--bg-secondary)', transition: 'all 0.3s ease' }}>
                        {index > 0 && <button type="button" onClick={() => removeArrayItem(index, setExperience, experience)} style={{ position: 'absolute', top: '12px', right: '12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Remove</button>}
                        <div className={styles['grid-2-col']}>
                            <div className={styles['form-group']}><label className={styles['form-label']}>Role / Job Title</label><input type="text" className={styles['form-input']} placeholder="e.g. Technical Lead" value={exp.role} onChange={(e) => handleArrayChange(index, 'role', e.target.value, setExperience, experience)} required /></div>
                            <div className={styles['form-group']}><label className={styles['form-label']}>Company / Project</label><input type="text" className={styles['form-input']} placeholder="e.g. CampusEats" value={exp.company} onChange={(e) => handleArrayChange(index, 'company', e.target.value, setExperience, experience)} required /></div>
                            <div className={styles['form-group']}><label className={styles['form-label']}>Dates (Start - End)</label><input type="text" className={styles['form-input']} placeholder="e.g. Jan 2025 - Present" value={exp.dates} onChange={(e) => handleArrayChange(index, 'dates', e.target.value, setExperience, experience)} required /></div>
                        </div>
                        <div className={styles['form-group']}>
                            <label className={styles['form-label']}>Description & Metrics</label>
                            <textarea rows="3" className={styles['form-input']} placeholder="List your achievements here. Remember to include numbers! (e.g. Led a team of 4...)" value={exp.description} onChange={(e) => handleArrayChange(index, 'description', e.target.value, setExperience, experience)} required />
                        </div>
                    </div>
                ))}

                <h3 className={styles['section-title']}>Target Job & Skills</h3>
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>Technical Skills (Comma separated)</label>
                    <input type="text" className={styles['form-input']} placeholder="React, Python, Machine Learning, Flask..." value={skills} onChange={(e) => setSkills(e.target.value)} required />
                </div>
                <div className={styles['form-group']}>
                    <label className={styles['form-label']}>Target Job Description</label>
                    <textarea rows="4" className={styles['form-input']} placeholder="Paste the requirements of the job you are applying for..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
                </div>

                <button type="submit" disabled={loading} className={`${styles['submit-btn']} ${styles['btn-active']}`} style={{ marginTop: '30px' }}>
                    Generate Professional Resume
                </button>
            </form>
        </div>
    );
};

export default ResumeForm;