const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection is succesful'));

// Read Json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data is successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All data from DB Collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data is successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
// To Run the Import on Command Line : node dev-data/data/import-dev-data.js --import
// To Delete on CMD : node dev-data/data/import-dev-data.js --delete
