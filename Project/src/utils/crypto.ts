import { createHash } from 'node:crypto'

/**
 * Returns a SHA256 hash using SHA-3 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-3
 *
 * @param {String} content
 *
 * @returns {String}
 */
export function hashPassword(content: string) {
  return createHash('sha3-256')
    .update(content + process.env.PASSWORD_SECRET)
    .digest('hex')
}
