
const db =require("./db")
const express = require("express")
const router = express.Router()

  

router.get("/getAll/:subjectId", async( req, res)=>{

    try {
        const subject_id = req.params.subjectId
        
       
        const query = `SELECT * FROM files 
                       WHERE subject_id = ${subject_id} and isverified= 'true' `
   
        
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
            
            const { subject_id, title , description, } = req.body;
           
            const query = `INSERT INTO  files (subject_id, title, description)
            values(${subject_id},'${title}', '${description}')`
            console.log(query);
            
          const result = await db.query(query)
          const result2 =await db.query(`select * from files 
          where subject_id = ${subject_id}`)
                                      
          res.send(result2.rows[0]);
        } catch(e) {
         
         res.send(e.detail)
         
        }
}
)


router.put("/update", async( req, res)=>{

    try {

       
       
        
        const { title , description,file_id } = req.body;
       
        const query = `
        update files 
        set title = '${title}'  ,description = '${description}'
        where file_id = ${file_id} `       

     
        
      const result = await db.query(query)
                                  
      const result2 =await db.query(`select * from files 
      where file_id = ${file_id}`)
                                  
      res.send(result2.rows[0]);

      
    } catch(e) {
     
     res.send(e.detail)
     
    }
}
)


router.put("/verify/:fileId", async( req, res)=>{

    try {
       
       const file_id = req.params.fileId
    
      
        
      
       
        const query = `
        UPDATE files
        set  isVerified='true'
        where file_id= ${file_id}`
  
        
      const result = await db.query(query)
  
      const result2 = await db.query(` select * from files 
      where file_id = ${file_id}`)
    
  
  
  res.send( result2.rows[0]);
  
    } catch(e) {
     
     res.send(e.detail)
     
    }
  }
  )


router.delete("/delete/:fileId", async( req, res)=>{

  try {
    
      
      const file_id = +req.params.fileId;
     
      const query = `
      DELETE from  files
      where file_id= ${file_id}`

      console.log(query);
      
    const result = await db.query(query)
                                
    res.send(`deleted students  :) `);
  } catch(e) {
   
   res.send(e.detail)
   
  }
}
)

module.exports=router

