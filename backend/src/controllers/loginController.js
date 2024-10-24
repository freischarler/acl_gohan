import roleService from '../services/roleService.js';
import userService from '../services/userService.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcrypt';

class LoginController {
    async postLogin(req, res, next) {
        try {
            console.log(req.body)
            const { email, password } = req.body;
            

            // Validate the email and password
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
        
            // Find the user in your database
            const user = await userService.findUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            // Check the password
            const isPasswordValid = await userService.checkUserPassword(user, password);
        
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
        
            // The user is logged in
            res.json({ message: 'Logged in successfully' });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    async getLoginUserByEmail(req, res, next) {
        try {
            const email = req.params.email;
            
            // Validate the email and password
            if (!email) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
        
            // Find the user in your database
            const user = await userService.getUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        

            // Set role name
            const role = await roleService.getRoleById(user.role_id);
            user.dataValues.role = role.name;
    
            // The user is logged in
            res.json(user);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async postForgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            
            // Validate the email
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            // Find the user in your database
            const user = await userService.findUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Generate a reset token
            const resetToken = await userService.generateResetToken(user);
        
            // Send an email with the reset token
            console.log(`Reset token: ${resetToken}`);
            
            const resetUrl = `http://${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

            const message = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta charset="UTF-8" />
              <title>Restablecer tu contraseña</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
                .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
                .email-header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; }
                .email-body { padding: 20px; }
                .email-body h1 { font-size: 24px; margin: 0 0 20px; }
                .email-body p { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }
                .email-footer { background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 12px; color: #666666; }
                .btn { display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; }
                @media screen and (max-width: 600px) { .email-container { width: 100% !important; } .email-body h1 { font-size: 20px !important; } }
              </style>
            </head>
            <body>
              <table class="email-container" align="center">
                <tr>
                  <td class="email-header"><h1>Solicitud de restablecimiento de contraseña</h1></td>
                </tr>
                <tr>
                  <td class="email-body">
                    <h1>Hola,</h1>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para restablecerla:</p>
                    <p style="text-align:center;">
                      <a href="${resetUrl}" class="btn">Restablecer tu contraseña</a>
                    </p>
                    <p>Si no solicitaste un restablecimiento de contraseña, ignora este correo. Este enlace expirará en 30 minutos.</p>
                  </td>
                </tr>
                <tr>
                  <td class="email-footer">
                    <p>&copy; 2024 Unity. Todos los derechos reservados.</p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `;

            // Send the email
            await sendEmail(email, 'Reset your password', message);

            res.json({ message: 'Reset token send' });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    async postResetPassword(req, res, next) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            
            // Validate the token and password
            if (!token || !password) {
                return res.status(400).json({ message: 'Token and password are required' });
            }
        
            // Find the user with the token
            const user = await userService.findUserByResetToken(token);
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            //Check the reset token expiration
            if (user.reset_token_expires < new Date()) {
                return res.status(400).json({ message: 'Token expired' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            // Reset the password
            await userService.updateUser(user.user_id, { password_hash: hashedPassword });
        
            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

export default new LoginController();