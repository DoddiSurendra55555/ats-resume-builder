export const fetchOptimizedResume = async (apiKey, baseResume, jobDescription) => {
    const response = await fetch('http://127.0.0.1:5000/api/optimize', {
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