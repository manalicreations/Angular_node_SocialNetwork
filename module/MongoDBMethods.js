exports.GetAll = async (Collection,...selectkeys) => {

    if(selectkeys===undefined){
        return Collection.find().exec().then(data=>{
            let result=[]
            data.forEach(ele => {
                result.push(ele)
            });
            return result;
        })
        .catch(err=>console.log(err));
    }
    else{
        return Collection.find().select(selectkeys.join(' ')).exec().then(data=>{
            let result=[]
            data.forEach(ele => {
                result.push(ele)
            });
            return result;
        }).catch(err=>console.log(err));
    }
}

exports.FindWithKeys = async (Collection,matchkeys,...selectkeys) => {
    if(selectkeys!==undefined)
    {
        return Collection.find({$and:matchkeys}).select(selectkeys.join(' ')).exec().then(data=>{
            return data;
        }).catch(err=>console.log(err));
    }
    
    return Collection.find({$and:matchkeys}).exec().then(data=>{
            return data;
    }).catch(err=>console.log(err));
}


