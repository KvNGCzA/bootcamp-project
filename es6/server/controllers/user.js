import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';


export class User {
	// create a new user
	createUser(req, res) {
		db.any('SELECT * FROM users WHERE email = $1', [req.body.email])
		.then( user => {
				if (user.length === 0) {
					const email =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email);
					const password = /[a-zA-Z]/.test(req.body.password) && /[\W\d]/.test(req.body.password) && req.body.password.length >= 6;					
					if(email && password){						
						const hash = bcrypt.hashSync(req.body.password, 10);
						return db.any('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, hash])
							.then(() => res.status(201).json({ message: 'user created'}))
							.catch((error) => res.status(400).json({error})
							);
						}
						if(!email){
							return res.status(400).json({ message: 'email is an invalid format' });
						} 
						if(!password){
							return res.status(400).json({ message: 'password is an invalid format' });
						}
				}
				return res.status(409).json({ message: 'User mail exists' });
			})
			.catch((error) => {
			res.status(400).json(error);
		});
	}

	// login to an account
	login (req, res) {
		db.any('SELECT * FROM users WHERE email = $1', [req.body.email])
		.then( user => {
			if (user.length < 1) {
				return res.status(401).json({message: 'Authentication failed!'});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({message: 'Authentication failed!'});
				}
				if (result) {
					const token = jwt.sign({
						email: user[0].email,
						userid: user[0].id 
					},process.env.JWT_KEY,{
						expiresIn: "1h"
					});
					
					return res.status(200).json({message: 'Authentication successful!'});
				}
				return res.status(401).json({message: 'Authentication failed!'});
			});
		})
		.catch();
	}

	// fetch all users
	fetchUsers(req, res) {
		db.any('SELECT * FROM users').then(
			users => res.status(200).json({users})
		).catch(
			error => res.status(400).json({error})
		);
	}
}
