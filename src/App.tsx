import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase-config";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

interface user {
  name: string;
  age: number;
  id: string;
}

interface addUser{
  name:string,
  age:number
}
type State = user[];

function App() {
  const [users, setUsers] = useState<State>([]);
  const [state, setState] = useState<addUser>({ name: "", age: 0 });

  const Fetchdata = async () => {
    console.log("Fetchdata runs");
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log("querySnapshot: ", querySnapshot.docs);
    let arr: any = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      console.log("here it is", user);
      arr = arr.concat([{ ...user, id: doc.id }]);
    });
    console.log("array", arr);
    setUsers(arr);
  };
  useEffect(() => {
    // console.log("useEffect",users);
    console.log("useEffect runs");
    if (users.length === 0) {
      Fetchdata();
    }
  }, [users]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const handleAdd = async () => {
    const docRef = await addDoc(collection(db, "users"), state);
    console.log("Document written with ID: ", docRef.id);
    setState({ name: "", age: 0 });
    Fetchdata();
  };
  const updateAge = async (age: number, id: string) => {
    // let newAge = age;
    // newAge++;
    const usersRef = doc(db, "users", id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(usersRef, {
      age: Number(age)+1,
    });
    Fetchdata()
  };

  const deleteUser=async(id:string)=>{
    await deleteDoc(doc(db, "users",id));
    Fetchdata()

  }

  return (
    <div className="App">
      {users.map((i: user) => (
        <div key={i.id}>
          <h1>Name: {i.name}</h1>
          <h1>Age: {i.age}</h1>
          <button onClick={() => updateAge(i.age, i.id)}>Increase Age</button>
          <button onClick={()=>deleteUser(i.id)}>Delete User</button>
        </div>
      ))}
      <label htmlFor="text">Name</label>
      <input type="text" name="name" value={state.name} onChange={handleChange} />
      <label htmlFor="">Age</label>
      <input type="number" name="age" value={state.age} onChange={handleChange} />
      <button onClick={handleAdd}>Enter data</button>
    </div>
  );
}

export default App;
