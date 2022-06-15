const express=require("express");
const bodyParse=require("body-parser");
const app=express();
const mailchimp=require("@mailchimp/mailchimp_marketing");


app.use(bodyParse.urlencoded({extended:true}));
app.use(express.static("public"));//to include all the static files in directory

mailchimp.setConfig({
    apiKey:"dc2a0b4a49bd233f166a26ad59a8d9d6-us11",
    server:"us11"
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
    console.log("Page is working");
})
app.post("/",(req,res)=>{
    const listId="2826f7ce23";

    const subscribingUser = {
      fname: req.body.firstname,
      lname: req.body.lastname,
      email: req.body.email
  };

    async function run(){
        try{
        const response=await mailchimp.lists.addListMember(listId,{
            email_address:subscribingUser.email,
            status:"subscribed",
            merge_fields:{
                FNAME:subscribingUser.fname,
                LNAME:subscribingUser.lname
            }
        });
        res.sendFile(__dirname+"/success.html");
    }
        catch(e){
            res.sendFile(__dirname+"/failure.html");
        }
    }
    run();
    });

   
app.post("/failure",(req,res)=>{
    res.redirect("/")
})
app.listen(process.env.PORT||3000,()=>{
    console.log("server is running");
});
//Api keys
// dc2a0b4a49bd233f166a26ad59a8d9d6-us11
// audience id "2826f7ce23"



// var fname=req.body.firstname;
// var lname=req.body.lastname;
// var email=req.body.email;
// var data={
//     menbers:[
//         {
//             email_address:email,
//             status:"subscribed",
//             merge_fields:{
//                 FNAME: fname,
//                 LNAME: lname
//             }
//     var jsonData= JSON.stringify(data);
//     const url="https://us11.api.mailchimp.com/3.0/lists/2826f7ce23";
//     const options ={
//         method:"POST",
//         auth: "ruinder:dc2a0b4a49bd233f166a26ad59a8d9d6-us11"//rupinder - user name
//     }
//    const request= https.request(url.options, (response)=>{//to send data to mailchip
//         response.on("data",(data)=>{
//             console.log(JSON.parse(data));
//         })
//     })
//     request.write(jsonData);
//     request.end; 


// website
// https://rocky-basin-80732.herokuapp.com/