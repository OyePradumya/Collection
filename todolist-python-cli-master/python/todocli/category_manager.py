from __future__ import print_function
from pprint import pprint
from datetime import datetime
from contextlib import closing
import os
import shelve
import tempfile
import subprocess
import re

# CONSTANTS ---------------------------------------------------------------------------------------

CATEGORY_FILE_DIR = os.path.expanduser('~/.todocli/cats')
DEFAULT_CATEGORY_FILE = os.path.expanduser('~/.todocli/default_cat')

DEFAULT_TEXT_WIDTH = 70

ADD_HELP_TEXT = """

<!--
# Adding tasks to category '{category_name}'
# 
# Rules:
# - Add tasks as bullet points using the markdown syntax ('-'). 
# - The tasks can be multiline. 
# - You can add multiple tasks at the same time using the bullet point syntax. 
# - Any line starting with a '#' will be ignored. 
# - Any lines between 2 lines starting with '-' are considered a part of the
#   the previous task.
# - Try to keep the line character width less than 70 to make the tasks look
#   nicer when printed
#
# For example, the following would add 2 new tasks
# - This is my first task
#     - Some details about the first task
# - This is the second task
-->
"""

EDIT_HELP_TEXT = """<!--
# Editing tasks for category '{category_name}'
# 
# Rules:
# - The numbers in front of the task descriptions are the task IDs. Do not
#   mess with them or it could lead to erratic behavior
# - You can move the tasks up or down to "prioritize" them relative to each other
# - You can move a task from one section to another and that task will
#   actually get moved over to that section. For example: If you move a task
#   from the "Unfinished" section to the "Finished" section then that task
#   will not appear in the list of unfinished tasks when you run `todo`
# - Add new tasks by starting the point with a `-`. The priority position of the
#   new task will be respected when it gets created. For example:
#
#   ```
#   1. An old task
#   - This will be a new task that will be prioritized in this position
#   2. Also another old task
#   ```
# - If you delete a task from this list then it will be deleted permanently
#   and will not be recoverable
# - If you delete an item from the 'Unfinished' or 'Finished' section and don't
#   move it to the 'Archived' section then those items will be automatically
#   moved to the 'Archived' section once you save and exit
# - If you delete an item from the 'Archived' section then it will be deleted
#   forever
-->

"""

# PRIVATE: TEMP FILE MANAGEMENT -------------------------------------------------------------------
# Copied from https://stackoverflow.com/a/48466593 with some modifications

def _raw_input_editor(default=None, editor=None, start_at_line=0):
    tmpfile = tempfile.NamedTemporaryFile(mode='r+', delete=False)
    tmpfile_name = tmpfile.name

    try:
        # Write the default text to the temp file
        if default:
            tmpfile.write(default)
            tmpfile.flush()
            tmpfile.close()

        # Get the available editor
        editor = editor or _get_editor()

        # Build the command to open the file in the editor
        command = [editor, tmpfile_name]
        if editor in ['vi', 'vim']:
            # Setup vi editor to enforce auto wrapping after 80 lines
            command.append('+{}'.format(start_at_line))
            command.append('-c')
            command.append('set textwidth={}'.format(DEFAULT_TEXT_WIDTH))
            command.append('-c')
            command.append('set ft=markdown')
            command.append('-c')
            command.append('set smartindent')

        # Run the command
        try:
            subprocess.check_call(command)
        except Exception as e:
            raise Exception('Error occured while editing the file in your editor. Operation cancelled')
            return ''

        with open(tmpfile_name, 'r') as tmpfile:
            # Get the output from the temp file
            tmpfile.seek(0)
            return tmpfile.read().strip()
    except Exception as e:
        print(e)
        return ''
    finally:
        os.remove(tmpfile_name)

def _get_editor():
    return (os.environ.get('VISUAL')
        or os.environ.get('EDITOR')
        or 'vim')

# PRIVATE FUNCTIONS -------------------------------------------------------------------------------

def _get_task_ids(tasks_list, sections):
    task_ids = []
    for section in sections:
        for task in tasks_list[section]:
            task_ids.append(task['id'])
    return task_ids

def _get_task_for_task_id(tasks_list, task_id):
    for section in tasks_list.keys():
        try:
            return next(
                task
                for task in tasks_list[section]
                if task['id'] == task_id
            ), section
        except StopIteration:
            continue
    return {}, ''

# PUBLIC FUNCTIONS --------------------------------------------------------------------------------

def setup_storage_dir():
    if not os.path.exists(CATEGORY_FILE_DIR):
        os.makedirs(CATEGORY_FILE_DIR)

def get_categories():
    return os.listdir(CATEGORY_FILE_DIR)

def get_category_file_path(category):
    return os.path.join(CATEGORY_FILE_DIR, category)

def check_category_exists(category):
    return os.path.isfile(get_category_file_path(category))

def get_default_category():
    try:
        with open(DEFAULT_CATEGORY_FILE, 'r') as default_cat_file:
            return default_cat_file.read()
    except:
        pass
    return ''

def set_default_category(category):
    # Check that the category exists. Throw error if it does not exist
    if not check_category_exists(category):
        print("Can not set a nonexistent category '{}' as the default category".format(category))
        return

    # Write the category name to default_cat file
    with open(DEFAULT_CATEGORY_FILE, 'w') as default_cat_file:
        default_cat_file.write(category)

def create_category(category):
    # Check that the category exists. If it does then exit
    if check_category_exists(category):
        print("The category '{}' already exists. No need to create a new one".format(category))
        return
    
    # Write the text for the unfinished and finished sections of the categorys to the 
    # category_file_path
    with closing(shelve.open(get_category_file_path(category))) as category_file:
        category_file['unfinished'] = []
        category_file['finished'] = []
        category_file['archived'] = []
        category_file['next_task_id'] = 0

    # If the default category file is empty then set this category as the default category for now
    if not get_default_category():
        set_default_category(category)

def delete_category(category):
    # Check that the category exists. If it does then exit
    if not check_category_exists(category):
        print("Can not delete a unexistent category '{}'".format(category))
        return
    os.remove(get_category_file_path(category))

def get_tasks_for_section(category, section_name):
    if not check_category_exists(category):
        raise Exception("The category '{}' does not exist".format(category))

    with closing(shelve.open(get_category_file_path(category))) as category_file:
        tasks = category_file.get(section_name, None)
        if tasks == None:
            raise Exception("Cannot find section '{}' in category '{}'".format(
                section_name, 
                category
            ))
        return tasks

def add_tasks_to_category(category):
    user_input = _raw_input_editor(ADD_HELP_TEXT.format(category_name=category))

    # Parse the tasks out of the temp file
    raw_tasks = []
    user_lines = user_input.split('\n')
    for line in user_lines:
        # Ignore lines starting with '#' and HTML comment tags
        if line.startswith('#') or line.startswith('<!--') or line.startswith('-->'):
            continue
        
        # If a valid markdown bullet point is found in the text then create a new empty entry
        # in the raw_tasks list
        if re.search('^- *', line):
            raw_tasks.append('')

            # Remove the bullet point from the line
            line = re.sub(r'^- *', '', line) 

        # If there is no entry in the raw_tasks list yet then skip
        # This will make sure that any text before the first bullet point will be ignored
        if not raw_tasks:
            continue

        # Append any line
        raw_tasks[-1] += line + '\n'

    # Append the tasks to unfinished section of the categories
    with closing(shelve.open(get_category_file_path(category))) as category_file:
        unfinished_tasks = category_file['unfinished']
        for task in raw_tasks:
            unfinished_tasks.append({
                'id': category_file['next_task_id'],
                'created': datetime.now(),
                'edited': datetime.now(),
                'description': task.rstrip()
            })
            category_file['next_task_id'] += 1
        category_file['unfinished'] = unfinished_tasks

def move_task(category, task_id, from_section, to_section):
    with closing(shelve.open(get_category_file_path(category))) as category_file:
        from_tasks = category_file[from_section]
        to_tasks = category_file[to_section]

        try:
            task_index = next(
                i
                for i, task in enumerate(from_tasks)
                if task['id'] == task_id
            )
        except StopIteration:
            print("Task ID '{}' not found in section '{}' of category '{}'".format(
                task_id, 
                from_section,
                category
            ))
            return

        task_to_move = from_tasks.pop(task_index)
        task_to_move['edited'] = datetime.now()
        to_tasks.append(task_to_move)

        category_file[from_section] = from_tasks
        category_file[to_section] = to_tasks

def edit_category(category, raw=False):
    old_tasks_text = EDIT_HELP_TEXT.format(category_name=category)
    old_tasks = {}

    # Prepare the text in the file with all the tasks formatted nicely
    with closing(shelve.open(get_category_file_path(category))) as category_file:
        for section in ['unfinished', 'finished', 'archived']:
            old_tasks_text += '\n# {}\n\n'.format(section.capitalize())
            old_tasks[section] = category_file[section]

            for task in category_file[section]:
                old_tasks_text += '{}. {}\n'.format(
                    task['id'], 
                    task['description']
                )
    
    # Open the text in the editor and wait for the user to finish editing it
    user_input = _raw_input_editor(
        old_tasks_text, 
        start_at_line=EDIT_HELP_TEXT.count('\n')+2
    )
    if not user_input:
        return

    # Parse the tasks out of the user's input
    raw_tasks = {
        'unfinished': [],
        'finished': [],
        'archived': [],
    }
    max_task_id = 0
    section = ''
    for line in user_input.split('\n'):
        # Ignore lines with '#' but check if this a section transition
        if line.startswith('#') or line.startswith('<!--') or line.startswith('-->'):
            for category_name in raw_tasks.keys():
                if line == '# {}'.format(category_name.capitalize()):
                    section = category_name
                    break
            continue

        # Ignore everything if we havn't gotten into a section yet
        if not section:
            continue
        
        if re.search('^\d*\. *', line):
            # If a numbered bullet point is found in the text then create a new empty entry
            # in the raw_tasks list

            # Extract the number as the task id from the line
            task_id = int(re.search('^\d*', line).group())

            if task_id > max_task_id:
                max_task_id = task_id

            # Save the task data. Don't save the description from the line yet because it will
            # be added later
            raw_tasks[section].append({
                'id': task_id,
                'description': ''
            })

            # Remove the number part of the line
            line = re.sub(r'^\d*\. *', '', line) 
        elif re.search('^- *', line):
            # This is a new task that did not exist before. So, we can not give it an ID yet.
            # Store it for now and we will give it an ID later when it gets written
            raw_tasks[section].append({
                'id': -1,
                'description': ''
            })

            # Remove the bullet point from the line
            line = re.sub(r'^- *', '', line) 

        # If there is no entry in the raw_tasks list yet then skip
        # This will make sure that any text before the first bullet point will be ignored
        if not raw_tasks.get(section, None):
            continue

        # Append any line
        raw_tasks[section][-1]['description'] += line + '\n'

    # Cleanup any trailing new lines
    for section in raw_tasks.keys():
        for task in raw_tasks[section]:
            task['description'] = task['description'].rstrip()

    # Find out which tasks were removed from 'unfinished' or 'finished' section and move them
    # to the 'archived' section if they are not already there
    old_important_task_ids = _get_task_ids(old_tasks, ['unfinished', 'finished'])
    edited_task_ids = _get_task_ids(raw_tasks, raw_tasks.keys())
    for task_id in old_important_task_ids:
        if task_id not in edited_task_ids:
            task_to_archive = _get_task_for_task_id(old_tasks, task_id)

            # We couldn't find the actual task details. Skip it
            if not task_to_archive:
                continue

            # Update the edited time on the task and save it to the 'archived' section
            task_to_archive['edited'] = datetime.now()
            raw_tasks['archived'].append(task_to_archive)
    
    # Set the 'edited' time for the tasks that had their description changed or were moved to a
    # different section.
    for section in raw_tasks.keys():
        for task in raw_tasks[section]:
            old_task, old_task_section = _get_task_for_task_id(old_tasks, task['id'])
            if not old_task:
                continue

            if old_task['description'] != task['description'] or old_task_section != section:
                # If the description or section has changed then set 'edited' time to the 
                # current time
                task['created'] = old_task.get('created', datetime.now())
                task['edited'] = datetime.now()
            else:
                # If nothing changable has changed then just use the old task's times
                task['created'] = old_task.get('created', datetime.now())
                task['edited'] = old_task.get('edited', datetime.now())

    # Edit the data in the category file for each section
    with closing(shelve.open(get_category_file_path(category))) as category_file:
        # If for some stupid reason the user decides to change the ids of a task and those
        # ids end up being higher than the highest id we had before then it is possible that we will
        # end up having an id conflict in the future. So, just update the `next_task_id` to be
        # higher than the max task id set by the user
        if category_file['next_task_id'] <= max_task_id:
            category_file['next_task_id'] = max_task_id + 1

        # Give new IDs to the new tasks
        for section in raw_tasks.keys():
            for task in raw_tasks[section]:
                if task['id'] == -1:
                    task['id'] = category_file['next_task_id']
                    task['created'] = datetime.now()
                    task['edited'] = datetime.now()
                    category_file['next_task_id'] += 1

        # Save all the tasks to the file data
        for section in raw_tasks.keys():
            category_file[section] = raw_tasks[section]


