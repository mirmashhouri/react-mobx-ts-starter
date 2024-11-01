const trimWhitespace = (str: string, nl = '\n') => (
  str?.trim()
    .replace(/\n\s+/g, nl)
    .replace(/ +/g, ' ')
);

const cssVarRegEx = /(\/\*\s*([\s\w\d().,-_&!$#%'"`]+)\s*\*\/)?\s*(--[\s\w-]+):\s*([\s\w\d-()#.,!%]+)\s*;/g;

export type ICSSVariable = {
  comment?: string,
  key: string,
  value: string
};

export const parseCSSVars = (data: string): ICSSVariable[] => {
  const results = data.matchAll(cssVarRegEx);
  const styles: ICSSVariable[] = [];
  for (const result of results) {
    let comment = trimWhitespace(result[2]);
    let name = result[3]?.trim();
    let value = trimWhitespace(result[4], ' ');
    styles.push({
      key: name,
      comment: comment,
      value: value,
    });
  }
  return styles;
};
