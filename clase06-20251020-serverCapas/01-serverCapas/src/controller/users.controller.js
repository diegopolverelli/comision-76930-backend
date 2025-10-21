export const getUsers=async(req,res)=>{

    try {
        
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuarios:"usuarios"})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`error...!`})
    }

}

export const createUser=(req, res)=>{

    try {
        
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`usuario creado...!!!`});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`error...!`}) 
    }

}