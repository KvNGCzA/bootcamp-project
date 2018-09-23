import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';

export class User {
	
	// fetch all users
	fetchUsers(req, res) {
		db.any('SELECT * FROM users')
		.then(users => res.status(200).json({ status: 200, users }))
		.catch(error => res.status(500).json({ status: 500, error }));
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
		const { firstName, lastName, username, email, password, occupation } = req.body;
		const fullname = `${firstName} ${lastName}`;
		let profileImageName;
		try {
			const { filename } = req.file;
			profileImageName = filename;
		} catch (error) { profileImageName = 'rubix.png'; }
		db.any('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username])
		.then( user => {
			if (user.length === 0) {
				const hash = bcrypt.hashSync(password, 10);
				return db.tx(t => {
					const q1 = t.any('INSERT INTO users (fullname, occupation, username, email, password, profileimage) VALUES ($1, $2, $3, $4, $5, $6)', [fullname, occupation, username, email, hash, profileImageName]);
					const q2 = t.none('UPDATE users SET logged_in =  $1 WHERE email = $2', [true, email]);
					const q3 = t.any('SELECT * FROM users WHERE email = $1', [email]);
					return t.batch([q1, q2, q3]);
				}).then(data => {
					const profile = data[2][0];
					const token = jwt.sign({ id : profile.id, username, email, fullname }, process.env.JWT_KEY);
					res.header('x-access-token', token);
					return res.status(201).json({ status: 201, message: 'user created', token, profile });
				}).catch(error => res.status(500).json({ status: 500, error }));
			}if (user[0].email === email) {
				return res.status(409).json({ status: 409, message: 'a user with this email already exists' });
			}if (user[0].username === username) {
				return res.status(409).json({ status: 409, message: 'a user with this username already exists' });
			}
		}).catch(error => res.status(500).json({ status: 500, error }));
	}

	// login to an account
	login (req, res) {
		const { email, password } = req.body;
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
							const { id, username, fullname, email } = user[0];
							const token = jwt.sign({id, username, fullname, email}, process.env.JWT_KEY);
							res.header('x-access-token', token);
							return res.status(200).json({ status: 200, message: 'successfully logged in!', profile, token });
						}
						return res.status(401).json({ status: 401, message: 'email and password do not match' });
					});
				}).catch(error => res.status(500).json({ status: 500, error }));
			}).catch(error => res.status(500).json({ status: 500, error }));
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
