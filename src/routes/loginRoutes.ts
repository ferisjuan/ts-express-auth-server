import { Router, Request, Response, NextFunction } from 'express'

function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session?.loggedIn) return next()

	res.status(403).send('Not allowed')
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
	if (req.session && req.session.loggedIn) {
		res.send(`
    <div>
      <div>You are logged in
      <a href="logout">Logout</a>
      </div>
    </div>
    `)
	} else {
		res.send(`
    <div>
      <div>You are not logged in
      <a href="login">Login</a>
      </div>
    </div>
    `)
	}
})

router.get('/logout', (req: Request, res: Response) => {
	req.session = undefined
	res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send('Welcome to the protected realm')
})
export { router }
