const dotenv = require('dotenv');

dotenv.config({ path: 'src/.env' });

const app = require('./index');

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
