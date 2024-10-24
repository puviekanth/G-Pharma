const mongoose = require('mongoose')

const NewsletterSchema = new mongoose.Schema({
    email:String
});

const NewsletterModel = mongoose.model('newsletter', NewsletterSchema);
module.exports=NewsletterModel;
