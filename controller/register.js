const db= require("../routes/db-config");
const bcrypt= require("bcryptjs");
const register= async(req,res)=>{
    console.log(req.body);
    const {email,Name,password:Npassword,Phone}= req.body;
    if(!email || !Npassword){ 
        return res.json({status: "error", error: "Please Enter your email and password"});}
    else{
        db.query('select email from user where email=?',[email],async(err,result)=>{
            if(err) throw err;
            if(result[0]) return res.json({status: "error", error: "Email has already been registered"})
            else{
                const password =await bcrypt.hash(Npassword,8);
                db.query('insert into user set ?',{email:email,Name:Name,password:password,Phone:Phone},(error,results)=>{
                    if(error) throw error;
                    return res.json({status:"success", success:"User has been registered"})
                })
                /*const a=document.querySelector("#myFunction");
                    a.addEventListener('click',() => {
                    alert("Registered Successfully.. Redirected to Login page");
                })*/
            }
        })
    }
}
module.exports=register;
