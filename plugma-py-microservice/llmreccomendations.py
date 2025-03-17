from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
prompt = "You are an event organizer with seasoned expierience. I want you to look at this dataset of recent events and provide unqiue insights not found by typical ML analysis such as trends in "
def get_recommendations(prompt):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )