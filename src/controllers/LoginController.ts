import { Request, Response } from 'express'
import { get, controller } from './decorators'

@controller('/auth')
export class LoginController {
	@get('/login')
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