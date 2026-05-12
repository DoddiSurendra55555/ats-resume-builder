/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // --- Theme State ---
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');

    // Automatically update the HTML root attribute when theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // --- Resume States ---
    const [apiKey, setApiKey] = useState('');
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '', linkedin: '', github: '' });
    const [education, setEducation] = useState([{ degree: '', school: '', graduationDate: '' }]);
    const [experience, setExperience] = useState([{ role: '', company: '', dates: '', description: '' }]);
    const [skills, setSkills] = useState('');

    const [jobDescription, setJobDescription] = useState('');
    const [generatedData, setGeneratedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [interviewQA, setInterviewQA] = useState(null);
    const [loadingQA, setLoadingQA] = useState(false);

    const value = {
        theme, toggleTheme, // Export the new theme functions
        apiKey, setApiKey,
        personalInfo, setPersonalInfo,
        education, setEducation,
        experience, setExperience,
        skills, setSkills,
        jobDescription, setJobDescription,
        generatedData, setGeneratedData,
        loading, setLoading,
        streamText, setStreamText,
        interviewQA, setInterviewQA,
        loadingQA, setLoadingQA
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};