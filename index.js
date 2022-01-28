const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHtml = require('./util/generateHtml.js');
const fs = require("fs");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const teamMembers = [];

const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            messege: 'What is the name of your employee?(Required)',
            validate: employee => {
                if (employee) {
                    return true;
                } else {
                    console.log('Please enter your employee name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeId',
            messege: 'Enter your employee ID (Required)',
            validate: employeeID => {
                if (employeeID) {
                    return true;
                } else {
                    console.log('Please enter your employee ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            messege: 'Enter your email address(Required)',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter your email address!');
                    return false;
                }
            }
        },
        {

            type: 'input',
            name: 'officeNumber',
            messege: 'Enter your office number(Required)',
            validate: officeNumber => {
                if (officeNumber) {
                    return true;
                } else {
                    console.log('Please enter your office number!');
                    return false;
                }
            }
        },

    ]).then(answers => {
        console.log(answers);
        const manager = new Manager(answers.name, answers.employeeId, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        promptMenu();
    })
};

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please select which option you would like to continue with:',
            choices: ['add an engineer', 'add an intern', 'finish building my team']
        }])
        .then(userChoice => {
            switch (userChoice.menu) {
                case "add an engineer":
                    promptEngineer();
                    break;
                case "add an intern":
                    promptIntern();
                    break;
                default:
                    buildTeam();
            }
        });
};

const promptEngineer = () => {
    console.log(`
        ===============
        Add a New Engineer
        ===============
        `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of engineer? (Required)',
            validate: engineerName => {
                if (engineerName) {
                    return true;
                } else {
                    console.log('Please enter the name of engineer!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter your employee ID (Required)',
            validate: employeeId => {
                if (employeeId) {
                    return true;
                } else {
                    console.log('Please enter your employee ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address (Required)',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter your email address!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: 'Enter your Github username. (Required)',
            validate: githubUsername => {
                if (githubUsername) {
                    return true;
                } else {
                    console.log('Please enter your Github username!');
                    return false;
                }
            }
        },
    ])
.then(answers => {
        console.log(answers);
        const engineer = new Engineer(answers.name, answers.employeeId, answers.email, answers.githubUsername);
        teamMembers.push(engineer);
        promptMenu();
    })
};

const promptIntern = () => {
    console.log(`
        ===============
        Add a New Intern
        ===============
        `);


return inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of intern? (Required)',
        validate: internName => {
            if (internName) {
                return true;
            } else {
                console.log('Please enter the name of intern!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'employeeId',
        message: 'Enter your employee ID (Required)',
        validate: employeeId => {
            if (employeeId) {
                return true;
            } else {
                console.log('Please enter your employee ID!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address (Required)',
        validate: email => {
            if (email) {
                return true;
            } else {
                console.log('Please enter your email address!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter name of your school (Required)',
        validate: school => {
            if (school) {
                return true;
            } else {
                console.log('Please enter name of your school!');
                return false;
            }
        }
    },
]).then(answers => {
    console.log(answers);
    const intern = new Intern(answers.name, answers.internId, answers.email, answers.school);
    teamMembers.push(intern);
    promptMenu();
})
}

const buildTeam = () => {
    console.log(`
    ===============
    Finished building my team!
    ===============
    `);

   if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, generateHtml(teamMembers),"UTF-8");
}

promptManager();