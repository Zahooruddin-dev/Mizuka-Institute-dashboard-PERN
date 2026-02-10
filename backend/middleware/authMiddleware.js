const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
	const token = req.headers['authorization'?.split(' ')[1]];
	if (!token) {
		return res.status(403).json({ message: 'No token provided' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; //Can add {id,role} if it requests object in future
    next()
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
};
/*    return res.status(403).json({message:'Require Teacher or Admin Role to have access!'})
 */
module.exports={verifyToken}