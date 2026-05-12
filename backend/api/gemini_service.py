import json
import google.generativeai as genai

def generate_optimized_resume_stream(api_key, base_resume, job_description):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        generation_config={
            "temperature": 0.2,
            "response_mime_type": "application/json",
        }
    )
    prompt = f"""
    You are an expert ATS resume writer, write the resumec like it should get 80-90% match,optimized for the provided job description., the resume should be well formatted and professional looking, and should include relevant keywords from the job description while accurately representing the candidate's experience and skills. the format is the most important part and should be strictly followed, do not add or remove any sections that are in the base resume, only optimize the content within those sections.the sections should not overlap each other so format them correctly and make sure the json structure is strictly followed.
    Return ONLY a JSON object with this exact structure:
    {{
        "personal_info": {{"name": "", "email": "", "phone": "", "linkedin": "", "github": ""}},
        "summary": "Professional summary...",
        "education": [
            {{
                "degree": "Degree Name",
                "school": "School Name",
                "graduationDate": "Dates"
            }}
        ],
        "skills": ["Skill 1", "Skill 2"],
        "experience": [
            {{
                "role": "Job Title",
                "company": "Company Name",
                "duration": "Dates",
                "achievements": ["Bullet 1", "Bullet 2"]
            }}
        ]
    }}
    Base Resume: {base_resume}
    Job Description: {job_description}
    """
    response = model.generate_content(prompt, stream=True)
    return response

def generate_interview_qa(api_key, resume_data, job_description):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        generation_config={
            "temperature": 0.7, 
            "response_mime_type": "application/json",
        }
    )
    prompt = f"""
    You are an expert technical interviewer and career coach.
    Based on the following applicant's resume JSON and the target job description, generate 5 highly probable interview questions the candidate might be asked. 
    Provide a suggested strong answer for each question, utilizing the STAR method (Situation, Task, Action, Result) where appropriate, drawing strictly from the experiences listed in their resume.

    Resume JSON:
    {json.dumps(resume_data)}

    Job Description:
    {job_description}

    Return ONLY a JSON array of objects with the keys 'question' and 'answer'.
    """
    response = model.generate_content(prompt)
    return response.text

def edit_resume_with_ai(api_key, resume_data, user_prompt):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        generation_config={
            "temperature": 0.2, 
            "response_mime_type": "application/json",
        }
    )
    prompt = f"""
    You are an expert ATS Resume Editor. 
    Here is the candidate's current resume JSON:
    {json.dumps(resume_data)}

    The user has requested the following change: "{user_prompt}"

    Apply this change to the resume JSON. You can rewrite bullets, format sections, change the tone, or add/remove skills based strictly on their request. 
    Do NOT change the underlying schema structure.
    Return ONLY the completely updated JSON object.
    """
    response = model.generate_content(prompt)
    return response.text