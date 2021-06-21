const User = require('./models/user');


User.verifyPassword(

 'blubbPlainPassword',

 '$argon2id$v=19$m=65536,t=5,p=1$4aG9lUTSw08EhtNSlJvqGg$WyNwwExENyycMIRFWAwhapo3+gdzQ+w1Pt6x4KOFGsM'

).then((passwordIsCorrect) => {

  console.log(passwordIsCorrect);

});