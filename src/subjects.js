
const db =require("./db")
const express = require("express")
const router = express.Router()

  

router.get("/getSubjects", async( req, res)=>{

    try {
        

      const { email } = req.body;

        const query = `
        select * from 
         subjects s inner join professors p on  s.professor_id = p.professor_id
         where email = '${email}'
         
         `
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
       
            const { name, professorId } = req.body;
           
            const query = `
            INSERT into Subjects (name, professor_Id) 
            VALUES ('${name}',${professorId})
           `
            console.log(query);
            
          const result = await db.query(query)
          
            const result2 = await db.query(`
            select * from subjects
            where professor_id = ${professorId} and name = '${name}'`)

      console.log(result2);
      
          res.send( result2.rows[0]);
        } catch(e) {
         
         res.send(e.detail)
         
        }
}
)


router.put("/updateName", async( req, res)=>{

    try {
       
        
        const { name, subjectId } = req.body;
       
        const query = `
        UPDATE subjects
        set name= '${name}'
        where subject_id='${subjectId}'`

        
      const result = await db.query(query)
      const result2 = await db.query(`select * from subjects 
      where subject_id = '${subjectId}'  `)


res.send( result2.rows[0]);

    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)

router.put("/verify", async( req, res)=>{

  try {
     
     const { subjcteId } = req.body;
  
    
      
     
      const query = `
      UPDATE subjects
      set  isVerified='true'
      where subject_id= '${subjcteId}'`

      
    const result = await db.query(query)

    const result2 = await db.query(` select * from subjects 
    where subject_id = ${subjcteId}`)
    console.log(result2);
    


res.send( result2.rows[0]);

  } catch(e) {
   
   res.send(e.detail)
   
  }
}
)



router.delete("/delete", async( req, res)=>{

    try {
      
        
        const {  subjectId } = req.body;
       
        const query = `
        DELETE from  subjects
        where subject_id='${subjectId}'`

        console.log(query);
        
      const result = await db.query(query)
                                  
      res.send(`deleted subject  :) `);
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)


module.exports=router

