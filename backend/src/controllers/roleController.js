import roleService from "../services/roleService.js";

class RoleController {
    async createRole(req, res, next) {
        try {
            const role = await roleService.createRole(req.body);
            res.status(201).json(role);
        } catch (error) {
            //console.log(error)
            next(error);
        }
    }

    async getRoleById(req, res, next) {
        try {
            const role = await roleService.getRoleById(req.params.id);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async getAllRoles(req, res, next) {
        try {
            const roles = await roleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    async updateRole(req, res, next) {
        try {
            const role = await roleService.updateRole(req.params.id, req.body);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req, res, next) {
        try {
            await roleService.deleteRole(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new RoleController();