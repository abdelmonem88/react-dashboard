import { useParams } from "react-router-dom";

type Props = {};

const SingleProduct = (props: Props) => {
  const { id } = useParams();
  return <div>Product with id: {id}</div>;
};

export default SingleProduct;
