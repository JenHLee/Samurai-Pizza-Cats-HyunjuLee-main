const validateStringInputs = (input: string | string[]): void => {
  if (Array.isArray(input)) {
    input.forEach((elem: string) => {
      if (!elem.trim()) {
        throw new Error('Inputs cannot be empty strings');
      }
    });
  } else {
    if (!input.trim()) {
      throw new Error('Inputs cannot be empty strings');
    }
  }
};

export default validateStringInputs;
