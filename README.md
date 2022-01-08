# National-Parks

This project seeks to offer information on the [US National Parks](https://www.nps.gov/index.htm), with features to add parks to a user's bucket list, create a user-specified trips log to plan out visiting National Parks. The project uses Mapbox GL to render a world map with highlights on US States, where user interactivity renders the individual National Parks and Sites.

Using an API found [here](https://www.nps.gov/subjects/developer/api-documentation.htm#/), the team built functionality to store user-selected park data from the NPS API into a user-dedicated bucketlist and trip SQL tables. PostgreSQL functionality was achieved via [Elephant SQL](https://www.elephantsql.com/).

This project was developed with Javascript React Hooks and Router. The package.json contains npm installation of Mapbox GL, CORS, Express, Axios, Nodemon, pgAdmin for the PostgreSQL, webpack, and a US state name to abbreviation conversion tool. Other package details are related to style, proxy server, and various webpack loaders. Note: Mapbox GL may require its own npm install found [here](https://www.npmjs.com/package/mapbox-gl).

Future releases will include:

- Park data cross-referenced with animals, and flora and fauna of the US
- Weather reports feature
- Trip planner with Google Maps
- User forum

The team sincerely thanks the following:

- Codesmith Administration, notably Reid Klarsfeld, Laura Forden and Matt Severyn.
- Sam Arnold, one-of-a-kind fellow, mentor, and all-around good human being.
- US National Parks, an often overlooked privilege in the US.
- [mapbox](https://www.mapbox.com/)
- [ElephantSQL](https://www.elephantsql.com/)
- [National Park Typeface](https://nationalparktypeface.com/) for use of their custom font family.
