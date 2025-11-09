const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

// client.connect().then(() =>{
//     console.log('connected successfully');
// }).catch(err =>{
//     console.log('connection error has been detected'. err);
// }) .finally(()=>{client.close();});

async function run(params) {
  try {
    await client.connect();
    const db = client.db("University");
    const students = db.collection("students");

    // const result = await students.insertOne({
    //   name: "Safiya",
    //   age: 24,
    //   department: "Midwifery",
    // });
    // console.log("insertted document with id:", result.insertedId);

    // const insertManyResult = await students.insertMany([
    //   { name: "Amina", age: 21, department: "Computer Science" },
    //   { name: "Ali", age: 24, department: "Engineering" },
    // ]);
    // console.log("Inserted many documents:", insertManyResult.insertedCount);

    const updateOneResult = await students.updateOne(
      { name: "sumaya axmed" },
      { $set: { name: "Sumaya Axmed" } }
    );
    console.log("Updated one document:", updateOneResult.modifiedCount);

    const updateManyResult = await students.updateMany(
      { department: "Computer Science" },
      { $set: { department: "Software Engineering" } }
    );
    console.log("Updated many documents:", updateManyResult.modifiedCount);

    const deleteOneResult = await students.deleteOne({ name: "Ali" });
    console.log("Deleted one document:", deleteOneResult.deletedCount);

    const allStudents = await students.find().toArray();
    console.log("All Students:");
    console.log(allStudents);

    const filteredStudents = await students
      .find({ age: { $gt: 22 } })
      .toArray();
    console.log("Students older than 22:");
    console.log(filteredStudents);

    const projectedStudents = await students
      .find({}, { projection: { _id: 0, name: 1, department: 1 } })
      .toArray();
    console.log("Projected Students (only name & department):");
    console.log(projectedStudents);

    const deleteManyResult = await students.deleteMany({
      department: "Software Engineering",
    });
    console.log("Deleted many students:", deleteManyResult.deletedCount);

    console.log("All CRUD operations completed successfully");
  } catch (err) {
    console.log("connection error has been detected".err);
  } finally {
    await client.close();
  }
}

run();
