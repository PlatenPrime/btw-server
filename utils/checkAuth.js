import jwt from "jsonwebtoken"


export const checkAuth = (req, res, next) => {

	if (req.method === "OPTIONS") {
		next()
	}


	try {
		const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

		console.log(token);


		if (!token) {
			return res.status(403).json({ message: "Користувач не авторизований" })
		}
		const decodedData = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decodedData
		next()

	} catch (error) {
		console.log(error);
		return res.status(403).json({ message: "Користувач не авторизований" })


	}



}