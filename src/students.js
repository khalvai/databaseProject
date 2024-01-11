
const db =require("./db")
const express = require("express")
const router = express.Router()

  

router.get("/getAll", async( req, res)=>{

    try {
        console.log(req.body);
        
        const { name, email } = req.body;
       
        const query = `SELECT * FROM students`
   
        
      const result = await db.query(query)

    
                                  
      res.send( result.rows);
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)

router.post("/", async( req, res)=>{

        try {
            console.log(req.body);
            
            const { name, email } = req.body;
           
            const query = `INSERT into Students (name, email)
            values('${name}','${email}')`
            console.log(query);
            
          const result = await db.query(query)
          const result2 =await db.query(`select * from students 
          where email = '${email}'`)
                                      
          res.send(result2.rows[0]);
        } catch(e) {
         
         res.send(e.detail)
         
        }
}
)


router.put("/update", async( req, res)=>{

    try {
       
        
        const { name, email } = req.body;
       
        const query = `
        UPDATE students
        set name= '${name}'
        where email='${email}'`

     
        
      const result = await db.query(query)
                                  
      const result2 =await db.query(`select * from students 
      where email = '${email}'`)
                                  
      res.send(result2.rows[0]);

      
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)


router.delete("/delete", async( req, res)=>{

  try {
    
      
      const {  email } = req.body;
     
      const query = `
      DELETE from  students
      where email='${email}'`

      console.log(query);
      
    const result = await db.query(query)
                                
    res.send(`deleted students  :) `);
  } catch(e) {
   
   res.send(e.detail)
   
  }
}
)

module.exports=router

