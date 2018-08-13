const fs = require('fs');

const fetch = () => {
    try {
        let userDataBase = fs.readFileSync('users.json');
        return JSON.parse(userDataBase);
    } catch (error) {
     return [];
    }
};
const save = (user) => {
    fs.writeFileSync('users.json',JSON.stringify(user));
}

const createUser = (fname, lname, mail,  uname, pwd) => {
  let currentUsers = fetch();
  let userObj = {
  fname,
  lname,
  mail,
  uname,
  pwd,
  userID: ` user${fetch().length+1}`
  };

  if(currentUsers.length === 0){
    currentUsers.push(userObj);
    save(currentUsers);
    console.log("User created");
  }
  else if( checkEmail(mail)  && checkUsername(uname) ){
      currentUsers.push(userObj);
      save(currentUsers);
      console.log("User created");
    }
};

const checkEmail = mail =>{
  let currentUsers = fetch();
  if(currentUsers.filter( user => user.mail === mail).length === 0){
    return true
  } else{
    console.log("user mail already exists");
    return false;
  }
};

const checkUsername = username => {
  let currentUsers = fetch();
    if(currentUsers.filter( user => user.uname === username ).length === 0){
    return true;
    }else{
    console.log("username already exists");
    return false;
  }
};


module.exports= {
  createUser
};
