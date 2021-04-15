import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { requireAuth } from '../utils/requireAuth'
import { controller, get, use } from './decorators'

@controller('')
export class RootController {
	@get('/')
	@use(logger)
	getRoot(req: Request, res: Response) {
		if (req.session && req.session.loggedIn) {
			res.send(`
    <div>
      <div>You are logged in
      <a href="/auth/logout">Logout</a>
      </div>
    </div>
    `)
		} else {
			res.send(`
    <div>
      <div>You are not logged in
      <a href="/auth/login">Login</a>
      </div>
    </div>
    `)
		}
	}

	@get('/protected')
	@use(logger)
	@use(requireAuth)
	getProtected(_req: Request, res: Response) {
		res.send('Welcome to the protected realm')
	}
}
