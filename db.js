
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/testDB",{
      serverSelectionTimeoutMS:1000,
}).then( async() =>{
      console.log('Database connected');
      // await createUser({
      //       name:"Foysal",
      //       email:"foysal@gmail.com",
      //       phone:"01793310238"
      // });
      // await createUser({
      //       name:"Naim",
      //       email:"naim@gmail.com",
      //       phone:"01793310238"
      // });

      const users = await getAllUsers();
      console.log(users);

      mongoose.connection.close(true);

}).catch((e)=>{
      console.log(e);
})

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User",userSchema);

async function createUser(data){
      const user = new User({...data})
      await user.save();
      return user;
}

async function getAllUsers(){
  const users = User.find();
  return users;
}


