const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const validation = require("./lib/validation");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");


let fileName = "team"
const OUTPUT_DIR = path.resolve(__dirname, "output");
let outputPath = path.join(OUTPUT_DIR, `${fileName}.html`);

const render = require("./lib/htmlRenderer");

// Creating Promise-based version of fs modules

const writeFileAsync = util.promisify(fs.writeFile);


// Define global variable to hold the role of the member being added

let memberRole = null;
let teamName;

// Empty arrays which new instantiated employee objects will be pushed into. Multiple arrays have been used to ensure each role type are grouped when the html is rendered

let team = [];
let managers = [];
let engineers = [];
let interns = [];

// Object used for asking the appropriate question based on the role selected

const specialQuestion = {
    "Manager": "office number",
    "Engineer": "GitHub username",
    "Intern": "school name"
};

// Function to ask user which team member type they would like to add next or to complete the team generator

const roleQuestion = async teamName => {
    const { memberType } = await inquirer.prompt([
        {
            type: "list",
            message: "What type of team member would you like to add to your team summary?",
            choices: ["Engineer", "Intern", "I have finished adding members to my team"],
            name: "memberType"

        },
    ]);

    // If statement which stops the question loop, renders the objects, creates the HTML file and console logs a success message

    if (memberType === "I have finished adding members to my team") {

        // Concatenate arrays so that employee types are grouped together

        team = [...managers, ...engineers, ...interns];

        // Call the render function and pass in employee objects and team name

        const html = render(team, teamName);

        if (fs.existsSync(outputPath)) {
            const { updateFileName } = await inquirer.prompt({
                type: "input",
                message: `A file named ${fileName}.html already exists within the 'output' directory. Please provide an alternative filename so that the original document is not overwritten. Please do not include the file extension in your response`,
                name: "updateFileName",
                validate: validation.fileValidation
            })

            // Reasignment of variables based on user input

            fileName = updateFileName;
            outputPath = path.join(OUTPUT_DIR, `${fileName}.html`);
        }

        await writeFileAsync(outputPath, html);

        console.log("\nThank you for using the team generator CLI. Your team summary is available in the 'output' folder\n");
        return;
    }

    // If the user selects another role to add to the team, the memberData function will be called with the memberType and teamName passed in as arguments

    memberData(memberType, teamName);
};

// Function to collect team member data using inquirer


const memberData = async (memberRole, teamName) => {

    let special = specialQuestion[memberRole];

    const { memberName } = await inquirer.prompt([
        {
            type: "inupt",
            message: `What is the name of the ${memberRole} you are adding to ${teamName}?`,
            name: "memberName",
            validate: validation.nameValidation
        }
    ]);

    const answers = await inquirer.prompt([

        {
            type: "inupt",
            message: `Please provide ${memberName}'s ID:`,
            name: "memberID",
            validate: validation.numberValidation
        },

        {
            type: "inupt",
            message: `Please provide ${memberName}'s email address:`,
            name: "memberEmail",
            validate: validation.emailValidation
        },

        {
            type: "inupt",
            message: `Please provide ${memberName}'s ${special}:`,
            name: "memberSpecial",
            validate: validation.nameValidation
        },

    ]);

    // Switch statement to instantiate relevant object (manager, engineer or intern) based on role type selected by user

    switch (memberRole) {
        case "Manager":
            employee = new Manager(memberName.trim(), answers.memberID.trim(), answers.memberEmail.trim(), answers.memberSpecial.trim());
            managers.push(employee);
            break;
        case "Engineer":
            employee = new Engineer(memberName.trim(), answers.memberID.trim(), answers.memberEmail.trim(), answers.memberSpecial.trim());
            engineers.push(employee);
            break;
        case "Intern":
            employee = new Intern(memberName.trim(), answers.memberID.trim(), answers.memberEmail.trim(), answers.memberSpecial.trim());
            interns.push(employee);
            break;
        default:
            console.log("Error! Something went wrong");
            break;
    }

    // Once the employee object has been created, the roleQuestion function is called to ask the user if they wish to add a new member or complete the process

    roleQuestion(teamName);
};

// Function to welcome user and set role to manager

const welcomeManager = async () => {
    if (memberRole === null) {
        console.log("\n\nWelcome to the Software Engineering Team Generator. \nPlease answer the following questions in order to build your team summary\n");
    }

    const { nameTeam } = await inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your team?",
            name: "nameTeam",
            validate: validation.nameValidation

        },
    ]);

    // Set the type variable to manager as the user story suggests that the manager will be using this CLI team generator

    teamName = nameTeam;
    memberRole = "Manager";
    memberData(memberRole, teamName);

};

// Call the welcomeManager function to inititate the CLI

welcomeManager();



