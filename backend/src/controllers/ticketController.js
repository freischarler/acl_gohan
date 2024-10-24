import ticketService from '../services/ticketService.js';

class TicketController {
  async createTicket(req, res, next) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getTicketById(req, res, next) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async getAllTickets(req, res, next) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getTicketsByUserId(req, res, next) {
    try {
      console.log(req.params.id)
      const tickets = await ticketService.getTicketsByUserId(req.params.userId);
      res.status(200).json(tickets);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async updateTicket(req, res, next) {
    try {
      const ticket = await ticketService.updateTicket(req.params.id, req.body);
      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async deleteTicket(req, res, next) {
    try {
      await ticketService.deleteTicket(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
