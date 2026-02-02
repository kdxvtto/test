export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            return res.status(422).json({message: result.error.errors[0].message})
        }
        req.body = result.data
        next()
    }
}