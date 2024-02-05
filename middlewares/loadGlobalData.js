module.exports = (client) => async (req, res, next) => {
	try {
		res.locals.preloader = await client.getSingle("preloader");
		res.locals.footer = await client.getSingle("footer");
		res.locals.navigation = await client.getSingle("navigation");
		next();
	} catch (error) {
		next(error);
	}
};
