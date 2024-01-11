
const db =require("./db")
const express = require("express")
const router = express.Router()

  

router.get("/getAll", async( req, res)=>{

    try {
        

       
        const query = `SELECT * FROM Professors`
        console.log(query);
        
      const result = await db.query(query)
      console.log(result);
      
                                  
      res.send( result.rows);
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)

router.post("/", async( req, res)=>{

        try {
       
            const { name, email, universityName } = req.body;
           
            const query = `
            INSERT into Professors (name, email,universityName) 
            VALUES ('${name}','${email}','${universityName}')
           `
            console.log(query);
            
          const result = await db.query(query)
          
          const result2 = await db.query(`select * from professors 
                                           where email = '${email}'  `)


          res.send( result2.rows[0]);
        } catch(e) {
         
         res.send(e.detail)
         
        }
}
)


router.put("/update", async( req, res)=>{

    try {
       
        
        const { name, email } = req.body;
       
        const query = `
        UPDATE professors
        set name= '${name}'
        where email='${email}'`

        
      const result = await db.query(query)
      const result2 = await db.query(`select * from professors 
      where email = '${email}'  `)


res.send( result2.rows[0]);

    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)

router.put("/verify", async( req, res)=>{

  try {
     
      
      const { name, email } = req.body;
     
      const query = `
      UPDATE professors
      set  isVerified='true'
      where email= '${email}'`

      
    const result = await db.query(query)

    const result2 = await db.query(`select * from professors 
    where email = '${email}'  `)


res.send( result2.rows[0]);

  } catch(e) {
   
   res.send(e.detail)
   
  }
}
)



router.delete("/delete", async( req, res)=>{

    try {
      
        
        const {  email } = req.body;
       
        const query = `
        DELETE from  professors
        where email='${email}'`

        console.log(query);
        
      const result = await db.query(query)
                                  
      res.send(`deleted professor  :) `);
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)


module.exports=router

