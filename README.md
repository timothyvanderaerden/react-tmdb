# React-TMDb
React application with information about movies and TV shows

![Popular Movies](https://cloud.githubusercontent.com/assets/7502104/20600337/70121188-b253-11e6-8314-4a9ef6ba6360.png)

   > note: All content is provided by [The Movie Database](https://www.themoviedb.org)
    
## Installation ##
1. Clone repo:
    `git clone https://github.com/timothyvanderaerden/React-TMDb.git`
2. Install node modules:
    `npm install`
3. Get your key [here](https://www.themoviedb.org)
4. Place your key in: 
    `/app/api/ApiKey.js`
5. Create webpack bundle:
    `npm run build-dev`
6. Launch application:
    `webpack-dev-server`
    
### TODO ###
- [x] Popular movies/TV (Discover)
    - [ ] Design popular movies/TV
- [x] Movie/TV page
    - [ ] Design Movie/TV
- [ ] Remove inline style
- [ ] Dynamic configuration (image basurl, image sizes)
- [ ] Minimize bundle size