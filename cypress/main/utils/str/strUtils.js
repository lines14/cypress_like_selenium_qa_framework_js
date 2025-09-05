class StrUtils {
  static toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  }

  static removeAllNonNumbersFromString(str) {
    return str.replace(/\D/g, '');
  }

  /* eslint-disable no-new-func */
  static interpolate = (templateStr, variables = {}) => {
    try {
      const keys = Object.keys(variables);
      const values = Object.values(variables);

      // Use Function constructor to interpolate safely
      const fn = new Function(...keys, `return \`${templateStr}\`;`);
      return fn(...values);
    } catch (error) {
      throw new Error(`[err]   string interpolation error!\n${error}`);
    }
  };
}

module.exports = StrUtils;
