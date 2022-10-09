# Todo CLI

A simple command line Todo program written in Python. It allows you to categorize your tasks, add, remove and edit your tasks all from the command line.

## Installation and setup

```
pip install py-todo-cli
```

The `add` and `edit` commands require that you have the `VISUAL` or `EDITOR` environment variables set to your preferred text editor
- The script will default to `vim` if the `VISUAL` and `EDITOR` environment variables are empty
- But this can cause issues on Windows where vim may not be available by default
    - In that case make sure to set your `EDITOR` environment variable to notepad or your preferred text editor
    - Installing vim is recommended though

## Commands

```
Usage:
    todo
        [ -a | --all-unfinished-tasks ]
        [ -c=<val> | --category-name=<val> ]
        [ -t=<val> | --section-type=<val> ]
        [ -n=<val> | --num-of-tasks-to-list=<val> ]
        [ -i=<val> | --print-task-data-for-id=<val> ]
    todo 
        [ -a | --all-unfinished-tasks ]
        [ -c=<val> | --category-name=<val> ]
        [ -t=<val> | --section-type=<val> ]
        [ -n=<val> | --num-of-tasks-to-list=<val> ]
        [ -i=<val> | --print-task-data-for-id=<val> ]
    todo add
    todo add <category_name>
    todo done <task_id>
    todo done <category_name> <task_id>
    todo delete <task_id>
    todo delete <category_name> <task_id>
    todo edit
    todo edit <category_name>
    todo cats
    todo cats default <category_name>
    todo cats new <category_name>
    todo cats remove <category_name>

Options:
    -a, --all-unfinished-tasks
        List out archived tasks
    -c=<val>, --category-name=<val>
        The name of the category to list tasks for
    -t=<val>, --section-type=<val>
        Lists tasks from the given section type
    -n=<val>, --num-of-tasks-to-list=<val>
        The number of the highest priority tickets to print out [default: 3]
```

## Basics

### Using categories

```
todo cats
```

A category is where your tasks are stored
- Create one like this

    ```
    todo cats new <your_category_name_here>
    ```
    - This creates a new directory `~/.todocli` which contains the data for all your categories
- You can also specify your default category

    ```
    todo cats default <your_category_name_here>
    ```
    - All relevant commands will use this default category if a `<category_name>` is not provided
- You can see the current default category like this

    ```
    todo cats default
    ```
- You can see all the available categories like this

    ```
    todo cats
    ```

### Adding tasks to a category

```
todo add
```

- Opens a file in your default text editor
- In this file you can write your tasks in markdown bullet point format like this

    ```
    - This is my first tasks
    - This is the second task
        - This part will be kept as a part of the second task
    - This is the third task
    ```
- The above example will create 3 new tasks

### Task types

- There are 3 types of tasks
    - unfinished
    - finished
    - archived
- New rasks are added as 'unfinshed'
- Tasks are changed to the 'finished' type once they are done
- If tasks are deleted then they are changed to the 'archived' type

### Listing tasks

```
todo
```

- Lists the top 3 tasks in your default category. Each task will have 2 parts
    - ID - This is the identification of the task and can be used to set the task as done or delete it
    - Description - This is the text that you entered for your task
- You can print all the tasks by using the `-a` flag
- You can print tasks from another category by using the `-c` option
- You can also print out the `unfinished`, `finished` or `archived` tasks using the `-t` option

### Setting a task as finished

```
todo done <task_id>
```

### Deleting tasks

```
todo delete <task_id>
```

### Prioritization and editing the tasks

```
todo edit
```

- Opens the list of tasks in the default category in your system's default text editor
- In the file you can move the tasks from one section to another to change their type
- Prioritization can be done by simply moving the tasks up or down
    - The order is respected when the tasks are listed using `todo`
- You can also delete them if you want
    - Any tasks deleted from the `unfinished` or `finished` sections will be put in `archived`
    - Any tasks deleted from the `archived` section will be deleted permanently
- The numbers in front of the tasks are the task IDs. Please do not edit them or else it may cause odd issues.

# Todo CLI

A simple command line Todo program written in Python. It allows you to categorize your tasks, add, remove and edit your tasks all from the command line.

## Installation and setup

```
pip install py-todo-cli
```

The `add` and `edit` commands require that you have the `VISUAL` or `EDITOR` environment variables set to your preferred text editor
- The script will default to `vim` if the `VISUAL` and `EDITOR` environment variables are empty
- But this can cause issues on Windows where vim may not be available by default
    - In that case make sure to set your `EDITOR` environment variable to notepad or your preferred text editor
    - Installing vim is recommended though

## Commands

```
Usage:
    todo
        [ -a | --all-unfinished-tasks ]
        [ -c=<val> | --category-name=<val> ]
        [ -t=<val> | --section-type=<val> ]
        [ -n=<val> | --num-of-tasks-to-list=<val> ]
        [ -i=<val> | --print-task-data-for-id=<val> ]
    todo 
        [ -a | --all-unfinished-tasks ]
        [ -c=<val> | --category-name=<val> ]
        [ -t=<val> | --section-type=<val> ]
        [ -n=<val> | --num-of-tasks-to-list=<val> ]
        [ -i=<val> | --print-task-data-for-id=<val> ]
    todo add
    todo add <category_name>
    todo done <task_id>
    todo done <category_name> <task_id>
    todo delete <task_id>
    todo delete <category_name> <task_id>
    todo edit
    todo edit <category_name>
    todo cats
    todo cats default <category_name>
    todo cats new <category_name>
    todo cats remove <category_name>

Options:
    -a, --all-unfinished-tasks
        List out archived tasks
    -c=<val>, --category-name=<val>
        The name of the category to list tasks for
    -t=<val>, --section-type=<val>
        Lists tasks from the given section type
    -n=<val>, --num-of-tasks-to-list=<val>
        The number of the highest priority tickets to print out [default: 3]
```

## Basics

### Using categories

```
todo cats
```

A category is where your tasks are stored
- Create one like this

    ```
    todo cats new <your_category_name_here>
    ```
    - This creates a new directory `~/.todocli` which contains the data for all your categories
- You can also specify your default category

    ```
    todo cats default <your_category_name_here>
    ```
    - All relevant commands will use this default category if a `<category_name>` is not provided
- You can see the current default category like this

    ```
    todo cats default
    ```
- You can see all the available categories like this

    ```
    todo cats
    ```

### Adding tasks to a category

```
todo add
```

- Opens a file in your default text editor
- In this file you can write your tasks in markdown bullet point format like this

    ```
    - This is my first tasks
    - This is the second task
        - This part will be kept as a part of the second task
    - This is the third task
    ```
- The above example will create 3 new tasks

### Task types

- There are 3 types of tasks
    - unfinished
    - finished
    - archived
- New rasks are added as 'unfinshed'
- Tasks are changed to the 'finished' type once they are done
- If tasks are deleted then they are changed to the 'archived' type

### Listing tasks

```
todo
```

- Lists the top 3 tasks in your default category. Each task will have 2 parts
    - ID - This is the identification of the task and can be used to set the task as done or delete it
    - Description - This is the text that you entered for your task
- You can print all the tasks by using the `-a` flag
- You can print tasks from another category by using the `-c` option
- You can also print out the `unfinished`, `finished` or `archived` tasks using the `-t` option

### Setting a task as finished

```
todo done <task_id>
```

### Deleting tasks

```
todo delete <task_id>
```

### Prioritization and editing the tasks

```
todo edit
```

- Opens the list of tasks in the default category in your system's default text editor
- In the file you can move the tasks from one section to another to change their type
- Prioritization can be done by simply moving the tasks up or down
    - The order is respected when the tasks are listed using `todo`
- You can also delete them if you want
    - Any tasks deleted from the `unfinished` or `finished` sections will be put in `archived`
    - Any tasks deleted from the `archived` section will be deleted permanently
- The numbers in front of the tasks are the task IDs. Please do not edit them or else it may cause odd issues.

