const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const validation = require("./lib/validation");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Creating Promise-based version of fs modules

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Define global variable to hold the role of the member being added

let memberRole = null;
let team = [];

// Object used for asking the user the appropriate question based on the role selected

const specialQuestion = {
    "Manager": "office number",
    "Engineer": "GitHub username",
    "Intern": "school name"
};


// Function to ask user which team member type they would like to add next

const roleQuestion = async () => {
    const { memberType } = await inquirer.prompt([
        {
            type: "list",
            message: "What type of team member would you like to add to your team summary?",
            choices: ["Engineer", "Intern", "I have finished adding members to my team"],
            name: "memberType"

        },
    ]);
    if (memberType === "I have finished adding members to my team") {
        
        const html = render(team);
        
        await writeFileAsync(outputPath, html);

        console.log("\nThank you for using the team generator CLI. Your team summary is available in this folder");
        return;
    }
    memberData(memberType);
}


const memberData = async memberRole => {

    let special = specialQuestion[memberRole];

    const { memberName } = await inquirer.prompt([
        {
            type: "inupt",
            message: `What is the name of the ${memberRole} you are adding to your team?`,
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

    ])

    // Switch statement to instantiate relevant object (manager, engineer or intern) based on role type selected by user

    switch (memberRole) {
        case "Manager":
            employee = new Manager(memberName.trim(), answers.memberID.trim(), answers.memberEmail.trim(), answers.memberSpecial.trim());
            team.push(employee);
            console.log(team);
            break;
        case "Engineer":
            employee = new Engineer(memberName.trim(), answers.memberID.trim(), answers.memberEmail.trim(), answers.memberSpecial.trim());
            team.push(employee);
            console.log(team);
            break;
        case "Intern":
            employee = new Intern(memberName.trim(), answers.memberID.trim(), answers.memberEmail.trim(), answers.memberSpecial.trim());
            team.push(employee);
            console.log(team);
            break;
        default:
            console.log("Something went wrong");
            break;
    }
    roleQuestion();
};

// Function to welcome user and set type to manager initially

const welcomeManager = () => {
    if (memberRole === null) {
        console.log("Welcome to the Software Engineering Team Generator. \nPlease answer the following questions in order to build your team summary\n");
    }

    // Set the type variable to manager as the user story suggests that the manager will be using this CLI team generator

    memberRole = "Manager";
    memberData(memberRole)

}

welcomeManager();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


