export const ranking =
[
    {
      "rank": 1,
      "team": "QQB",
      "record": "10-0",
      "points": 100,
      "previous": 1
    },
    {
      "rank": 2,
      "team": "DSA",
      "record": "9-1",
      "points": 90,
      "previous": 2
    },
    {
      "rank": 3,
      "team": "CAE",
      "record": "8-2",
      "points": 80,
      "previous": 3
    },
    {
      "rank": 4,
      "team": "EDD",
      "record": "7-3",
      "points": 70,
      "previous": 4
    },
    {
      "rank": 5,
      "team": "Team 5",
      "record": "6-4",
      "points": 60,
      "previous": 5
    }
  ]

export const events = [ 
  {
    id: 1,
    type: 'Ranking Series',
    style: 'Jiu-Jitsu',
    location: 'Parana, Argentina',
    age: 'Seniors',
    name: 'Ranking Series 1',
    date: '2024-05-22',
  },
  {
    id: 2,
    type: 'Ranking Series',
    style: 'Jiu-Jitsu',
    location: 'Parana, Argentina',
    age: 'Seniors',
    name: 'Ranking Series 2',
    date: '2024-06-20',
  },
  {
    id: 3,
    type: 'Ranking Series',
    style: 'Jiu-Jitsu',
    location: 'Parana, Argentina',
    age: 'Seniors',
    name: 'Ranking Series 3',
    date: '2024-07-17',
  }
]

export const teams = [
  {
    id: 1,
    team: 'Questo Quello Bello',
    color: 'red',
    abbreviation: 'QQB',
    logo: 'https://via.placeholder.com/150',
    location: 'Parana, Argentina',
    coach: 'Juan Perez',
  },
  {
    id: 2,
    team: 'Dinasty Sports Academy',
    color: 'blue',
    abbreviation: 'DSA',
    logo: 'https://via.placeholder.com/150',
    location: 'Parana, Argentina',
    coach: 'Jose Lopez',
  },
  {
    id: 3,
    team: 'Club Atletico Estudiantes',
    color: 'green',
    abbreviation: 'CAE',
    logo: 'https://via.placeholder.com/150',
    location: 'Parana, Argentina',
    coach: 'Carlos Rodriguez',
  },
  {
    id: 4,
    team: 'Edmon Dantes',
    color: 'yellow',
    abbreviation: 'EDD',
    logo: 'https://via.placeholder.com/150',
    location: 'Parana, Argentina',
    coach: 'Eduardo Gomez',
  },
  {
    id: 5,
    team: 'Team 5',
    color: 'orange',
    abbreviation: 'T5',
    logo: 'https://via.placeholder.com/150',
    location: 'Santa Fe, Argentina',
    coach: 'Fernando Fernandez',
  }
]

export const myTickets = [
  {
    id: 1,
    type: 'Athlete',
    date: '2022-12-31',
    hour: '10:00',
    location: 'New York',
  },
  {
    id: 2,
    type: 'General',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 3,
    type: 'VIP',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 4,
    type: 'General',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 5,
    type: 'VIP',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 6,
    type: 'General',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 7,
    type: 'VIP',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 8,
    type: 'General',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 9,
    type: 'VIP',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
  {
    id: 10,
    type: 'General',
    date: '2022-12-31',
    hour: '12:00',
    location: 'New York',
  },
]

export const WinByOptions = [
  { value: 'Submission', label: 'Submission', winner_poins: 5, loser_points: 0 },
  { value: 'Points', label: 'Points', winner_poins: 3, loser_points: 1 },
  { value: 'Advantage', label: 'Advantage', winner_poins: 2, loser_points: 1 },
  { value: 'Penalty', label: 'Penalty', winner_poins: 2, loser_points: 0 },
  { value: 'DQ', label: 'DQ', winner_poins: 5, loser_points: 0 },
  { value: 'Referee Decision', label: 'Referee Decision', winner_poins: 2, loser_points: 1 },
  { value: 'Draw', label: 'Draw', winner_poins: 1, loser_points: 1 },
  { value: 'Medical', label: 'Medical', winner_poins: 5, loser_points: 0 },
  { value: 'Technical Superiority', label: 'Technical Superiority', winner_poins: 5, loser_points: 0 },
  { value: 'Decision', label: 'Decision', winner_poins: 2, loser_points: 1 }
]