import axios from 'axios';

//const API_URL = 'https://tpazbackend-production.up.railway.app';
const API_URL = 'http://localhost:3000/api';



export const getRanking = () => {
  return axios.get(`${API_URL}/ranking`)
}

export const getAllMatches = (eventId) => {
  return axios.get(`${API_URL}/matches/event/${eventId}`)
}

export const updateMatchRow = (match) => {
  console.log ('Match: ', match)
}

export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`)
}

export const getRegistrationsByUser = (userId) => { 
  return axios.get(`${API_URL}/registration/user/${userId}`)
}

export const getEventCategories = (eventId) => {
  console.log('Event ID: ', eventId)
  return axios.get(`${API_URL}/eventCategories/event/${eventId}`)
}

export const getPriceByEvent = (eventId) => {
  return axios.get(`${API_URL}/eventPrice/event/${eventId}`)
}

export const postCreateTeam = (team) => {
  return axios.post(`${API_URL}/teams`, team)
}

export const postLogin = (email, password) => {
  return axios.post(`${API_URL}/login`, {email, password})
}

export const postCreateEvent = (event) => {
  return axios.post(`${API_URL}/events`, event)
}

export const postRegistration = (registration) => {
  return axios.post(`${API_URL}/registration`, registration)
}

export const getRegisteredAthletesByEvent = (eventId) => {
  return axios.get(`${API_URL}/registration/event/${eventId}`)
} 

export const getParametersByEvent = (eventId) => {
  return axios.get(`${API_URL}/events/${eventId}/parameters`)
}

export const getLoginUser = (email) => {
  return axios.get(`${API_URL}/login/${email}`)
}

export const getParametersByEventByUser = (eventId, userId) => {
  return axios.get(`${API_URL}/eventParameters/event/${eventId}/user/${userId}/parameters`)
}

export const getTeams = () => {
  return axios.get(`${API_URL}/teams`)
}

export const getEvents = () => {
  return axios.get(`${API_URL}/events`)
}

export const getEventsByUser = (userId) => { 
  return axios.get(`${API_URL}/events/user/${userId}`)
}

export const getEventsTicketsRegistrationsByUserId = (userId) => {
  return axios.get(`${API_URL}/events/user/${userId}/my-events`)
}

export const getEventPrices = (eventId) => {
  return axios.get(`${API_URL}/eventPrice/event/${eventId}`)
}

export const postRegisterUser = (user) => {
  return axios.post(`${API_URL}/users`, user)
}

export const postCreateTicket = (ticket) => {
  return axios.post(`${API_URL}/eventPrice`, ticket)
}

export const postTicket = (ticket) => {
  return axios.post(`${API_URL}/tickets`, ticket)
}

export const postCreatePreference = (object) => {
  return axios.post(`${API_URL}/mp/create_preference`, object)
}

export const getAllEventParameters  = () => {
  return axios.get(`${API_URL}/eventParameters/parameters`)
}

export const createEventParameter = (parameter) => {
  return axios.post(`${API_URL}/eventParameters`, parameter)
}

export const updateUser = (user, id) => {
  return axios.put(`${API_URL}/users/${id}`, user)
}

export const updateUserPassword = (user, id) => {
  return axios.put(`${API_URL}/users/${id}/password`, user)
}

export const postForgotPassword = (email) => {
  return axios.post(`${API_URL}/login/forgot-password`, {email})
}

export const postResetPassword = (token, password) => {
  return axios.post(`${API_URL}/login/reset-password/${token}`, {password})
}

export const deleteRegistration = (registrationId) => {
  return axios.delete(`${API_URL}/registration/${registrationId}`)
}