from openai import OpenAI 
from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) 

class Implementation:
    
    def __init__(self):
        self.prompt_field = ""
        self.output_label = ""
        self.system_input = '''You are an expert in texas hold'em, trying to teach a friend how to play in real-time.
        If your friend asks you a general question about texas hold'em, you should answer the question in 1-2 sentences.
        If your friend gives you just a poker hand and no other information, 
        you are to do the following 4 tasks:
        1. say just a single word recommendation for your friend (no need to say "recommendation: raise", your friend will understand): 
        fold, check, raise
        2. give a short, 1-sentence explanation of your previously recommended move
        3. In 1-sentence, list what type of cards your friend would want to see on the flop, turn, or river, 
        and why those cards would help strengthen their hand.
        4. Then, in 1-sentence, list what other players could have that would beat your friend's hand.
        After writing each task, always start writing the next task in a new line and number each task in the beginning of the line.
        '''

    
    def generate(self, prompt, sinput):

        password = "nothing"
        MODEL="gpt-4o"
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", password))

        
        self.prompt_field = prompt
        api_key = password
        completion = client.chat.completions.create(
            model=MODEL,
            messages = [
                {"role": "system", "content": sinput},
                {"role": "user", "content": self.prompt_field}
            ],
        )
        
        return completion.choices[0].message.content
    
    

impl = Implementation()

@app.route('/generatehandanalysis', methods = ['POST'])
def handanalysis():
    system_input = '''You are an expert in texas hold'em, trying to teach a friend how to play in real-time.
        Your friend gives you just a poker hand and no other information, 
        you are to do the following 4 tasks:
        1. say just a single word recommendation for your friend (no need to say "recommendation: raise", your friend will understand): 
        fold, check, raise
        2. give a short, 1-sentence explanation of your previously recommended move
        3. In 1-sentence, list what type of cards your friend would want to see on the flop, turn, or river, 
        and why those cards would help strengthen their hand.
        4. Then, in 1-sentence, list what other players could have that would beat your friend's hand.
        After writing each task, always start writing the next task in a new line and number each task in the beginning of the line.
        '''
    prompt = request.data.decode('utf-8')
    output = impl.generate(prompt, system_input)
    return output, 200, {'Content-Type': 'text/plain'}

@app.route('/generategeneralquestion', methods = ['POST'])
def generalquestion():
    system_input = '''You are an expert in texas hold'em, trying to teach a friend how to play in real-time.
        You should answer your friend's general question about texas hold'em, you should answer the question in 1-3 sentences.'''
    prompt = request.data.decode('utf-8')
    output = impl.generate(prompt, system_input)
    return output, 200, {'Content-Type': 'text/plain'}



if __name__ == "__main__":
    app.run()