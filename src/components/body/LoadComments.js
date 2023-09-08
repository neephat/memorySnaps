import dateFormat from "dateformat";
import Loading from "./Loading";




const LoadComments = ({comments, commenIsLoading}) => {
    
    if(commenIsLoading){
       return <Loading />
    }
    else{
        const previewComments =  comments.map((com)=>{
            return(
                <div key={com.id}>
                    <hr />
                    <h5 style={{fontWeight: 'lighter', fontSize: '15px'}}>Commented by <span style={{fontWeight: 'bold'}}>{com.author}</span> </h5>
                    <p className="fst-italic fs-6 fw-normal" style={{margin: 'auto'}}>{com.comment}</p>
                    <p className="fw-bold" style={{margin: '0px', padding: '0px'}}>Rating: {com.rating}</p>
                    <p className="text-end fw-semibold" style={{fontSize: '12px', margin: '0px', padding: '0px'}}>{dateFormat(com.date, 'dddd, mmmm dS, yyyy')}</p>
                    
    
                </div>
            )
        })
    
        return (
        <div>
            {previewComments} 
        </div>
      )
    }
    
}

export default LoadComments