document.getElementById('resumeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        careerGoals: formData.get('careerGoals'),
        experience: formData.get('experience'),
        skills: formData.get('skills')
    };
    try {
        const response = await fetch('/functions/api/handler.ts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById('resumeOutput').innerHTML = result.template;
        document.getElementById('result').classList.remove('hidden');
    } catch (error) {
        console.error('Error generating resume:', error);
    }
});
