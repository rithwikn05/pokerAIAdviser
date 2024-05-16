from openai import OpenAI 
import os

class Implementation:
    
    def __init__(self):
        self.prompt_field = ""
        self.output_label = ""
        self.system_input = '''You are an expert in texas hold'em, trying to teach a friend how to play in real-time.
        If your friend asks you a simple question about texas hold'em, you should answer the question in 1-2 sentences.
        If your friend gives you a poker hand and context of the board, 
        you are to do the following 4 tasks:
        1. choose a single word recommendation for your friend: 
        fold, check, raise
        2. After that single word recomendation, you should give a short, 
        1-sentence explanation of your previous recommended move.
        3. Then, in 1-sentence, list what type of cards your friend would want to see on the flop, turn, or river, 
        and why those cards would help strengthen their hand.
        4. Then, in 1-sentence, list what other players could have that would beat your friend's hand.
        After writing each task, always start writing the next task in a new line and number each task in the beginning of the line.
        '''


    def sayHi(self):
        print("hii")
    
    def generate(self, prompt):

        password = "nothing"

        MODEL="gpt-4o"
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", password))

        
        self.prompt_field = prompt
        api_key = password
        url = "https://api.openai.com/v1/chat/completions"
        headers = {"Authorization": f"Bearer {api_key}"}
        completion = client.chat.completions.create(
            model=MODEL,
            messages = [
                {"role": "system", "content": self.system_input},
                {"role": "user", "content": self.prompt_field}
            ],
        )
        #response = requests.post(url, headers=headers, json=parameters)
        
        print(completion.choices[0].message.content)

    def run(self, userInput):
        self.generate(userInput)