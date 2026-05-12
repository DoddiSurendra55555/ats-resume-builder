export const fetchOptimizedResume = async (apiKey, baseResume, jobDescription) => {
    const response = await fetch('https://ats-resume-builder-backend-9dj5.onrender.com/api/optimize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, baseResume, jobDescription }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to optimize resume');
    }

    return await response.json();
};