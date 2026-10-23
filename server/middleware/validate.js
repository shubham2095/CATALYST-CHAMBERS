// Validates req.body against a zod schema and replaces it with the parsed (trimmed, defaulted) data.
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    req.body = result.data;
    next();
  };
}

module.exports = validate;
