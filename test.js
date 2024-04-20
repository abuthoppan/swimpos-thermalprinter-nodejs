
const objs = [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
    { key: 3, value: 30 },
];

let s = objs.map(obj => [obj.key.toString(), obj.value.toString()]);

console.log(s)

console.log(Buffer.from("eyJMb2NhdGlvbiI6IlBhbGEiLCJUbyI6IkFidSIsIlJlZk5vIjoiUkVGMjUxMjIwMjMwMDkiLCJEYXRlVGltZSI6IjIwMjMtMTItMjUgMTM6Mzc6MjkuOTU5OTM5IiwiSXRlbXMiOltbIjYgeCBIYW5kIFBhZGRsZXMgQCAxOS4wMCIsIjExNC4wIl0sWyIyIHggU3dpbSB3ZWFyIFNwZWMgQCAxOS4wMCIsIjM4LjAiXSxbIjIgeCBCbGFjayBFeWUgd2VhciBAIDI5LjAwIiwiNTguMCJdLFsiMSB4IExpZmUgamFja2V0IE9yYW5nZSBAIDQ5LjAwIiwiNDkuMCJdLFsiMSB4IExpZmUgZ3VhcmQgWWVsbG93IEAgMTkuMDAiLCIxOS4wIl0sWyIxIHggU3dpbW1pbmcgQ2FwIEdyYXkgQCA0OS4wMCIsIjQ5LjAiXSxbIjEgeCBTd2ltIHdlYXIoR2lybCA2eXJzKSBAIDE5LjAwIiwiMTkuMCJdLFsiMSB4IExpZmUgamFja2V0IFJlZCBAIDQ5LjAwIiwiNDkuMCJdXSwiVG90YWwiOiIxMTI4LjAiLCJEaXNjb3VudCI6IjEwIiwiR3JhbmRUb3RhbCI6IjM0Ny4wIn0=", 'base64').toString('ascii'))