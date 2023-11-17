import * as bcrypt from 'bcrypt'
import { SALT_OR_ROUNDS } from 'src/constants/constants'

export async function getHash(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_OR_ROUNDS)
}

export async function compare(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}
