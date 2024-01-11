
const db =require("./db")
const express = require("express")
const router = express.Router()

  

router.get("/getComments", async( req, res)=>{

    try {
        

      const { email } = req.body;

        const query = `
        select * from 
         comments c inner join professors p on  c.professor_id = p.professor_id
         where email = '${email} and isverified = 'true' '
         
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

router.get("/professor/:professorId", async( req, res)=>{

    try {

        
        const professor_id = +req.params.professorId 
 
          
        const query = `
        select * from 
         comments 
         where professor_id = ${professor_id} 
         and isverified='true'
         
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
       
            const { subjectname, description, subjectmastry,teachingCoherence,student_id,professor_id} = req.body;
           
            const query = `INSERT INTO comments (subjectname , description, subjectmastry,teachingCoherence ,student_id, professor_id)
            values ('${subjectname}', '${description}', ${subjectmastry},${teachingCoherence},${student_id},${professor_id})
           `
            console.log(query);
            
          const result = await db.query(query)
          
            const result2 = await db.query(`  
                    select * from comments 
                    where professor_id= ${professor_id} and student_id =${student_id}`)

      console.log(result2);
      
          res.send( result2.rows[0]);
        } catch(e) {
         
         res.send(e.detail)
         
        }
}
)


router.put("/verify", async( req, res)=>{

  try {
     
     const { professor_id,student_id } = req.body;
  
    
      
     
      const query = `
      UPDATE comments
      set  isVerified='true'
      where student_id= ${student_id} and professor_id= ${professor_id} `

      
    const result = await db.query(query)

    const result2 = await db.query(` select * from comments 
    where professor_id = ${professor_id} and student_id= ${student_id}`)
    
    


res.send( result2.rows[0]);

  } catch(e) {
   
   res.send(e.detail)
   
  }
}
)



router.delete("/delete", async( req, res)=>{

    try {
      
        
             
     const { professor_id,student_id } = req.body;
  
       
        const query = `
        DELETE from  comments
        where professor_id=${professor_id   } and student_id = ${student_id}`

        console.log(query);
        
      const result = await db.query(query)
                                  
      res.send(`deleted comment  :) `);
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)


module.exports=router

