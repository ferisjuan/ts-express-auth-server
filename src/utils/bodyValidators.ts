import { NextFunction, Request, RequestHandler, Response } from 'express'

export function bodyValidators(keys: string[]): RequestHandler {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.body) return invalidRequest(res, 'Invalid request')

		for (let key of keys) {
			if (!req.body[key]) return invalidRequest(res, `Missing property ${key}`)
		}

		next()
	}
}

function invalidRequest(res: Response, message: string) {
	res.status(422).send(message)
	return
}
