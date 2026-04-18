
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

      const user = await findUserById('69e27e07cc6dd5e5781ad556');
      console.log('Find By Id ->',user);


      const user2 = await findByName('Foysal');
      console.log('Find By Name -> ',user2);

      const updatedUser = await UpdateUserByName('Foysal','0194598423');
      console.log('Updated User ->',updatedUser);

      const deltedUser = await deleteUserById('69e27e07cc6dd5e5781ad556');
      console.log('Deleted User -> ',deltedUser)

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
  const users = await User.find();
  return users;
}

async function findUserById(id){
  const user = await User.findById(id);
  return user;
}

async function findByName(name){
  const user = await User.findOne({name:name});
  return user;
}

async function UpdateUserByName(name,newPhone){
  const updatedUser = await User.findOneAndUpdate(
    {name:name},
    {phone:newPhone},
    {returnDocument:"after"}
  );

  return updatedUser;
  
}

async function deleteUserById(id) {
  const user = await User.findOneAndDelete({ _id: id });
  return user;
}

