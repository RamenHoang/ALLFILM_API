const cinemaData = [
  {
    id: 1,
    name: 'Mặt trời',
    address: 'Đà Nẵng',
    Sessions: [
      {
        id: 1,
        date: '2021-04-29',
        startTime: '2021-04-29 08:00:00'
      },
      {
        id: 10,
        date: '2021-04-29',
        startTime: '2021-04-29 10:00:00'
      },
      {
        id: 10,
        date: '2021-04-30',
        startTime: '2021-04-29 10:00:00'
      },
      {
        id: 10,
        date: '2021-05-01',
        startTime: '2021-04-29 10:00:00'
      }
    ]
  }
];

const sessionsGroupByDate = cinemaData[0].Sessions.reduce((sessionObject, currentSession) => {
  if (Array.isArray(sessionObject[currentSession.date])) {
    sessionObject[currentSession.date].push({
      id: currentSession.id,
      startTime: currentSession.startTime
    });

    return sessionObject;
  }

  sessionObject[currentSession.date] = [{
    id: currentSession.id,
    startTime: currentSession.startTime
  }];

  return sessionObject;
}, {});

cinemaData[0].Sessions = sessionsGroupByDate;

console.log(cinemaData[0].Sessions);

