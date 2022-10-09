import setuptools
import os.path

long_description = ''
if os.path.isfile("README.md"):
    with open("README.md", "r") as fh:
        long_description = fh.read()

setuptools.setup(
    name="py-todo-cli",
    version="0.1.5",
    author="Mantaseus",
    description = 'A module that installs a command line program to manage simple TODO lists',
    long_description=long_description,
    long_description_content_type="text/markdown",
    url = 'https://github.com/Mantaseus/Todo-CLI.git',
    license = 'MIT',

    packages = ['todocli'],
    entry_points = {
        'console_scripts': [
            'todo = todocli:run_main',
        ]
    },

    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    install_requires = [
        'docopt',
        'tabulate',
    ],
)
