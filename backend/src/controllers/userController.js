import userService from '../services/userService.js';
import teamService from '../services/teamService.js';
import bcrypt from 'bcrypt';

class UserController {
  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);

      //get team user
      const team = await teamService.getTeamById(user.team_id);
      user.dataValues.team = team.name

      //dont send passworhash
      delete user.dataValues.password_hash

      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateUserPassword(req, res, next) {
    try {
      const { old_password, password_new } = req.body;
      const user_id = req.params.id;
      //first check if user exist and password is correct
      const user = await userService.getUserById(user_id);
      //console.log(user.dataValues)
      //console.log(old_password)
      //console.log(password_new)
      
      const isPasswordValid = await userService.checkUserPassword(user.dataValues, old_password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password_new, 10);

      user.dataValues.password_hash = hashedPassword
      const updatedUser = await userService.updateUser(user_id, user.dataValues);
      //console.log(updatedUser)
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
