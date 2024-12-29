const mongoose = require("mongoose");
const mongoURL = `mongodb+srv://satysat03:hjpWUnsbkYP8L1ov@cluster0.vk0o2lr.mongodb.net/gofoodmern`;

async function mongoDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");

    const foodItemSchema = new mongoose.Schema({});

    const FoodItem = mongoose.model("food_items", foodItemSchema);

    const data = await FoodItem.find({});
    const foodCategoryCollection = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const catData = await foodCategoryCollection.find({}).toArray();
    // console.log(categories);

    // Print the fetched data
    // console.log(data);
    global.food_items = data;
    global.foodCategory = catData;
    // console.log(global.food_items);
  } catch (err) {
    console.error(err);
  }
}

module.exports = mongoDB;
