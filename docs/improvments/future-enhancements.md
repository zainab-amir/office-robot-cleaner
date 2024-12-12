## Future Enhancements

### Cache
While caching wasn't implemented, it can be a valuable optimization for future considerations. Determining cache 
invalidation strategies depends on understanding usage of the API and which paths are more frequently cleaned i.e. 
Hallway etc.

Because the commands can be so diverse for different users, another way to implement "cache" would be to have an
operations list for only the current call to the API. It will only "cache" operations within the same request and avoid
calculating coordinates when robot is going over same path again and again from the same point. For example:
 - Direction North Step 4
 - Direction South Step 4

will generate same coordinates.

### API Monitoring
- DB health check

### Rate limiting
To be considered based on the scope of how and where this API will be used. Depends on the business needs.