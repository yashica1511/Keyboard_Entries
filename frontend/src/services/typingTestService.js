import axios from 'axios';

export const saveTypingTestResult = async (data) => {
    try {
        const token = localStorage.getItem('authToken');
        console.log('Retrieved token:', token);
        if (!token) {
            throw new Error('Token is missing. Please log in.');
        }

        console.log('Saving typing test result:', data);
        
        const response = await axios.post('https://keyboard-typing-test-3.onrender.com/api/typing/save-result', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Request headers:', {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received from server:', error.request);
        } else {
            console.error('Error in request setup:', error.message);
        }
        throw error;
    }
};

export const fetchTypingTestResults = async () => {
    try {
        const response = await axios.get('https://keyboard-typing-test-3.onrender.com/api/typing/fetch-results', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.data && response.data.results) {
            console.log('Fetched Results:', response.data.results);
            const recentResults = response.data.results.slice(-5);
            const processedResults = recentResults.map(result => ({
                wpm: result.wpm || 0,
                accuracy: result.accuracy || 0,
            }));

            console.log('Processed Results (WPM & Accuracy):', processedResults);
            return processedResults;
        } else {
            console.error('Error: Results not found in response');
            return [];
        }
    } catch (error) {
        console.error('Error fetching typing test results:', error);
        throw error;
    }
};
