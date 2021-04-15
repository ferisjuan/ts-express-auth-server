import { Request, Response } from 'express'
import { get, controller, use } from './decorators'

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
}
