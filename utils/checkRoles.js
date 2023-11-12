export const checkRoles = (allowedRoles) => {
	return (req, res, next) => {
		const userRole = req.user.role;

		if (allowedRoles.includes(userRole)) {
			next(); // Разрешить доступ, так как роль пользователя в списке разрешенных
		} else {
			return res.json({
				message: 'У вас нет прав для выполнения этого действия.',
			});
		}
	};
};
