import {Card, CardBody, CardImg, CardTitle,} from 'reactstrap'
import LoadComments from './LoadComments'
import CommentForm from './CommentForm'
import { baseUrl } from '../../redux/baseUrl'



const ImageDetail = ({selectedImage, comments, addComment, commentIsLoading, token}) => {
  return (
    <div>
        <Card>
    <CardImg
      alt={selectedImage.name}
      src={baseUrl + selectedImage.image}
      style={{height: 320}}
      top  
    />
    <CardBody style={{textAlign: 'left'}}>
      <CardTitle tag="p" style={{fontWeight: 'bold', textAlign: 'center'}}>Creator: <span style={{fontWeight: 500}}>{selectedImage.name}</span> 
      </CardTitle>
        <hr />
        {token === null || token === undefined ? <h3 className='text-danger fw-bold text-center'>Please <span>SignUp|Login</span> for giving feedbacks on the picture</h3> : (<div>
          <CommentForm imageId={selectedImage.id} id={comments.id} addComment={addComment}/>
        
          <LoadComments comments={comments} commentIsLoading={commentIsLoading} />
        </div>)}
        
        
        
        
    </CardBody>
        </Card>
    </div>
  )
}

export default ImageDetail