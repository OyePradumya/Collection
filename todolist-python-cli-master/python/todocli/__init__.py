"""
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
    todo cats default
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
    -i=<val>, --print-task-data-for-id=<val>
        Print out details about a given task like the creation time and last
        edited time, etc.
"""

from __future__ import print_function
from __future__ import absolute_import
from pprint import pprint
import textwrap

from docopt import docopt
from tabulate import tabulate

from . import category_manager

# HELPERS -----------------------------------------------------------------------------------------

def wrap_text(text, width=category_manager.DEFAULT_TEXT_WIDTH):
    return '\n'.join([
        textwrap.fill(line, width=width)
        for line in text.split('\n')
    ])

def print_tasks(category, section_name, limit=0):
    try:
        tasks = category_manager.get_tasks_for_section(category, section_name)
    except Exception as e:
        print(e)
        return

    if not tasks:
        print("No tasks found in section '{}' for category '{}'".format(
            section_name,
            category
        ))
        return

    # If limit is not defined then show all tasks
    if not limit:
        limit = len(tasks)

    limited_tasks = tasks[:limit]

    print("\n Showing {}/{} {} tasks for '{}'".format(
        len(limited_tasks),
        len(tasks),
        section_name,
        category
    ))

    # Generate the data to print
    data_to_print = []
    for task in limited_tasks:
        description = wrap_text(task.get('description', ''))
        data_to_print.append([task.get('id'), description])

    print(tabulate(
        data_to_print,
        ['ID', 'Description'],
        tablefmt='psql'
    ) + '\n')

def print_categories(categories):
    default_category = category_manager.get_default_category()

    print('\nCurrently available categories:')
    for category in categories:
        if category == default_category:
            print('  >', category)
        else:
            print('   ', category)
    print()

def print_task_data(category, task_id):
    # Get all the tasks for the category
    tasks_list = {
        'unfinished': category_manager.get_tasks_for_section(category, 'unfinished'),
        'finished': category_manager.get_tasks_for_section(category, 'finished'),
        'archived': category_manager.get_tasks_for_section(category, 'archived'),
    }

    # Find the task in the list of tasks
    task_data = {}
    task_section = ''
    for section in tasks_list.keys():
        try:
            task_data = next(
                task
                for task in tasks_list[section]
                if task['id'] == task_id
            )
            task_section = section
            break
        except StopIteration:
            continue

    if not task_data:
        print("Could not find a task for task ID '{}' in category '{}'".format(task_id, category))
        return

    # Print out the data
    print()
    print('       ID:', task_id)
    print(' Category:', category)
    print('     Type:', section)
    print('  Created:', task_data['created'])
    print('   Edited:', task_data['edited'])
    print('\nDescription')
    print('-------------\n\n{}\n'.format(task_data['description']))

# ARGS HANDLERS -----------------------------------------------------------------------------------

def handle_default():
    category_name = args['--category-name']
    if not category_name:
        category_name = category_manager.get_default_category()
    if not category_manager.check_category_exists(category_name):
        print("Category '{}' not found".format(category_name))
        return

    if args['--print-task-data-for-id']:
        print_task_data(category_name, int(args['--print-task-data-for-id']))
        return

    # Do the formatting for the printout
    tasks_limit = 0
    if not args['--all-unfinished-tasks']:
        tasks_limit = int(args['--num-of-tasks-to-list'])
    
    # Get the section type
    section = 'unfinished'
    if args['--section-type']:
        section = args['--section-type']

    print_tasks(category_name, section, tasks_limit)

def handle_add():
    category_name = args['<category_name>']
    if not category_name:
        category_name = category_manager.get_default_category()
    if not category_manager.check_category_exists(category_name):
        print("Category '{}' not found".format(category_name))
        return

    category_manager.add_tasks_to_category(category_name)

def handle_done():
    category_name = args['<category_name>']
    if not category_name:
        category_name = category_manager.get_default_category()
    if not category_manager.check_category_exists(category_name):
        print("Category '{}' not found".format(category_name))
        return

    task_id = int(args['<task_id>'])
    category_manager.move_task(category_name, task_id, 'unfinished', 'finished')

def handle_delete():
    category_name = args['<category_name>']
    if not category_name:
        category_name = category_manager.get_default_category()
    if not category_manager.check_category_exists(category_name):
        print("Category '{}' not found".format(category_name))
        return

    task_id = int(args['<task_id>'])
    category_manager.move_task(category_name, task_id, 'unfinished', 'archived')

def handle_edit():
    category_name = args['<category_name>']
    if not category_name:
        category_name = category_manager.get_default_category()
    if not category_manager.check_category_exists(category_name):
        print("Category '{}' not found".format(category_name))
        return

    category_manager.edit_category(category_name)

def handle_cats():
    if args['new']:
        category_manager.create_category(args['<category_name>'])
        return

    if args['default']:
        if args['<category_name>']:
            category_manager.set_default_category(args['<category_name>'])
        else:
            print("The default category is '{}'".format(category_manager.get_default_category()))
        return

    if args['remove']:
        category_manager.delete_category(args['<category_name>'])
        print("Category '{}' removed forever".format(args['<category_name>']))
        return

    # The default behavior is to just print out all the categories
    print_categories(category_manager.get_categories())

# MAIN --------------------------------------------------------------------------------------------

def run_main():
    global args
    args = docopt(__doc__)

    # Create the storage directories for the tasks files if they don't already exist
    category_manager.setup_storage_dir()

    if args['add']:
        handle_add()
        exit()

    if args['done']:
        handle_done()
        exit()

    if args['delete']:
        handle_delete()
        exit()

    if args['edit']:
        handle_edit()
        exit()

    if args['cats']:
        handle_cats()
        exit()

    # Default case
    handle_default()

if __name__ == '__main__':
    run_main()

