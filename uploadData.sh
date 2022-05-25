# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+srv://saurabh:saurabh@qkart-node.lgew7.mongodb.net/xflix?retryWrites=true&w=majority" --drop --collection videos --file backend/data/data.json
