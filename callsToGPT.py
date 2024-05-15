class Implementation:
    def __init__(self):
        self.prompt_field = ""
        self.output_label = ""
        self.system_input = '''You are an expert in texas hold'em. Given a certain poker hand and
        context of the game, you are to give a recommended move and advise the player on possible considerations'''

    def generate(self):
        my_prompt = self.prompt_field.name
        api_key = ""
        url = "https://api.openai.com/v1/chat/completions"
        headers = {"Authorization":f"Bearer {api_key}"}
        parameters = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": self.system_input},
                {"role": "user", "content": my_prompt}
            ],
        }
        response = requests.post(url, headers = headers, json = parameters)
        response_data = response.json()
        if response.status_code == 200:
            generated_text = response_data["choices"][0]["messages"]["content"]
            self.output_label = generated_text