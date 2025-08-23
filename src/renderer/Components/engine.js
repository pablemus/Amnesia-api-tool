import axios from 'axios';

export async function rginz(request_type, endpoint, body){
    const bbody =
    typeof body === "string" && body.trim()
      ? JSON.parse(body)
      : body ?? {};
        const cfg = { headers: { "Content-Type": "application/json; charset=utf-8" } };

    switch(request_type){
        case "POST":
            try{
            const res = await axios.post(`${endpoint}`, bbody, cfg);
            if(res){
                return res.data;
            }
            } catch(err){  
                console.log(err) 
                return err;
            }
            break;
        case "GET":
             try{
            const res = await axios.get(`${endpoint}`);
            if(res){
                return res.data;
            }
            } catch(err){
                console.log(err)   
                return err;
            }
            break;    


    }
}