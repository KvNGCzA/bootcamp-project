import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';


export class User {
	
	// fetch all users
	fetchUsers(req, res) {
		db.any('SELECT * FROM users').then(
			users => res.status(200).json({ status: 200, users })
		).catch(
			error => res.status(500).json({ status: 500, error })
		);
	}

	// fetch a user by username
	fetchUserByUsername (req, res) {
		const { username } = req.params;
		db.any('SELECT * FROM users WHERE username = $1', [ username ])
		.then(user => {
			if (user.length < 1) {
				return res.status(404).json({ status: 404, message: 'user not found!' });
			}
			return res.status(200).json({ status: 200, user });
		})
		.catch(error => res.status(500).json({ status: 500, error }));
	}

	// create a new user
	createUser(req, res) {
		const { firstName, lastName, occupation, username, email, password } = req.body;
		const fullName = `${firstName} ${lastName}`;
		const validateEmail= (str) => {
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

		const emailAdd = validateEmail(email);
		const first = typeof firstName === 'string' && firstName.length > 1 && (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g).test(firstName);
		const last = typeof lastName === 'string' && lastName.length > 1 && (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g).test(lastName);
		const usernamecheck = typeof username === 'string' && username.length > 1 &&  (/^[a-zA-Z0-9]+(([_][a-zA-Z0-9])?[a-zA-Z0-9]*)*$/g).test(username);
		let profileImageName;
		if(!firstName || first === false){
			return res.status(400).json({ status: 400, message: 'first name is empty or an invalid format' });
		}
		if(!lastName || last === false){
			return res.status(400).json({ status: 400, message: 'last name is empty or an invalid format' });
		}
		if(!username || usernamecheck === false){
			return res.status(400).json({ status: 400, message: 'username is empty or an invalid format' });
		}
		if(!email || emailAdd === false){
			return res.status(400).json({ status: 400, message: 'email is empty or an invalid format' });
		} 
		if(!password){
			return res.status(400).json({ status: 400, message: 'password is empty or an invalid format' });
		}
		try {			
			const { filename } = req.file;
			profileImageName = filename;
		} catch (error) {
				profileImageName = 'rubix.png';
		}
		if (first && last && username && emailAdd) {
			db.any('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])
			.then( user => {
				if (user.length === 0) {
						const hash = bcrypt.hashSync(password, 10);
						return db.any('INSERT INTO users (fullname, occupation, username, email, password, profileimage) VALUES ($1, $2, $3, $4, $5, $6)', [fullName, occupation, username, email, hash, profileImageName])
							.then(() => {
								db.any('UPDATE users SET logged_in =  $1 WHERE email = $2', [true, email])
								.then(() => {
									db.any('SELECT * FROM users WHERE email = $1', [email])
									.then(user => {
										const profile = user[0];
										const token = jwt.sign({
											id : user[0].id,
											username,
											email,
											fullName
										},process.env.JWT_KEY);	
										res.header('x-access-token', token);
										return res.status(201).json({ status: 201, message: 'user created', token, profile })
									})
									.catch(error => {
										return res.status(500).json({ status: 500, error });
									});
								})
								.catch(error => res.status(500).json({ status: 500, error}));
							})
							.catch(error => res.status(500).json({ status: 500, error}));
				}
				if (user[0].email === email) {
					return res.status(409).json({ status: 409, message: 'a user with this email already exists' });
				}
				if (user[0].username === username) {
					return res.status(409).json({ status: 409, message: 'a user with this username already exists' });
				}
			})
			.catch(error => res.status(500).json({ status: 500, error }));
		}		
	}

	// login to an account
	login (req, res) {
		const validateEmail= (str) => {
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
		const { email, password } = req.body;
		const emailAdd = validateEmail(email);
		if (!email || emailAdd === false) {
			return res.status(400).json({ 
				status: 400,
				message: 'email address is invalid or in an invalid format'
			});
		}
		if (!password) {
			return res.status(400).json({ 
				status: 400,
				message: 'please enter a valid password'
			});
		}
		if (emailAdd) {
			db.any('SELECT * FROM users WHERE email = $1', [email])
			.then( user => {
				const profile = user[0];
				if (user.length < 1) {
					return res.status(400).json({ status: 400, message: 'invalid user!'});
				}
				db.any('UPDATE users SET logged_in = $1 WHERE email = $2', [true, email])
				.then(() => {
					bcrypt.compare(password, user[0].password, (err, result) => {
						if (err) {
							return res.status(400).json({ status: 400, message: 'invalid user!'});
						}
						if (result) {
							const token = jwt.sign({
								id : user[0].id,
								username: user[0].username,
								fullName: user[0].fullname,
								email: user[0].email
							},process.env.JWT_KEY);
							res.header('x-access-token', token);
							return res.status(200).json({
								status: 200,
								message: 'successfully logged in!',
								profile,
								token });
						}
						return res.status(401).json({ 
							status: 401,
							message: 'email and password do not match'
						});
					});
				})
				.catch(error => res.status(500).json({ status: 500, error }));
			})
			.catch(
				error => res.status(500).json({ status: 500, error })
			);
		}		
	}

	logout (req,res) {
		const { id } = req.userData;
		db.any('UPDATE users SET logged_in = $1 WHERE id = $2', [false, id])
		.then(() => {
			res.status(200).json({ status: 200, message: 'user logged out!' });
		})
		.catch(error => res.status(500).json({ status: 500, error }));
	}
	
};
