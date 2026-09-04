const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (email === 'admin@oasis.com' && password === 'admin123') {
            const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            return res.status(200).json({ token, message: 'Admin logged in' });
        }
        
        return res.status(401).json({ message: 'Invalid admin credentials' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin' });
    }
};

module.exports = { loginAdmin };
