addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      }
  });
  return response.json(); 
}



class descriptionHandler {
  element(element) {
    // console.log(`Incoming element: ${element.tagName}`)
    element.setInnerContent('This is Zilong!');
  }
}

class titleHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`)
    element.setInnerContent('Zilong and variants!');
  }
}

class h1TitleHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`)
    element.prepend('You get ');
  }
}


async function handleRequest(request) {
  const fetchRequest = await postData('https://cfw-takehome.developers.workers.dev/api/variants')
      .then((data) => {
        variants = data["variants"]
        // console.log(variants);
        return variants
      });

  const probability =  Math.random(); 

  if (probability < 0.5) {
    variantUrl = fetchRequest[0]
  }
  else {
    variantUrl = fetchRequest[1]
  };

  const res = await fetch(variantUrl)
  let resNew = new HTMLRewriter().on('p#description', new descriptionHandler()).transform(res);
  resNew = new HTMLRewriter().on('title', new titleHandler()).transform(resNew);
  resNew = new HTMLRewriter().on('h1#title', new h1TitleHandler()).transform(resNew);

  return resNew
}

