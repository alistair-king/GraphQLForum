import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthUser } from './auth-user'

const namespace =
  process.env.AUTH0_NAMESPACE ?? 'https://graphqlforum.com'

/**
 * Verifies Auth0 access tokens (RS256, via the tenant's JWKS endpoint)
 * and maps token claims to the internal AuthUser shape.
 *
 * The access token only contains `sub` by default; email/name/picture and
 * roles are expected as (namespaced) custom claims added by an Auth0 Action.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER ?? `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    })
  }

  validate(payload: Record<string, any>): AuthUser {
    return {
      sub: payload.sub,
      email: payload[`${namespace}/email`] ?? payload.email,
      name: payload[`${namespace}/name`] ?? payload.name,
      picture: payload[`${namespace}/picture`] ?? payload.picture,
      roles: rolesFromClaims(payload[`${namespace}/roles`] ?? payload.roles),
    }
  }
}

function rolesFromClaims(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(role => String(role))
  }
  if (typeof value === 'string' && value.length > 0) {
    return value
      .split(',')
      .map(role => role.trim())
      .filter(Boolean)
  }
  return []
}
