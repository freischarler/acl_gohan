import { compare } from 'bcrypt';
import User from '../models/user.js';
import  ApiError from '../utils/ApiError.js';
import crypto from 'crypto';

class UserService {
  async createUser(userData) {
    return User.create(userData);
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getAllUsers() {
    return User.findAll();
  }

  async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async checkUserPassword(user, password) {
    return compare(password, user.password_hash);
  }

  async updateUser(userId, userData) {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    // Merge userData into the user instance
    user.set(userData);

    // Save the updated user instance
    await user.save();
    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    await user.destroy();
    return user;
  }

  async getLogin(userData) {
    const user = await User.findOne({ where: userData });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async generateResetToken(user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 1800000; // 30 minutes
    await this.updateUser( user.dataValues.user_id, { reset_token: resetToken, reset_token_expires: resetTokenExpires });
    return resetToken;
  }

  async findUserByResetToken(resetToken) {
    return User.findOne({ where: { reset_token: resetToken } });
  }
}

export default new UserService();
