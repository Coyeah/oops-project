let CURRENT: string | string[] = 'NULL';

type TCurrentAuthority = string | string[] | (() => typeof CURRENT);

const renderAuthorize = <T>(Authorized: T): ((currentAuthority: TCurrentAuthority) => T) => (
  currentAuthority: TCurrentAuthority
): T => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }
    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority as string[];
    }
  } else {
    CURRENT = 'NULL';
  }
  return Authorized;
}

export { CURRENT };
export default <T>(Authorized: T) => renderAuthorize<T>(Authorized);