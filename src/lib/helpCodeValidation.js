const helpCodes = [
  { owner: 'Pedroca', salt: 'd4f19a70', hash: 'bfc2c1f3e3773570277bbe0555b58d70cc3f20e89a70a5a1797dc86266a7a7c8' },
  { owner: 'Marialuiza', salt: 'a82c53e1', hash: '2beeaeb59be3e6d274357eb3db57bdcc9150601bcdce2abfe6668b72ec6d8c92' },
  { owner: 'Pedro Silva', salt: '73be0d42', hash: '3ea7dac6598790601428867bb93d38fd723636f9b67081f9358783b8207a7f1b' },
  { owner: 'Andre', salt: 'f19a65c8', hash: '604dd28bc64140c9aa73b2f68fccfc08163f8e26e18ca6dba9ba6f47dd3644f7' },
  { owner: 'Anne', salt: 'c531e8a4', hash: 'bf51f48377cfef8856df82aa73f00aa0c70899df0f0cc704aefe50d920875383' },
]

async function hashHelpCode(value, salt) {
  const bytes = new TextEncoder().encode(`${salt}${value}`)
  const digest = await window.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function findHelpCodeOwner(value) {
  if (!window.crypto?.subtle) throw new Error('Web Crypto indisponível')

  const matches = await Promise.all(helpCodes.map(async ({ owner, salt, hash }) => ({
    owner,
    matches: (await hashHelpCode(value, salt)) === hash,
  })))

  return matches.find(({ matches: isMatch }) => isMatch)?.owner ?? null
}
