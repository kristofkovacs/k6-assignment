# K6 Frontend Engineering Assignment

This is a solution for the K6 Star Wars API React Frontend Engineering assignment

Deployed to [Netlify](https://k6-assignment-kristof.netlify.app)

## Getting started

1. Run `yarn install`
2. Run `yarn start`
3. Access the app on http://localhost:3000 (or 300x if 3000 is already in use)

## Requirements and tasks

```
Create a simple web interface using React allowing users to:

A. Search for characters in the Starwars universe and display:
  - The characters full name.
  - What type of species it is.
  - The character's home planet name as well as the planet's population count.


B. Select a character from the list to see which movies the character appears in. Display the movies ordered by its `release_date` in descending order. Display the following information about each movie:
  - title
  - release_date
  - opening_crawl (only the first 150 characters).


The data can be retrieved from the following API - https://swapi.dev/documentation
```

## Solution

I have managed to create the solution for all the tasks described above. 👆

The app fetches the given `API`, and retreives the first 10 characters presented in a `NameCardList` consisting of `NameCard` items. The list has a simple pagination, where the user can go to the next or previous 10 items (if there are next or previous ones).

With typing in the `SearchBar` the user has the ability to request more filtered results (the new requests are delayed, in order to reduce the number of requests, so the fetching will only fire when the user stops typing for 1000 ms).

By clicking on a `NameCard` the user will see the list of movies the given character was a part of with the release date and a short truncated description of the movie.

### Libraries / Frameworks

For the whole solution I have used `React.js` with JavaScript.

For maintaining a clear and consistent UI I have used `@chakra-ui/react` as a UI library which has some default properties and can be styled really quickly and easily.
The famous CSS-in-JS library, `styled-components` was the other option I was thinking of using instead of a UI component library, but I thought `chakra` is also pretty readable, customizable and extendable if needed, and I can create the solution way faster in a more consistent way.

Instead of the built-in fetch function I used `axios` for the API requests.

I have used `moment` for parsing dates.

### Trade-offs / Thoughts / Issues

I wanted to give you a sneak-peek of how I write my code, and didn't want to overcomplicate or overengineer things with writing my whole components with `styled-components` or include more unnecessary libraries than I used.

The `<App />` and `<Detail />` component could be decomposed into more components, for example another `<MovieCard />` component could be introduced.

We highly rely on the API, I also had some issues there, because in Safari and after deploying the https://swapi.dev/api did not work, because it's SSL certificate expired (Github issue: https://github.com/Juriy/swapi/issues/22) and the browsers did not support the communication between `https` and `http`, and I got some CORS issues, so I found an another working fork, which worked fine, so I decided to use that: https://swapi.py4e.com/api.

## Conclusion

I really liked the test! After starting to go more deeply into the API structure I thought that it will take more time, but it became really fun, and after some styling it started to look really nice. Would love to extend the project in the future 😶

I'm looking forward to hearing your feedback!
