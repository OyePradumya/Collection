from tkinter import *

from tkinter import ttk

# function which executes on clicking Add Button


def get_sum(*args):
    try:
        num_1_val = float(num_1.get())
        num_2_val = float(num_2.get())
        solution.set(num_1_val + num_2_val)
    except ValueError:
        pass

# function which executes on clicking Product Button


def get_product(*args):
    try:
        num_1_val = float(num_1.get())
        num_2_val = float(num_2.get())
        solution.set(num_1_val * num_2_val)

    except ValueError:
        pass

# function which executes on clicking Subtract Button


def get_difference(*args):
    try:
        num_1_val = float(num_1.get())
        num_2_val = float(num_2.get())
        solution.set(num_1_val - num_2_val)

    except ValueError:
        pass

# function which executes on clicking division Button


def get_division(*args):
    try:
        num_1_val = float(num_1.get())
        num_2_val = float(num_2.get())
        solution.set(num_1_val / num_2_val)

    except ValueError:
        pass

# function which executes on clicking clear button


def clear_input(*args):
    # the below line clears value present in num_1_entry,
    #  num_2_entry, solution entry in order to perform new calculation
    num_1_entry.delete(0, 'end')
    num_2_entry.delete(0, 'end')
    solution_entry.delete(0, 'end')


root = Tk()


root.title("Calculator")


frame = ttk.Frame(root, padding="100 100 100 100")


frame.grid(column=0, row=0, sticky=(N, W, E, S))
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)


# Declare tkinter variables which are string in this case
num_1 = StringVar()
num_2 = StringVar()
solution = StringVar()

# create an input field which can take 7 characters
# and the value is stored inside variable num_1
num_1_entry = ttk.Entry(frame, width=7, textvariable=num_1)

num_1_entry.grid(column=1, row=1, sticky=(W, E))

ttk.Label(frame, text='+').grid(column=2, row=1, sticky=(W, E))

# create an input field which can take 7 characters
# and the value is stored inside variable num_2
num_2_entry = ttk.Entry(frame, width=7, textvariable=num_2)

num_2_entry.grid(column=3, row=1, sticky=(W, E))

ttk.Button(frame, text="Add", command=get_sum).grid(
    column=1, row=2, sticky=(W, E))

ttk.Button(frame, text="Multiply", command=get_product).grid(
    column=1, row=3, sticky=(W, E))
ttk.Button(frame, text="divide", command=get_division).grid(
    column=1, row=4, sticky=(W, E))
ttk.Button(frame, text="subtract", command=get_difference).grid(
    column=1, row=5, sticky=(W, E))
ttk.Button(frame, text="clear", command=clear_input).grid(
    column=1, row=6, sticky=(W, E))


# create an input field which can take 7 characters
# and the value is stored inside variable solution
solution_entry = ttk.Entry(frame, width=7, textvariable=solution)

solution_entry.grid(column=3, row=2, sticky=(W, E))

num_1_entry.focus()

root.mainloop()
