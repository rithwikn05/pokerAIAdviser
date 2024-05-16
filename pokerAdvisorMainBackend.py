import callsToGPT

#Instantiate the Implementation class
x = callsToGPT.Implementation()

userInput = "jack 4, both cards are spades"

gptOutput = x.run(userInput)

print(gptOutput)