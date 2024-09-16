import requests
import json

def fetch_definition_data(disease_name):
    re = f"How to counter {disease_name}"
    api_url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAiNvxZPylhs7AJUTvb2oVCQetwUWOpLv8'
    
    headers = {'Content-Type': 'application/json'}
    body = {"contents": [{"role": "user", "parts": [{"text": re}]}]}
    
    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(body))
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()
        
        # Access the returned text
        return data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'No suggestions found.')
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching suggestions: {e}")
        return 'Error fetching suggestions.'
