import google.generativeai as genai

# Paste your API key here just for this test
genai.configure(api_key="AIzaSyAIJqgE5WE8frFQ1W6qnTDAWdPAcCkQJfE")

for m in genai.list_models():
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)