import jwt from "jsonwebtoken"


export const checkRoles = (roles) => {
	return function (req, res, next) {

		if (req.method === "OPTIONS") {
			next()
		}

		try {


			const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")
			if (!token) {
				return res.status(403).json({ message: "Користувач не авторизований" })
			}


			const { role: userRole } = jwt.verify(token, process.env.JWT_SECRET)

			let hasRole = false


			if (roles.includes(userRole)) {
				hasRole = true
			};


			if (!hasRole) {
				return res.status(403).json({ message: "Користувач не має доступу" })
			}

			next()

		} catch (error) {
			console.log(error);
			return res.status(403).json({ message: "Користувач не авторизований" })


		}






	}
}

