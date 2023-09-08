import { Component } from "react";
import MenuItem from "./MenuItem";
import ImageDetail from "./ImageDetail";
import { Alert, Modal, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import {
  addComment,
  fetchComments,
  fetchImages,
} from "../../redux/actionCreators";
import Loading from "./Loading";
import Categories from "./categories/Categories";

const mapStateToProps = (state) => {
  return {
    images: state.images,
    comments: state.comments,
    token: state.auth.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (imageId, comment, rating, author) =>
      dispatch(addComment(imageId, comment, rating, author)),
    fetchImages: () => dispatch(fetchImages()),
    fetchComments: () => dispatch(fetchComments()),
  };
};
class Gallery extends Component {
  state = {
    selectedImage: null,
    modalOpen: false,
  };

  onSelectImage = (image) => {
    this.setState({
      selectedImage: image,
      modalOpen: true,
    });
  };
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  componentDidMount() {
    this.props.fetchImages();
    this.props.fetchComments();
  }
  render() {
    document.title = `MemorySnaps || Gallery`;

    if (this.props.images.isLoading) {
      return <Loading />;
    } else if (this.props.images.errMessage != null) {
      return <Alert color="danger">{this.props.images.errMessage}</Alert>;
    } else {
      let menu = [];

      if (this.props.images.filter === "all") {
        menu = this.props.images.images.map((image) => {
          return (
            <div className="col-md-4">
              <MenuItem
                key={image.id}
                image={image}
                onSelectImage={this.onSelectImage}
              />
            </div>
          );
        });
      } else {
        menu = this.props.images.images
          //filtering images based on category
          .filter((image) => {
            return image.category === this.props.images.filter;
          })
          .map((image) => {
            return (
              <div className="col-md-4">
                <MenuItem
                  key={image.id}
                  image={image}
                  onSelectImage={this.onSelectImage}
                />
              </div>
            );
          });
      }

      let imageDetail = null;
      if (this.state.selectedImage != null) {
        const comments = this.props.comments.comments.filter((comment) => {
          return comment.imageId === this.state.selectedImage.id;
        });
        imageDetail = (
          <ImageDetail
            selectedImage={this.state.selectedImage}
            comments={comments}
            commentIsLoading={this.props.comments.isLoading}
            addComment={this.props.addComment}
            token={this.props.token}
          />
        );
      }

      // const dishDetail = this.state.selectedImage ? <DishDetail selectedImage={this.state.selectedImage} comments={comments} />: null;
      return (
        <div>
          <div className="container">
            <Categories />
            <div className="row row-content">
              {menu}
              <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                {imageDetail}
                <ModalFooter>
                  <button
                    className="btn btn-danger fw-bold"
                    onClick={this.toggleModal}
                  >
                    {" "}
                    Close
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
