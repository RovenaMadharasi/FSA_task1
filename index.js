import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

// console.log("helllo")

const PORT = process.env.PORT || 3000;

let users = [

    {
        id : 1,
        name: "rovena" ,
        email: "roven@gmail.com",
        pass: "roven123"
    },

    {
        id:2,
        name: "varsh" ,
        email: "varsh@gmail.com",
        pass: "varsha234"
    }
]

app.get("/users", (req, res) =>{
    res.json({
        sucess:true,
        data : users,
    })
})


app.get("/users/:id", (req, res) =>{
   const id = Number(req.params.id);

   const user = users.find((user) => {
    if (user.id == id){
        return user;
    }
   })

   if (!user){
    return res.json({
        sucess: false,
        message: "user not found"
    })
   }
   
   res.json({
    success: true,
    data: user
   })
})

app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass
    };

    users.push(newUser);

    res.json({
        success: true,
        data: newUser
    });
});

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.json({
            success: false,
            message: "user not found"
        });
    }

    users = users.filter((user) => user.id !== id);

    res.json({
        success: true,
        message: "user deleted successfully"
    });
});



app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.json({
            success: false,
            message: "user not found"
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.pass = req.body.pass;

    res.json({
        success: true,
        message: "user updated successfully",
        data: user
    });
});

app.get("/", (req, res) => {
    res.send("User Management API is running");
});

app.listen( PORT , () =>{
    console.log(`app started listening on ${PORT}`)
})