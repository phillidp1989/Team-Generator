const nameValidation = input => {
    if (input === "" || input === undefined) {
        return "Please enter a valid response";

    } else {

        return true;
    }
};

const fileValidation = input => {
    if (input.indexOf(" ") !== -1) {
        return "Please enter a filename without any spaces";

    } else {

        return true;
    }
};

const numberValidation = number => {
    if (isNaN(number)) {
        return "Please enter a valid ID consisting of numbers only";
        
    } else {

        return true;
    }
};

const emailValidation = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) === false) {
        return "Please enter a valid email address";

    } else {
        
        return true;
    }
}

module.exports = {
    nameValidation,
    fileValidation,
    numberValidation,
    emailValidation
}