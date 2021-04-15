import { NextFunction, Request, Response } from 'express'

export function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (req.session?.loggedIn) return next()

	res.status(403).send('Not allowed')
}
