import ForthContent from './content/forth';
import ThirdContent from './content/third';
import SecondContent from './content/second';

const Contents = () => {
  return <div></div>;
};

Contents.SecondContents = props => SecondContent(props);
Contents.ThirdContents = props => ThirdContent(props);
Contents.ForthContents = props => ForthContent(props);

export default Contents;
