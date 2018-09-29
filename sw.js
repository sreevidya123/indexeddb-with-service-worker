var cachename="pwa1";
var filescache=[
  '/',
  'index.html',
  'resume.html'
]
self.addEventListener('install',function(e) {
  console.log("installed succesfully.....!");
e.waitUntil(
  caches.open(cachename).then(function(ca)
{
  console.log("catching files from  cache");
  return ca.addAll(filescache);
})
)
})
self.addEventListener('activate',function(e) {
  console.log("activated succesfully.....!");
  e.waitUntil(
    catches.keys().then(function(c)  {
      return Promise.all(c.map(function(thiscache)  {
      if(thiscache !==cachename) {
        return caches.delete(thiscache);
        console.log("service worker removing files");
      }
    }))
  })
  )
})
self.addEventListener('fetch',function(e) {
  console.log("fetched succesfully.....!");
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if(response) {
        console.log("load from cache");
        return reponse;

      }

   var rc=e.request.clone();
   fetch(rc).then(function(response) {
     if(!reponse) {
       console.log("no reponse from fetch");
       return response;
     }
    rc=response.clone();
    caches.open(cachename).then(function(cache) {
      cache.put(e.request,rc);
      return reponse;
    });
   })
   .catch(function(error) {
     console.log("error occured",error);
   })
       })
  )

})
