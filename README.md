# Team-Generator

## Table of Contents:

1. [Description](#description)

2. [Visuals](#visuals)

3. [Installation](#installation)

4. [Usage](#usage)

5. [License](#license)

6. [Contributing](#contributing)

7. [Testing](#testing)

8. [Languages](#languages)

 9. [Author](#author)

## Description:
This is a Command Line Interface (CLI) which generates an html file containing a summary of team members and their details based on user-defined input.

## Visuals:
![screenshot](https://github.com/phillidp1989/Team-Generator/blob/master/assets/demo.gif)

## Installation:
Clone folder onto user's computer by forking the repo and using the 'Clone of download' option on GitHub. Teh, install all npm modules using the command 'npm install'. Run the application by typing 'node app.js' in the command line when in the root directory.

## Usage:
Once the application has been run, the user will be asked to answer a number of questions regarding members of the team they wish to generate a summary for. The user will need to add information about the manager (assumed to be the user based on user story) and then any number of engineers and/or interns. User input is validated depending on the type of response required. Key information about each employee then gets saved in an instantiated object. All employee objects are then passed to an html rendering function to produce the team summary.

## License:
<img src="https://img.shields.io/github/license/phillidp1989/Team-Generator?logoColor=%23C2CAE8">

## Contributing:
No contributions required

## Testing:
Jest is used to test functionality of employee, manager, engineer and intern classes.

## Languages:
<img src="https://img.shields.io/github/languages/top/phillidp1989/Team-Generator">

## Author:
Name: Dan Phillips

Github Username: phillidp1989

Github Email Address: d.p.phillips@bham.ac.uk

<img src="https://avatars1.githubusercontent.com/u/61989740?v=4">