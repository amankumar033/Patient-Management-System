export const verifyPasskey = async (passkey: string) => {
  if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
    return true;
  }
  return false;
}