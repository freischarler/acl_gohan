'use strict';
const { v4: uuidv4 } = require('uuid');
const { hash } = require('bcryptjs');
const { type } = require('express/lib/response');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      team_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      colors: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      webpage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });

    await queryInterface.createTable('roles', {
      role_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.createTable('genders', {
      gender_id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('categories', {
      category_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
    });

    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'genders',
          key: 'gender_id',
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'teams',
          key: 'team_id',
        },
      },
      born: {
        type: Sequelize.DATE,
        allowNull: false
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'role_id',
        },
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reset_token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reset_token_expires: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });

    await queryInterface.createTable('athlete_categories', {
      athlete_categories_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      athlete_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onDelete: 'CASCADE'
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.createTable('coaches', {
      coach_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
      },
    });

    await queryInterface.createTable('weights', {
      weight_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    
    await queryInterface.createTable('ages', {
      age_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      years: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.createTable('styles', {
      style_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('events', {
      event_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      style_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'styles',
          key: 'style_id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      weighing_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      type: { // Tournament, Seminar, Workshop, etc
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      }
    });

    await queryInterface.createTable('event_prices', {
      price_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valid_from: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valid_to: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('matches', {
      match_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'events', // name of your user model
            key: 'event_id'
          }
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      style: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      user1_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id',
        },
        allowNull: true,
      },
      team1_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'teams', // name of your academy model
          key: 'team_id'
        }
      },
      user2_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
        allowNull: true,
      },
      team2_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'teams', // name of your academy model
          key: 'team_id'
        }
      },
      points1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      points2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      win_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      winner_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      winner_points: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      losser_points: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
    });

    await queryInterface.createTable('tickets', {
      ticket_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      purchase_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      reference_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'active',
      },
    });

    await queryInterface.createTable('qr_codes', {
      qr_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      ticket_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tickets',
          key: 'ticket_id',
        },
      },
      qr_code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });

    await queryInterface.createTable('registrations', {
      registration_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      team_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'team_id',
        },
      },
      weight_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'weights',
          key: 'weight_id',
        },
      },
      age_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ages',
          key: 'age_id',
        },
      },
      style_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'styles',
          key: 'style_id',
        },
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: 'pending',
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      reference_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });
    

    await queryInterface.createTable('event_parameters', {
      event_parameters_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'event_id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'category_id',
        },
      },
      weight_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'weights',
          key: 'weight_id',
        },
      },
      age_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ages',
          key: 'age_id',
        },
      },
      gender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'genders',
          key: 'gender_id',
        },
      },
    });

    await seedDatabase(queryInterface);
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('qr_codes');
    await queryInterface.dropTable('tickets');
    await queryInterface.dropTable('match_points');
    await queryInterface.dropTable('matches');
    await queryInterface.dropTable('events');
    await queryInterface.dropTable('user_teams');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('teams');
    await queryInterface.dropTable('event_prices');
    await queryInterface.dropTable('coach');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('registrations');

  }
};


async function seedDatabase(queryInterface) {
  // DUMMY DATA

    await queryInterface.bulkInsert('categories', [
      {
        category_id: 'a594ac40-d362-441e-8fb8-f64460084c19',
        name: 'Profesional',
      },
      {
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        name: 'Amateur',
      }
    ]);

    await queryInterface.bulkInsert('roles', [
      {
        role_id: 'bb8bb01b-521e-4718-b983-3353ad116e84',
        name: 'admin',
      },
      {
        role_id: '99dfda1a-64d9-4664-a6e1-bfa743b2a858',
        name: 'user',
      }
    ]);

    await queryInterface.bulkInsert('teams', [
      {
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        name: 'Athlètes Individuels Neutres',
        country: 'France',
        city: 'Paris',
        address: 'N/A',
        phone: 'N/A',
        colors: 'green, white',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Individual_Neutral_Athletes_at_the_2024_Summer_Olympics_Flag.svg/220px-Individual_Neutral_Athletes_at_the_2024_Summer_Olympics_Flag.svg.png',
        webpage: 'https://en.wikipedia.org/wiki/Individual_Neutral_Athletes_at_the_2024_Summer_Olympics',
        description: 'Individual Neutral Athletes (Russian: Индивидуальные нейтральные спортсмены, Belarusian: Індывідуальныя нейтральныя спартсмены) is the name used to represent approved Russian and Belarusian athletes at the 2024 Summer Olympics, after the International Olympic Committee (IOC) banned the nations previous designations due to the Russian invasion of Ukraine in 2022. The IOC country code is AIN, after the French name Athlètes Individuels Neutres.[1]. The delegation is banned from using the neutral Olympic flag and Olympic anthem, and will instead use a flag depicting a circular AIN emblem and a one-off instrumental anthem, both assigned by the IOC.[2] Individual neutral athletes must be approved by each sports international federation, but an international federation has the discretion not to approve any athletes in their sport.[3] As individual athletes, the delegation will not take part in the parade of nations during the opening ceremony, nor be listed as a delegation on official medal tables.     While the flag uses the singular wording "Individual Neutral Athlete", the IOC uses the plural wording "Individual Neutral Athletes" in prose. '
      },
      {
        team_id: uuidv4(),
        name: 'Team 1',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        colors: 'red, white',
        image_url: 'https://via.placeholder.com/150',
        webpage: 'https://team1.com',
        description: 'This is a description of team 1',
      },
      {
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        name: 'CAE',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        colors: 'blue, white',
        image_url: 'https://via.placeholder.com/150',
        webpage: 'https://team2.com',
        description: 'This is a description of team 2',
      },
    ]);

    await queryInterface.bulkInsert('genders', [
      {
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
        value: 'Male'
      },
      {
        gender_id: '48dcfaae-c670-42cb-b78b-5b5f974f9e21',
        value: 'Female'
      }
    ]);
    
    await queryInterface.bulkInsert('users', [
      {
        user_id: uuidv4(),
        name: 'Martin',
        country: 'Argentina',
        city: 'Paraná',
        address: 'Av. Reforma 123',
        email: 'martin.paz@live.com.ar',
        phone: '1234567890',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('admin', 10),
        role_id: 'bb8bb01b-521e-4718-b983-3353ad116e84',
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        name: 'Juan',
        country: 'Argentina',
        city: 'Paraná',
        address: 'Av. Reforma 123',
        email: 'a@a',
        phone: '1234567890',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('a', 10),
        role_id: '99dfda1a-64d9-4664-a6e1-bfa743b2a858',
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        name: 'Mario',
        country: 'Argentina',

        city: 'Paraná',
        address: 'Av. Reforma 123',
        email: 'b',
        phone: '1234567890',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('b', 10),
        role_id: '99dfda1a-64d9-4664-a6e1-bfa743b2a858',
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        name: 'Pedro Ar',
        country: 'Argentina',
        city: 'Paraná',
        address: 'Av. Reforma 123',
        email: 'pedr@gmail.com',
        phone: '1234567890',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('aava', 10),
        role_id: '99dfda1a-64d9-4664-a6e1-bfa743b2a858',
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      },
      {
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a03',
        name: 'Roqq e',
        country: 'Argentina',
        city: 'Paraná',
        address: 'Av. Reforma 123',
        email: 'roqq@gmail.com',
        phone: '1234567890',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
        born: '1990-01-01',
        url_image: 'https://via.placeholder.com/150',
        password_hash: await hash('affaa', 10),
        role_id: '99dfda1a-64d9-4664-a6e1-bfa743b2a858',
        team_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
      }
    ]);



    await queryInterface.bulkInsert('weights', [
      {
        weight_id: 'cacdb721-10dd-4b61-9985-17d87b45d424',
        value: 50,
      },
      {
        weight_id: 'af068ca2-9970-4953-aea2-0b68dee5de83',
        value: 60,
      },
      {
        weight_id: '6fe22f8e-dba1-4fb6-85c0-890b2fc126ab',
        value: 70,
      },
      {
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        value: 80,
      },
      {
        weight_id: 'a77d0c55-783c-4d24-a436-3afaae3507b8',
        value: 90,
      }
    ]);

    await queryInterface.bulkInsert('ages', [
      {
        age_id: '701e6bf0-f7f9-4090-970a-dfdab5c39a22',
        value: 'Kids',
        years: 17,
      },
      {
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        value: 'Senior',
        years: 30,
      },
      {
        age_id: 'a77d0c55-783c-4d24-a436-3afaae3507b8',
        value: 'Master I',
        years: 35,
      },
      {
        age_id: '721e6bf0-f7f9-4090-970a-dfdab5c39a22',
        value: 'Master II',
        years: 40,
      }
    ]);

    await queryInterface.bulkInsert('styles', [
      {
        style_id: uuidv4(),
        value: 'Gi',
      },
      {
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        value: 'No-Gi',
      },
      {
        style_id: 'aaaa6bf0-f7f9-4090-970a-dfdab5c39b22',
        value: 'Greco',
      },
      {
        style_id: '01110f4e-24ae-4e6e-9e1b-abe0377c08ca',
        value: 'Beach Wrestling',
      }

    ]);

    await queryInterface.bulkInsert('events', [
      {
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        name: 'ACL I',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        start_date: '2024-06-01',
        weighing_date: '2024-06-01',
        end_date: '2024-09-09',
        type: 'Tournament',
        description: 'This is a description of event 1',
        status: 'in progress',
      }, 
      {
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        name: 'ACL II',
        country: 'Mexico',
        city: 'Mexico City',
        address: 'Av. Reforma 123',
        phone: '1234567890',
        start_date: '2024-06-01',
        weighing_date: '2024-06-01',
        end_date: '2024-06-01',
        type: 'Tournament',
        description: 'This is a description of event 2',
        status: 'active',
      },
      {
        event_id: '05cbf5dc-f3fe-4e66-9371-e544e6dd797d',
        style_id: '01110f4e-24ae-4e6e-9e1b-abe0377c08ca',
        name: 'Beach Wrestling Open Argentina',
        country: 'Argentina',
        city: 'Parana, Entre Rios',
        address: 'Av. Costanera 123',
        phone: '3434732733',
        start_date: '2024-11-23',
        weighing_date: '2024-11-23',
        end_date: '2024-11-24',
        type: 'Tournament',
        description: 'This is a description of event 3',
        status: 'active',
      }
    ]);

    await queryInterface.bulkInsert('event_prices', [
      {
        price_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100.0,
        type: 'General',
        quantity: 100,
        valid_from: '2024-06-01',
        valid_to: '2024-06-01',
      },
      {
        price_id: uuidv4(),
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        price: 50.0,
        type: 'General',
        quantity: 100,
        valid_from: '2024-06-01',
        valid_to: '2024-06-01',
      },
      {
        price_id: uuidv4(),
        event_id: '05cbf5dc-f3fe-4e66-9371-e544e6dd797d',
        price: 5.0,
        type: 'General',
        quantity: 100,
        valid_from: '2024-11-22',
        valid_to: '2024-11-24',
      }
    ]);



    await queryInterface.bulkInsert('registrations', [
      {
        registration_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
      {
        registration_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a03',
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        team_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        style_id: '691e6bf0-f7f9-4090-970a-dfdab5c39b22',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        registration_date: '2024-06-01',
        status: 'pending',
        price: 1000,
      },
    ]);

    await queryInterface.bulkInsert('tickets', [
      {
        ticket_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100,
        type: 'General',
        purchase_date: '2024-06-01',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        status: 'active',
      },
      {
        ticket_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100,
        type: 'General',
        purchase_date: '2024-06-01',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        status: 'active',
      },
      {
        ticket_id: uuidv4(),
        user_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        price: 100,
        type: 'General',
        purchase_date: '2024-06-01',
        reference_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        status: 'active',
      }
    ]);

    await queryInterface.bulkInsert('event_parameters', [
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a22',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
      },
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a594ac40-d362-441e-8fb8-f64460084c19',
        weight_id:'83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '701e6bf0-f7f9-4090-970a-dfdab5c39a22',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
      },
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a594ac40-d362-441e-8fb8-f64460084c19',
        weight_id: 'a77d0c55-783c-4d24-a436-3afaae3507b8',
        age_id: '701e6bf0-f7f9-4090-970a-dfdab5c39a22',
        gender_id: '48dcfaae-c670-42cb-b78b-5b5f974f9e21',
      },
      {
        event_parameters_id: uuidv4(),
        event_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        category_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        weight_id: '83b41b42-87f6-473f-b93e-9d4ee579cae5',
        age_id: '721e6bf0-f7f9-4090-970a-dfdab5c39a22',
        gender_id: '800dc0cb-e2f0-4759-b675-4b6a8bd469fa',
      },
    ]);

    await queryInterface.bulkInsert('matches', [
      {
        match_id: uuidv4(),
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category: 'Profesional',
        style: 'Gi',
        date: '2024-06-01',
        user1_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        team1_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        user2_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        team2_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        points1: 2,
        points2: 0,
        win_by: 'points',
        winner_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        winner_points: 2,
        losser_points: 0,
      },
      {
        match_id: uuidv4(),
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category: 'Profesional',
        style: 'Gi',
        date: '2024-06-01',
        user1_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        team1_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        user2_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a03',
        team2_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        points1: 2,
        points2: 0,
        win_by: 'points',
        winner_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        winner_points: 2,
        losser_points: 0,
      },
      {
        match_id: uuidv4(),
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category: 'Profesional',
        style: 'Gi',
        date: '2024-06-01',
        user1_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        team1_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        user2_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a02',
        team2_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        points1: 2,
        points2: 0,
        win_by: 'points',
        winner_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a00',
        winner_points: 2,
        losser_points: 0,
      },
      {
        match_id: uuidv4(),
        event_id: 'a114ac40-d362-331e-8fb8-f64460084c19',
        category: 'Profesional',
        style: 'Gi',
        date: '2024-06-01',
        user1_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        team1_id: 'a494ac40-d362-441e-8fb8-f64460084c19',
        user2_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a03',
        team2_id: '83d61863-aae3-4df5-967c-fa356aac9b19',
        points1: 2,
        points2: 0,
        win_by: 'points',
        winner_id: '691e6bf0-f7f9-4090-970a-dfdab5c39a01',
        winner_points: 2,  
        losser_points: 0,
      },
    ]);
  }