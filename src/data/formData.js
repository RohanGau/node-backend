const data = {
    "name": "Health Survey (Branching Demo)",
    "description": "A simplified survey demonstrating conditional questions.",
    "questions": [
        {
            "id": "q_smoke_status",  // Unique ID for this question
            "text": "Do you smoke regularly?",
            "fieldType": "select",  // This type implies answerOptions
            "answerOptions": [
                {
                    "id": "opt_smoke_yes",
                    "value": "yes",
                    "label": "Yes, I do",
                    "nextQuestionId": "q_smoking_duration" // This links to the ID of the next question
                },
                {
                    "id": "opt_smoke_no",
                    "value": "no",
                    "label": "No, I don't",
                    "nextQuestionId": null // Or just omit this field if no next question
                }
            ]
        },
        {
            "id": "q_smoking_duration", // This ID is referenced by "opt_smoke_yes" above
            "text": "For how many years have you been smoking?",
            "fieldType": "text", // This type typically doesn't have answerOptions for branching
            "answerOptions": [] // Keep empty array if not a 'select' type
        },
        {
            "id": "q_exercise_freq", // Another independent question (won't appear unless explicitly linked or first)
            "text": "How often do you exercise per week?",
            "fieldType": "text",
            "answerOptions": []
        }
    ]
}