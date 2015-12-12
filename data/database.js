import {MongoClient} from "mongodb";
import {CronJob} from 'cron';
import cheerio from 'cheerio';
import request from 'request';
require('dotenv').load();

let db;

MongoClient.connect(process.env.MONGO_URL, (err, database) => {
  if (err) throw err;
  db = database;
})

let replenishDeals = () => {
  request('https://www.reddit.com/r/deals/top/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      db.collection('deals').drop()
      $('.thing').each(function(i, element){
        let Deal = {}
        Deal.picture;
        !element.children[3].children[0] ? Deal.picture = null : Deal.picture = element.children[3].children[0].attribs.src
        Deal.link = element.children[3].attribs.href
        Deal.title = element.children[4].children[0].children[0].children[0].data
        Deal.domainLink = element.children[4].children[0].children[2].children[1].attribs.href
        Deal.domain = element.children[4].children[0].children[2].children[1].children[0].data
        Deal.timeStamp = element.children[4].children[1].children[1].children[0].data
        Deal.authorLink = element.children[4].children[1].children[3].attribs.href
        Deal.author = element.children[4].children[1].children[3].children[0].data
        db.collection('deals').insertOne(Deal, function(err, result){
          console.log("inserted document into db")
          console.log(result);
        })
      })
    }
  });
}

new CronJob('* * * * *', function() {
  console.log('You will see this message every second');
  replenishDeals();
}, null, true, 'America/Los_Angeles');









module.exports = {
  // Export methods that your schema can use to interact with your database
  retreiveStories: () => {
    return db.collection('stories').find({}).toArray()
  }
};
