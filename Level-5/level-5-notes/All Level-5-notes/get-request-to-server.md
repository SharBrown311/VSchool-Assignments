# Get Request To Server
  -how to make a GET Request from your React app using your Custom Built Server API


  example:
   useEffect(() =>{
    axios.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err))
  }, [])