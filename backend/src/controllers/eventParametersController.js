import eventParametersService from '../services/eventParametersService.js';
import ageService from '../services/ageService.js';
import userService from '../services/userService.js';
import categoryService from '../services/categoryService.js';
import weightService from '../services/weightService.js';



class EventParametersController {
  async createEventParameters(req, res, next) {
    try {
      // First check if the event exists and if we don't repeat the parameters for the event
      const eventParametersChecker = await eventParametersService.getEventParametersByEvents(req.body.event_id);
      
      // Check if any of the previous parameters match the new parameters
      for (const previousParameters of eventParametersChecker) {
        const { dataValues } = previousParameters;
        if (
          dataValues.weight_id === req.body.weight_id &&
          dataValues.age_id === req.body.age_id &&
          dataValues.category_id === req.body.category_id &&
          dataValues.gender_id === req.body.gender_id
        ) {
          return res.status(200).json(dataValues);
        }
      }

      // If no match is found, create new event parameters
      const eventParameters = await eventParametersService.createEventParameters(req.body);
      res.status(201).json(eventParameters);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getEventParametersById(req, res, next) {
    try {
      const eventParameters = await eventParametersService.getEventParametersById(req.params.id);
      res.status(200).json(eventParameters);
    } catch (error) {
      next(error);
    }
  }

  async getAllEventParameterss(req, res, next) {
    try {
      const eventParameterss = await eventParametersService.getAllEventParameterss();
      res.status(200).json(eventParameterss);
    } catch (error) {
      next(error);
    }
  }

  async getEventParametersByEventsAndUser(req, res, next) {
    try {
        // First get Parameters for the event
        const eventParameters = await eventParametersService.getEventParametersByEvents(req.params.id);

        let ageParameters = await ageService.getAllAges(); // Changed to let
        // Then get the user's parameters
        const user = await userService.getUserById(req.params.userId);

        // Calculate user age : 1989-12-31 22:00:00-02
        const userAge = new Date().getFullYear() - new Date(user.born).getFullYear();
        const genderId = user.gender_id; // Get the user's gender_id
        let userParameters;

        if (userAge < 18) {
            // Filter all the parameters that are for kids
            ageParameters = ageParameters.filter(age => age.years < 18);

            // Filter all the parameters that are for the user's age and gender
            userParameters = eventParameters.filter(eventParameter => 
                ageParameters.some(ageParameter => eventParameter.age_id === ageParameter.age_id) &&
                eventParameter.gender_id === genderId
            );
        } else {
            // Filter all the parameters that are for adults
            ageParameters = ageParameters.filter(age => age.years >= 18 && userAge >= age.years);

            // Filter all the parameters that are for the user's age and gender
            userParameters = eventParameters.filter(eventParameter => 
                ageParameters.some(ageParameter => eventParameter.age_id === ageParameter.age_id) &&
                eventParameter.gender_id === genderId
            );
        }

        for (let i = 0; i < eventParameters.length; i++) {
          const categoryDetails = await categoryService.getCategoryById(eventParameters[i].category_id);
          const weightDetails = await weightService.getWeightById(eventParameters[i].weight_id);
          const ageDetails = await ageService.getAgeById(eventParameters[i].age_id);
  
          eventParameters[i].dataValues.category = categoryDetails.name;
          eventParameters[i].dataValues.weight = weightDetails.value;
          eventParameters[i].dataValues.age = ageDetails.value;
  
          delete eventParameters[i].dataValues.category_id;
          delete eventParameters[i].dataValues.weight_id;
          delete eventParameters[i].dataValues.age_id;
          delete eventParameters[i].dataValues.event_id;
          delete eventParameters[i].dataValues.event_parameters_id;
          delete eventParameters[i].dataValues.gender_id;
        }

        res.status(200).json(userParameters);
    } catch (error) {
        console.log(error);
        next(error);
    }
  }

  async updateEventParameters(req, res, next) {
    try {
      const eventParameters = await eventParametersService.updateEventParameters(req.params.id, req.body);
      res.status(200).json(eventParameters);
    } catch (error) {
      next(error);
    }
  }

  async deleteEventParameters(req, res, next) {
    try {
      await eventParametersService.deleteEventParameters(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getEventParametersByEvents(req, res, next) {
    try {
      const events = await eventParametersService.getEventParametersByEvents(req.params.id);
      res.status(200).json(events);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

export default new EventParametersController();
