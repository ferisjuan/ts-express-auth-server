import { Request, Response } from 'express'
import { get, controller, use, post, bodyValidator } from './decorators'

import { logger } from '../utils/logger'

@controller('/auth')
export class LoginController {
	@get('/login')
	@use(logger)
	getLogin(_req: Request, res: Response): void {
		res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email"/>
        </div>
            <div>
          <label>Password</label>
          <input name="password"/>
        </div>
        <button>Submit</button>
      </form>
  `)
	}

	@post('/login')
	@use(logger)
	@bodyValidator('email', 'password')
	postLogin(req: Request, res: Response): void {
		const { email, password } = req.body

		if (email && password && email === 'hi@hi.com' && password === 'password') {
			req.session = { loggedIn: true }
			res.redirect('/')
		} else {
			res.send('Invalid email or password')
		}
	}
}
