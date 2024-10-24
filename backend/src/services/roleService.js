import Role from '../models/role.js';
import  ApiError from '../utils/ApiError.js';

class RoleService {
    async createRole(roleData) {
        return Role.create(roleData);
    }

    async getAllRoles() {
        return await Role.findAll();
    }

    async getRoleById(roleId) {
        const role = await Role.findByPk(roleId);
        if (!role) {
        throw new ApiError(404, 'Role not found');
        }
        return role;
    }

    async getRoleByValue(roleValue) {
        const role = await Role.findOne({ where: { value: roleValue } });
        if (!role) {
        throw new ApiError(404, 'Role not found');
        }
        return role;
    }
}

export default new RoleService();