import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from '../utils/PdfGenerator';
import InterviewQA from './InterviewQA';
import ResumeChatbot from './ResumeChatbot';
import styles from './ResumePreview.module.css';

const ResumePreview = () => {
    const { generatedData, setGeneratedData } = useAppContext();

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
    };

    useEffect(() => {
        if (generatedData) {
            setTimeout(() => {
                const textareas = document.querySelectorAll('textarea');
                textareas.forEach(ta => {
                    ta.style.height = 'auto';
                    ta.style.height = ta.scrollHeight + 'px';
                });
            }, 100);
        }
    }, [generatedData]);

    if (!generatedData) return null;

    const handlePersonalInfo = (field, value) => {
        setGeneratedData({ ...generatedData, personal_info: { ...generatedData.personal_info, [field]: value } });
    };

    const handleSummary = (value) => setGeneratedData({ ...generatedData, summary: value });

    // NEW: Education Updater
    const handleEdu = (index, field, value) => {
        const newEdu = [...(generatedData.education || [])];
        if (!newEdu[index]) newEdu[index] = {};
        newEdu[index][field] = value;
        setGeneratedData({ ...generatedData, education: newEdu });
    };

    const handleSkill = (index, value) => {
        const newSkills = [...generatedData.skills];
        newSkills[index] = value;
        setGeneratedData({ ...generatedData, skills: newSkills });
    };

    const handleExp = (expIndex, field, value) => {
        const newExp = [...generatedData.experience];
        newExp[expIndex][field] = value;
        setGeneratedData({ ...generatedData, experience: newExp });
    };

    const handleBullet = (expIndex, bulletIndex, value) => {
        const newExp = [...generatedData.experience];
        newExp[expIndex].achievements[bulletIndex] = value;
        setGeneratedData({ ...generatedData, experience: newExp });
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className={styles.controls} style={{ maxWidth: '100%', marginBottom: '20px' }}>
                <button className={`${styles.btn} ${styles['btn-secondary']}`} onClick={() => setGeneratedData(null)}>
                    &larr; Start Over
                </button>
                <PDFDownloadLink 
                    document={<ResumePDF data={generatedData} />} 
                    fileName={`${generatedData.personal_info?.name || 'Optimized'}_Resume.pdf`}
                    className={`${styles.btn} ${styles['btn-primary']}`}
                    style={{ textDecoration: 'none' }}
                >
                    {({ loading }) => (loading ? 'Preparing Document...' : 'Download PDF')}
                </PDFDownloadLink>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '30px', alignItems: 'start' }}>
                
                {/* Left Side: Resume */}
                <div className={styles['document-container']} style={{ margin: 0, width: '100%', boxSizing: 'border-box' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px', color: '#6b7280', fontSize: '14px', fontStyle: 'italic' }}>
                        Click anywhere to edit. You can now drag the bottom right corner of any text box to manually resize it!
                    </div>

                    <div className={styles.header}>
                        <input className={`${styles['editable-input']} ${styles['name-input']}`} value={generatedData.personal_info?.name || ''} onChange={(e) => handlePersonalInfo('name', e.target.value)} />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <input className={`${styles['editable-input']} ${styles['contact-input']}`} value={generatedData.personal_info?.email || ''} onChange={(e) => handlePersonalInfo('email', e.target.value)} />
                            <span>|</span>
                            <input className={`${styles['editable-input']} ${styles['contact-input']}`} value={generatedData.personal_info?.phone || ''} onChange={(e) => handlePersonalInfo('phone', e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <input className={`${styles['editable-input']} ${styles['contact-input']}`} value={generatedData.personal_info?.linkedin || ''} onChange={(e) => handlePersonalInfo('linkedin', e.target.value)} />
                            <span>|</span>
                            <input className={`${styles['editable-input']} ${styles['contact-input']}`} value={generatedData.personal_info?.github || ''} onChange={(e) => handlePersonalInfo('github', e.target.value)} />
                        </div>
                    </div>

                    <h2 className={styles['section-title']}>Professional Summary</h2>
                    <textarea 
                        className={`${styles['editable-textarea']} ${styles['summary-input']}`}
                        value={generatedData.summary || ''}
                        onChange={(e) => handleSummary(e.target.value)}
                        onInput={autoResize}
                        style={{ minHeight: '60px', overflow: 'auto' }} 
                    />

                    {/* NEW: Education Section */}
                    {generatedData.education && generatedData.education.length > 0 && (
                        <>
                            <h2 className={styles['section-title']}>Education</h2>
                            {generatedData.education.map((edu, index) => (
                                <div key={index} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <input className={`${styles['editable-input']}`} value={edu.degree || ''} onChange={(e) => handleEdu(index, 'degree', e.target.value)} style={{ width: '60%', fontWeight: 'bold', fontSize: '15px' }} />
                                        <input className={`${styles['editable-input']}`} value={edu.graduationDate || ''} onChange={(e) => handleEdu(index, 'graduationDate', e.target.value)} style={{ width: '30%', textAlign: 'right', fontSize: '14px', color: '#4b5563' }} />
                                    </div>
                                    <input className={`${styles['editable-input']}`} value={edu.school || ''} onChange={(e) => handleEdu(index, 'school', e.target.value)} style={{ width: '100%', fontSize: '14px', fontStyle: 'italic', marginTop: '2px' }} />
                                </div>
                            ))}
                        </>
                    )}

                    <h2 className={styles['section-title']}>Technical Skills</h2>
                    <div className={styles['skills-list']}>
                        {generatedData.skills?.map((skill, index) => (
                            <input key={index} className={`${styles['editable-input']} ${styles['skill-input']}`} value={skill} onChange={(e) => handleSkill(index, e.target.value)} />
                        ))}
                    </div>

                    <h2 className={styles['section-title']}>Work Experience</h2>
                    {generatedData.experience?.map((exp, expIndex) => (
                        <div key={expIndex} style={{ marginBottom: '20px' }}>
                            <div className={styles['job-header']} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexGrow: 1, gap: '4px' }}>
                                    <input className={`${styles['editable-input']} ${styles['job-title-input']}`} value={exp.role} onChange={(e) => handleExp(expIndex, 'role', e.target.value)} style={{ width: '40%' }} />
                                    <span>at</span>
                                    <input className={`${styles['editable-input']} ${styles['job-title-input']}`} value={exp.company} onChange={(e) => handleExp(expIndex, 'company', e.target.value)} style={{ width: '50%' }} />
                                </div>
                                <input className={`${styles['editable-input']} ${styles['job-date-input']}`} value={exp.duration} onChange={(e) => handleExp(expIndex, 'duration', e.target.value)} />
                            </div>
                            
                            <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                                {exp.achievements.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex} style={{ marginBottom: '4px' }}>
                                        <textarea 
                                            className={`${styles['editable-textarea']} ${styles['bullet-input']}`}
                                            value={bullet}
                                            onChange={(e) => handleBullet(expIndex, bulletIndex, e.target.value)}
                                            onInput={autoResize}
                                            style={{ minHeight: '1.5em', display: 'block', width: '100%', overflow: 'auto' }} 
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <ResumeChatbot />

            </div>

            <InterviewQA />
        </div>
    );
};

export default ResumePreview;