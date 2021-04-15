import { AppRouter } from '../../AppRouter'
import 'reflect-metadata'

import { Methods } from './MethodsEnum'
import { MetadataKeys } from './MetadataKeysEnum'
import { bodyValidators } from '../../utils/bodyValidators'

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance()

		for (let key in target.prototype) {
			const routeHandler = target.prototype[key]
			const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
			const method: Methods = Reflect.getMetadata(
				'method',
				target.prototype,
				key
			)
			const middlewares =
				Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
				[]

			const requiredBodyProps =
				Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

			const validator = bodyValidators(requiredBodyProps)

			if (path) {
				router[method](
					`${routePrefix}${path}`,
					...middlewares,
					validator,
					routeHandler
				)
			}
		}
	}
}
