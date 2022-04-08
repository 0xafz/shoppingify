import crypto from "node:crypto"
import { promisify } from "node:util"
import tokenGenerator from "./TokenGenerator"

const scrypt = promisify(crypto.scrypt)

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(8).toString("hex")
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return salt + ":" + derivedKey.toString("hex")
}

export async function checkPassword(
  plaintextPassword: string,
  hashedPassword: string
) {
  const [salt, key] = hashedPassword.split(":")
  const derivedKey = (await scrypt(
    plaintextPassword,
    salt,
    64
  )) as NodeJS.ArrayBufferView

  return crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey)
}

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex")
}
export function uuidv4(): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    // @ts-ignore
    (
      c ^
      // @ts-ignore
      (crypto.randomFillSync(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export function SignWithUserClaims(user: { id: number }, fingerprint?: string) {
  return tokenGenerator.signWithClaims({
    "X-Auth-User-Id": String(user.id),
    ...(fingerprint ? { "X-Auth-FingerPrint": fingerprint } : null),
  })
}

export function md5(value: string) {
  return crypto.createHash("md5").update(value).digest("hex")
}
