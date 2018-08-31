import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';


export class User {
	
	// fetch all users
	fetchUsers(req, res) {
		db.any('SELECT * FROM users').then(
			users => res.status(200).json({ users })
		).catch(
			error => res.status(500).json({ error })
		);
	}

	// create a new user
	createUser(req, res) {
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const fullName = `${firstName} ${lastName}`;
		const username = req.body.username;
		const emailAdd = req.body.email;
		const pwd = req.body.password;

		validateEmail= (str) => {
			var re = /[.]/g;
			const test = str.match(re);
			if ( test.length < 3) {
				const split = str.split('.');
				const last_part = split[split.length-1];
				if (/@yahoo/g.test(str) || /@gmail/g.test(str) || /@aol/g.test(str) || /@hotmail/g.test(str) || /@outlook/g.test(str) || /@[a-zA-Z]{3,}/g.test(str)) {
					if (last_part === 'com' || last_part === 'uk' ||last_part === 'za') {
						return true;
					}
				}
			}    
			return false;
		}

		const email = validateEmail(emailAdd);
		const first = typeof firstName === 'string' && firstName.length > 1 && (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g).test(firstName);
		const last = typeof lastName === 'string' && lastName.length > 1 && (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g).test(lastName);
		const usernamecheck = typeof username === 'string' && username.length > 1 &&  (/^[a-zA-Z]+(([_][a-zA-Z ])?[a-zA-Z]*)*$/g).test(username);
		
		if(!firstName || first === false){
			return res.status(400).json({ message: 'first name is empty or an invalid format' });
		}
		if(!lastName || last === false){
			return res.status(400).json({ message: 'last name is empty or an invalid format' });
		}
		if(!username || usernamecheck === false){
			return res.status(400).json({ message: 'username is empty or an invalid format' });
		}
		if(!emailAdd || email === false){
			return res.status(400).json({ message: 'email is empty or an invalid format' });
		} 
		if(!pwd){
			return res.status(400).json({ message: 'password is empty or an invalid format' });
		}

		if (first && last && username && email) {
			db.any('SELECT * FROM users WHERE email = $1 OR username = $2', [emailAdd, username])
			.then( user => {
				if (user.length === 0) {
						const hash = bcrypt.hashSync(pwd, 10);
						return db.any('INSERT INTO users (fullname, username, email, password) VALUES ($1, $2, $3, $4)', [fullName, username,emailAdd, hash])		
							.then(() => {
								db.any('SELECT * FROM users WHERE email = $1', [emailAdd])
								.then(user => {
									const token = jwt.sign({
										id : user[0].id,
										username,
										emailAdd,
										fullName
									},process.env.JWT_KEY,{
										expiresIn: '1h'
									});	
									res.header('x-access-token', token);
								return res.status(201).json({ message: 'user created', token })
								})
								.catch(error => {
									return res.status(500).json({ error });
								});
							})
							.catch((error) => res.status(500).json({error}));
				}
				if (user[0].email === emailAdd) {
					return res.status(409).json({ message: 'a user with this email already exists' });
				}
				if (user[0].username === username) {
					return res.status(409).json({ message: 'a user with this username already exists' });
				}
			})
			.catch((error) => {
			res.status(500).json(error);
		});
		}		
	}

	// login to an account
	login (req, res) {
		const email = req.body.email;
		const pwd = req.body.password;
		const emailAdd = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		if (!email || emailAdd === false) {
			return res.status(400).json({
				message: 'email address is invalid or in an invalid format'
			});
		}
		if (emailAdd) {
			db.any('SELECT * FROM users WHERE email = $1', [email])
			.then( user => {
				if (user.length < 1) {
					return res.status(401).json({message: 'invalid user!'});
				}
				bcrypt.compare(pwd, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({message: 'invalid user!'});
					}
					if (result) {
						const token = jwt.sign({
							id : user[0].id,
							username: user[0].username,
							fullName: user[0].fullname,
							email: user[0].email
						},process.env.JWT_KEY,{
							expiresIn: '1h'
						});
						res.header('x-access-token', token);
						return res.status(200).json({ message: 'successfully logged in!' });
					}
					return res.status(401).json({ message: 'email and password do not match' });
				});
			})
			.catch(
				error => res.status(500).json({ error })
			);
		}		
	}

	logout (req,res) {
		const { id } = req.userData;
		const { userId } = req.params;
		if ( id === userId) {
			return res.header('x-access-token', '');
		}
		return res.status(400).json({ message: 'access denied!' });
	}
	
};
