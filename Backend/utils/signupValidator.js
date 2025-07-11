const validator = require('validator');

const signupValidator = (req) => { 
    
    const {FirstName, LastName, Email, Password,Gender,DateOfBirth,PhoneNumber} = req.body;

    if(!FirstName || FirstName.length>20)
        {
            throw new Error("First Name is required and should be less than 20 characters");
        }
    if(!LastName || LastName.length>30)
        {
            throw new Error("Last Name is required and should be less than 30 characters");
        }
    if(!Email || !validator.isEmail(Email))
        {
            throw new Error("Valid Email is required");
        }
    if(!PhoneNumber || !validator.isMobilePhone(PhoneNumber))
        {
            throw new Error("Valid Phone Number is required");
        }
    if(!Gender || !['Male','Female','Other'].includes(Gender))
        {
            throw new Error('Gender Not allowed')
        }
    if(!DateOfBirth || !validator.isDate(DateOfBirth))
        {
            throw new Error("Valid Date of Birth is required");
        }
    if(!Password || !validator.isStrongPassword(Password))
        {
            throw new Error("Strong Password is required");
        }
}

module.exports = signupValidator;
