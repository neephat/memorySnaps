import { Card, CardBody, CardImg, CardTitle} from 'reactstrap';
import { baseUrl } from '../../redux/baseUrl';

const MenuItem = ({ image, onSelectImage }) => {
  //destructuring props
  return (
    <div>
      <Card  className='shadow-lg-white rounded mt-4' style={{ margin: 10, cursor: 'pointer', textAlign: 'center', width: 'auto'}} onClick={()=>onSelectImage(image)}>
        <CardBody>
        <CardImg
          alt={image.name}
          src={baseUrl + image.image}
          style={{ height: 270}}
          
        />
        
          <CardTitle className='mt-3' style={{fontSize: 15, color: 'black'}}>Image by <span style={{fontWeight: 'bold'}}>{image.name}</span></CardTitle>
          
        
        </CardBody>
      </Card>
    </div>
  );
};

export default MenuItem;
