import turtle
import pandas as pd

sc = turtle.Screen()

sc.title("Indian states guessing game")
image = "india_map.gif"
sc.addshape(image)
turtle.shape(image)

df = pd.read_csv("India States.csv")
all_states = df.state.to_list()
guessed = []
while len(guessed) <= 29:
    answer = sc.textinput(title=f"{len(guessed)}/29 States correct", prompt="Whats the name of the state")
    ans = answer.title()

    if ans in all_states:
        guessed.append(ans)
        t1 = turtle.Turtle()
        t1.hideturtle()
        t1.penup()
        state_data = df[df.state == ans]
        t1.goto(int(state_data.x), int(state_data.y))
        t1.write(ans)

sc.exitonclick()
