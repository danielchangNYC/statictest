## API Endpoints

This is a working version of a static site that can hook into //Enroll via its API.


### Setting up for dev

#### Connecting to //Enroll QA

Copy [course_select.js](https://github.com/danielchangNYC/statictest/blob/master/js/course_select.js) and customize the class names to point to your own DOM elements.

Note that there is a call to `qa.enroll.flatironschool.com` on [index.html](https://github.com/danielchangNYC/statictest/blob/master/index.html). You will need a similar script tag that grabs the data you want. The callback parameter names the function that will be called on success. See [main.js](https://github.com/danielchangNYC/statictest/blob/master/js/main.js) for an example of how this is populated.

#### Connecting to //Enroll on your dev machine

Download and run [ngrok](ngrok.com).

Clone [//enroll](https://github.com/flatiron-labs/enroll).
Set `ENROLL_BASE_URL` to your ngrok address in the `.env` file, e.g. `ENROLL_BASE_URL='http://374c55f.ngrok.com'`
Bundle, migrate, and run `rails s -b 127.0.0.1`.

Note that there is a call to `qa.enroll.flatironschool.com` on both [index.html](https://github.com/danielchangNYC/statictest/blob/master/index.html) and [course_select.js](https://github.com/danielchangNYC/statictest/blob/master/js/course_select.js). Set both of these to your ngrok address instead.

### Api endpoints

Check out the [//Enroll API docs](https://github.com/flatiron-labs/enroll/blob/master/API.md).
